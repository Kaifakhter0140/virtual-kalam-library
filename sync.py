import requests
from supabase import create_client

# HARDCODED CONNECTION
URL = "https://gqhryqoxvsftwxsieqlf.supabase.co"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxaHJ5cW94dnNmdHd4c2llcWxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0MjM5NjcsImV4cCI6MjA4Njk5OTk2N30.y1B8m-nUet9iCg3G0plQd2N11hN6nFfhzeca5jYNxUA"
supabase = create_client(URL, KEY)

# Targeting NCERT, UPSC, and Bihar Board
CATEGORIES = [
    "NCERT Hindi", 
    "UPSC Civil Services", 
    "Indian History Hindi", 
    "Bihar Board Textbooks", 
    "Competitive Exams India"
]

def sync_educational_vault():
    print("🚀 INITIALIZING INDIAN EDUCATION SYNC...")
    
    for category in CATEGORIES:
        print(f"\n📂 SCANNING: {category}")
        try:
            # Search specifically for items with "book" and "hindi" where applicable
            api_url = f"https://openlibrary.org/search.json?q={category}&has_fulltext=true&limit=25"
            res = requests.get(api_url, timeout=10).json()
            
            for doc in res.get('docs', []):
                ia_id = doc.get('ia', [None])[0]
                if ia_id:
                    payload = {
                        "title": doc.get('title'),
                        "author": doc.get('author_name', ['Educational Dept'])[0],
                        "cover_id": str(doc.get('cover_i')) if doc.get('cover_i') else None,
                        "direct_url": f"https://archive.org/details/{ia_id}",
                        "subjects": [category]
                    }
                    
                    try:
                        supabase.table('virtual_books').insert(payload).execute()
                        print(f"  ✔ ADDED: {payload['title'][:40]}...")
                    except:
                        continue
        except Exception as e:
            print(f"  ❌ Error fetching {category}")

if __name__ == "__main__":
    sync_educational_vault()
    print("\n✅ SYNC COMPLETE. REFRESH YOUR BROWSER.")