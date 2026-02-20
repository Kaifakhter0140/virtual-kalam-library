import requests
from supabase import create_client

# Use your NEW Supabase credentials
url = "https://your-new-project.supabase.co"
key = "your-new-anon-key"
supabase = create_client(url, key)

def populate_library(topic="science"):
    print(f"📡 Pulling free {topic} books from Open Library...")
    # Open Library Search API
    response = requests.get(f"https://openlibrary.org/search.json?q={topic}&language=eng").json()
    
    for book in response.get('docs', [])[:20]: # Start with 20 books
        # Only take books that have a direct reading link on Archive.org
        ia_id = book.get('ia', [None])[0]
        
        if ia_id:
            title = book.get('title')
            direct_url = f"https://archive.org/details/{ia_id}"
            cover_id = book.get('cover_i')
            
            # Sync to Supabase
            supabase.table('virtual_books').insert({
                "title": title,
                "author": book.get('author_name', ['Unknown'])[0],
                "subjects": book.get('subject', [])[:5],
                "direct_url": direct_url,
                "cover_id": str(cover_id) if cover_id else None
            }).execute()
            print(f"✅ Synced: {title}")

populate_library("apj abdul kalam")
populate_library("physics")