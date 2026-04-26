import { useState, useEffect } from 'react';
import { db } from '../../services/firebase';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';

import './Dashboard.css';

export default function Dashboard() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('resorts');
  const [editingId, setEditingId] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    price: '',
    image: ''
  });

  async function fetchListings(cat) {
    setLoading(true);
    try {
      if (db) {
        const querySnapshot = await getDocs(collection(db, cat));
        let items = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        setListings(items);
      } else {
        setListings([]);
      }
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchListings(category);
  }, [category]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, category, editingId), {
          ...formData,
          updatedAt: new Date().toISOString()
        });
        alert('Listing updated successfully!');
      } else {
        await addDoc(collection(db, category), {
          ...formData,
          createdAt: new Date().toISOString()
        });
        alert('Listing added successfully!');
      }
      setFormData({ name: '', description: '', location: '', price: '', image: '' });
      setEditingId(null);
      fetchListings(category);
    } catch (error) {
      console.error("Error saving document: ", error);
      alert('Error saving listing.');
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      name: item.name || '',
      description: item.description || '',
      location: item.location || '',
      price: item.price || '',
      image: item.image || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', description: '', location: '', price: '', image: '' });
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await deleteDoc(doc(db, category, id));
        fetchListings(category);
      } catch (error) {
        console.error("Error deleting document: ", error);
        alert('Error deleting listing.');
      }
    }
  };

  return (
    <div className="container section">
      <h1 className="text-center" style={{ marginBottom: '2rem' }}>Admin Dashboard</h1>
      
      <div className="dashboard-grid">
        {/* Sidebar */}
        <div style={{ backgroundColor: 'var(--white)', padding: '1.5rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', height: 'fit-content' }}>
          <h3>Manage Categories</h3>
          <ul style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li>
              <button 
                className={`btn ${category === 'resorts' ? 'btn-primary' : 'btn-outline'}`} 
                style={{ width: '100%', textAlign: 'left' }}
                onClick={() => setCategory('resorts')}
              >
                Private Resorts
              </button>
            </li>
            <li>
              <button 
                className={`btn ${category === 'catering' ? 'btn-primary' : 'btn-outline'}`} 
                style={{ width: '100%', textAlign: 'left' }}
                onClick={() => setCategory('catering')}
              >
                Catering Services
              </button>
            </li>
            <li>
              <button 
                className={`btn ${category === 'tourist_spots' ? 'btn-primary' : 'btn-outline'}`} 
                style={{ width: '100%', textAlign: 'left' }}
                onClick={() => setCategory('tourist_spots')}
              >
                Tourist Spots
              </button>
            </li>
          </ul>
        </div>
        
        {/* Content */}
        <div>
          <div style={{ backgroundColor: 'var(--white)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', marginBottom: '2rem' }}>
            <h2>{editingId ? 'Update' : 'Add New'} {category.replace('_', ' ')}</h2>
            <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" className="form-control" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input type="text" name="location" className="form-control" value={formData.location} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Price (if applicable)</label>
                <input type="text" name="price" className="form-control" value={formData.price} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input type="url" name="image" className="form-control" value={formData.image} onChange={handleInputChange} placeholder="https://..." />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" className="form-control" rows="4" value={formData.description} onChange={handleInputChange} required></textarea>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" className="btn btn-primary">{editingId ? 'Update Listing' : 'Add Listing'}</button>
                {editingId && <button type="button" className="btn btn-outline" onClick={cancelEdit}>Cancel</button>}
              </div>
            </form>
          </div>

          <div style={{ backgroundColor: 'var(--white)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
            <h2>Current Listings ({category.replace('_', ' ')})</h2>
            {loading ? (
              <div className="loader-container"><div className="spinner"></div></div>
            ) : (
              <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {listings.length > 0 ? listings.map(item => (
                  <div key={item.id} className="listing-item">
                    <div>
                      <h4 style={{ margin: 0 }}>{item.name}</h4>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--gray-dark)' }}>{item.location}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => handleEdit(item)} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>Edit</button>
                      <button onClick={() => handleDelete(item.id)} className="btn btn-danger" style={{ padding: '0.5rem 1rem' }}>Delete</button>
                    </div>
                  </div>
                )) : (
                  <p>No listings found in this category.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
