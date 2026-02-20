import requests
from supabase import create_client

# YOUR ACTUAL CREDENTIALS
SUPABASE_URL = "https://gqhryqoxvsftwxsieqlf.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxaHJ5cW94dnNmdHd4c2llcWxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0MjM5NjcsImV4cCI6MjA4Njk5OTk2N30.y1B8m-nUet9iCg3G0plQd2N11hN6nFfhzeca5jYNxUA"

# Initialize client
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def sync_archive(query):
    print(f"--- FETCHING: {query} ---")
    url = f"https://openlibrary.org/search.json?q={query}&has_fulltext=true"
    
    try:
        response = requests.get(url).json()
        docs = response.get('docs', [])[:10] # Grab 10 books per query
        
        for doc in docs:
            ia_id = doc.get('ia', [None])[0]
            if ia_id:
                title = doc.get('title')
                author = doc.get('author_name', ['Unknown Author'])[0]
                cover_id = doc.get('cover_i')
                subjects = doc.get('subject', [])[:3]
                
                data = {
                    "title": title,
                    "author": author,
                    "cover_id": str(cover_id) if cover_id else None,
                    "direct_url": f"https://archive.org/details/{ia_id}",
                    "subjects": subjects
                }
                
                # Insert if not already there
                supabase.table('virtual_books').upsert(data, on_conflict='title').execute()
                print(f"Successfully synced: {title}")
                
    except Exception as e:
        print(f"Error during sync: {e}")

# Run the ingestion
sync_archive("APJ Abdul Kalam")
sync_archive("Space Science")
sync_archive("Nuclear Physics")
print("\n--- ALL DONE. CHECK YOUR WEBSITE! ---")