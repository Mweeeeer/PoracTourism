import { useState, useEffect } from 'react';
import ListingCard from '../components/ListingCard';
import { db } from '../services/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function ListingsPage() {
  const [listings, setListings] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchListings() {
      setLoading(true);
      try {
        const categories = ['resorts', 'catering', 'tourist_spots'];
        let allListings = [];
        
        // In a real scenario with proper Firebase setup, this would fetch from actual collections.
        // If collections are empty, we might use dummy data for display purposes.
        if (db) {
          for (const cat of categories) {
            const querySnapshot = await getDocs(collection(db, cat));
            querySnapshot.forEach((doc) => {
              allListings.push({ id: doc.id, category: cat, ...doc.data() });
            });
          }
        }
        
        // Dummy data fallback if DB is empty
        if (allListings.length === 0) {
          allListings = [
            { id: '1', name: 'Green Valley Resort', description: 'A beautiful private resort with a large pool.', location: 'Porac', price: '5000', category: 'resorts', image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=500&q=80' },
            { id: '2', name: 'Taste of Pampanga', description: 'Authentic Kapampangan cuisine for your events.', location: 'Porac', price: '300/pax', category: 'catering', image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=500&q=80' },
            { id: '3', name: 'Miyamit Falls', description: 'Majestic waterfalls hidden in the mountains.', location: 'Porac', price: 'Free', category: 'tourist_spots', image: 'https://images.unsplash.com/photo-1432405972618-c600f5171e0c?w=500&q=80' }
          ];
        }

        setListings(allListings);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, []);

  const filteredListings = filter === 'all' 
    ? listings 
    : listings.filter(item => item.category === filter);

  return (
    <div className="section container">
      <h1 className="text-center" style={{ marginBottom: '2rem' }}>Explore Porac</h1>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
        <button className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setFilter('all')}>All</button>
        <button className={`btn ${filter === 'resorts' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setFilter('resorts')}>Resorts</button>
        <button className={`btn ${filter === 'catering' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setFilter('catering')}>Catering</button>
        <button className={`btn ${filter === 'tourist_spots' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setFilter('tourist_spots')}>Tourist Spots</button>
      </div>

      {loading ? (
        <div className="loader-container"><div className="spinner"></div></div>
      ) : (
        <div className="categories-grid">
          {filteredListings.length > 0 ? (
            filteredListings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))
          ) : (
            <p className="text-center" style={{ gridColumn: '1 / -1' }}>No listings found.</p>
          )}
        </div>
      )}
    </div>
  );
}
