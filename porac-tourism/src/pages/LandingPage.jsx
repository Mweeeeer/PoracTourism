import { Link } from 'react-router-dom';
import { FaHotel, FaUtensils, FaMountain } from 'react-icons/fa';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1>Discover Porac Pampanga</h1>
          <p>Find the best resorts, catering services, and tourist spots</p>
          <div className="hero-btns">
            <Link to="/listings" className="btn btn-primary">Explore Now</Link>
            <Link to="/register" className="btn btn-secondary">Login / Register</Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section categories-section">
        <div className="container">
          <h2 className="text-center section-title">Featured Categories</h2>
          <div className="categories-grid">
            <div className="category-card">
              <FaHotel className="category-icon" />
              <h3>Private Resorts</h3>
              <p>Relax and unwind in exclusive private resorts.</p>
            </div>
            <div className="category-card">
              <FaUtensils className="category-icon" />
              <h3>Catering Services</h3>
              <p>Delicious culinary experiences for your events.</p>
            </div>
            <div className="category-card">
              <FaMountain className="category-icon" />
              <h3>Tourist Spots</h3>
              <p>Explore breathtaking nature and attractions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section about-section bg-light">
        <div className="container about-container">
          <div className="about-content">
            <h2>About Tourism in Porac</h2>
            <p>Porac, a municipality in Pampanga, is rich in natural wonders and breathtaking landscapes. Known for its mountainous terrain, it offers a refreshing escape from the city. Experience world-class private resorts, savor the finest catering services, and explore spots that will leave you in awe.</p>
            <Link to="/listings" className="btn btn-primary">Discover More</Link>
          </div>
          <div className="about-image">
            {/* Using a placeholder nature image for the design */}
            <img src="https://images.unsplash.com/photo-1542224566-6e85f2e6772f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Nature in Porac" />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container text-center">
          <h2>Ready to Plan Your Trip?</h2>
          <p>Join our platform to save your favorite spots and get exclusive updates.</p>
          <Link to="/register" className="btn btn-secondary">Sign Up Today</Link>
        </div>
      </section>
    </div>
  );
}
