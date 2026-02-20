import requests
from supabase import create_client

# 1. Setup your credentials (Same ones from your .env.local)
SUPABASE_URL = "YOUR_NEW_SUPABASE_URL"
SUPABASE_KEY = "YOUR_NEW_ANON_KEY"
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def fetch_and_sync(search_query):
    print(f"📡 Accessing OpenLibrary for: {search_query}...")
    
    # We query the OpenLibrary API for books with direct archive links
    url = f"https://openlibrary.org/search.json?q={search_query}&has_fulltext=true"
    response = requests.get(url).json()
    
    books_added = 0
    
    for doc in response.get('docs', [])[:15]: # Take top 15 results
        ia_id = doc.get('ia', [None])[0] # Internet Archive ID
        
        if ia_id:
            title = doc.get('title')
            author = doc.get('author_name', ['Unknown'])[0]
            cover_id = doc.get('cover_i')
            subjects = doc.get('subject', [])[:3] # Get top 3 categories
            
            # Construct the direct reading link
            direct_url = f"https://archive.org/details/{ia_id}"
            
            # Sync to your 'virtual_books' table
            data = {
                "title": title,
                "author": author,
                "cover_id": str(cover_id) if cover_id else None,
                "direct_url": direct_url,
                "subjects": subjects
            }
            
            try:
                # Check if book already exists to avoid duplicates
                check = supabase.table('virtual_books').select("id").eq("title", title).execute()
                if not check.data:
                    supabase.table('virtual_books').insert(data).execute()
                    print(f"✅ Added: {title}")
                    books_added += 1
            except Exception as e:
                print(f"❌ Error adding {title}: {e}")

    print(f"🏁 Finished! Added {books_added} new resources to the archive.")

# Run it for Dr. Kalam and Space Science
fetch_and_sync("APJ Abdul Kalam")
fetch_and_sync("Aerospace Engineering")