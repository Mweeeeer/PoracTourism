import { Link } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';
import './ListingCard.css';

export default function ListingCard({ listing }) {
  // listing format: { id, name, description, location, price, image, category }
  return (
    <div className="listing-card">
      <div className="card-image">
        {listing.image ? (
          <img src={listing.image} alt={listing.name} />
        ) : (
          <div className="image-placeholder">No Image Available</div>
        )}
        <div className="card-category">{listing.category}</div>
      </div>
      <div className="card-content">
        <h3>{listing.name}</h3>
        <p className="location"><FaMapMarkerAlt /> {listing.location}</p>
        <p className="description">{listing.description.substring(0, 100)}...</p>
        <div className="card-footer">
          {listing.price && <span className="price">₱{listing.price}</span>}
          <Link to={`/listings/${listing.id}`} className="btn btn-outline">View Details</Link>
        </div>
      </div>
    </div>
  );
}
