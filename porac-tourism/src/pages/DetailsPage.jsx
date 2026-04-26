import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { FaMapMarkerAlt, FaMoneyBillWave, FaPhone } from 'react-icons/fa';

export default function DetailsPage() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you might need to know the category to fetch the exact doc,
    // or query across collections if id is unique.
    // For this example, we simulate fetching.
    setTimeout(() => {
      setListing({
        id,
        name: 'Sample Destination',
        description: 'This is a detailed description of the destination. It features beautiful amenities, great customer service, and an unforgettable experience in Porac Pampanga. Perfect for family gatherings and corporate events.',
        location: 'Barangay XYZ, Porac',
        price: '5,000 / night',
        contact: '+63 912 345 6789',
        category: 'resorts',
        image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1000&q=80'
      });
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) return <div className="loader-container"><div className="spinner"></div></div>;
  if (!listing) return <div className="container section text-center"><h2>Listing not found</h2><Link to="/listings" className="btn btn-primary">Back to Listings</Link></div>;

  return (
    <div className="container section">
      <Link to="/listings" className="btn btn-outline" style={{ marginBottom: '2rem' }}>&larr; Back</Link>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
        <div>
          <img src={listing.image} alt={listing.name} style={{ width: '100%', borderRadius: '12px', boxShadow: 'var(--shadow-md)' }} />
        </div>
        
        <div>
          <span style={{ backgroundColor: 'var(--primary-yellow)', padding: '0.25rem 1rem', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 'bold', textTransform: 'capitalize' }}>
            {listing.category.replace('_', ' ')}
          </span>
          <h1 style={{ marginTop: '1rem', fontSize: '2.5rem' }}>{listing.name}</h1>
          
          <div style={{ margin: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--gray-dark)' }}>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaMapMarkerAlt /> {listing.location}</p>
            {listing.price && <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaMoneyBillWave /> ₱{listing.price}</p>}
            {listing.contact && <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaPhone /> {listing.contact}</p>}
          </div>
          
          <div style={{ marginTop: '2rem' }}>
            <h3>About</h3>
            <p style={{ lineHeight: '1.8' }}>{listing.description}</p>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <button className="btn btn-primary" style={{ width: '100%' }}>Book Now / Inquire</button>
          </div>
        </div>
      </div>
    </div>
  );
}
