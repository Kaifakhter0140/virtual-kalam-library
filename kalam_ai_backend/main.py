from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv

load_dotenv(override=True)

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.document_loaders import PyPDFium2Loader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)

class KalamEngine:
    def __init__(self):
        self.last_error = ""
        self.embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
        self.llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.3)
        self.vector_db = None

    def ingest_book(self, pdf_path: str):
        if not os.path.exists(pdf_path):
            self.last_error = f"File missing at {pdf_path}"
            return False
        
        book_id = os.path.basename(pdf_path).replace(".pdf", "").replace(" ", "_")
        db_dir = f"./db_{book_id}"

        # ⚡ THE SPEED BOOST: If the AI already memorized the book, just load the memory instantly!
        if os.path.exists(db_dir):
            print(f"⚡ FAST LOAD: Accessing existing memory for {book_id}...")
            # We connect to the existing database instead of reading the PDF again
            self.vector_db = Chroma(persist_directory=db_dir, embedding_function=self.embeddings)
            return True

        # If it's a new book, read and memorize it (takes a few seconds the very first time)
        print(f"🧠 FIRST TIME READING: Memorizing {book_id}. This will take a moment...")
        try:
            loader = PyPDFium2Loader(pdf_path)
            docs = loader.load() 
            
            splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
            chunks = splitter.split_documents(docs)
            
            self.vector_db = Chroma.from_documents(
                documents=chunks, 
                embedding=self.embeddings,
                persist_directory=db_dir
            )
            print(f"✅ MEMORIZATION COMPLETE: Saved {len(chunks)} chunks!")
            return True
        except Exception as e:
            self.last_error = str(e)
            print(f"❌ INTERNAL ERROR: {self.last_error}")
            return False

    def ask(self, question: str):
        template = """You are kalamHUBAI, a wise mentor. 
        CONTEXT: {context}
        QUESTION: {question}
        MENTOR RESPONSE:"""
        prompt = ChatPromptTemplate.from_template(template)
        retriever = self.vector_db.as_retriever(search_kwargs={"k": 3})
        chain = ({"context": retriever, "question": RunnablePassthrough()} | prompt | self.llm | StrOutputParser())
        return chain.invoke(question)

engine = KalamEngine()

class ChatRequest(BaseModel):
    message: str
    book_path: str

@app.post("/ask_ai")
async def chat_with_book(request: ChatRequest):
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    full_path = os.path.join(base_dir, "public", request.book_path.lstrip('/'))
    
    success = engine.ingest_book(full_path)
    if not success:
        return {"answer": f"SYSTEM ERROR: {engine.last_error}"}
        
    return {"answer": engine.ask(request.message)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)