import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/listings');
    } catch (err) {
      setError('Failed to sign in: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container section" style={{ maxWidth: '500px' }}>
      <div style={{ backgroundColor: 'var(--white)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-md)' }}>
        <h2 className="text-center">Log In</h2>
        
        {error && <div style={{ backgroundColor: 'var(--danger)', color: 'white', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" required className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" required className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button disabled={loading} type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Log In
          </button>
        </form>
        
        <div className="text-center" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
          Need an account? <Link to="/register" style={{ color: 'var(--primary-green)', fontWeight: 'bold' }}>Sign Up</Link>
        </div>

        <div style={{ backgroundColor: 'var(--bg-light)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--primary-green)' }}>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--neutral-dark)', textAlign: 'center' }}>
            <strong>Demo Admin Account:</strong><br/>
            Email: merwin@gmail.com<br/>
            Password: merwin
          </p>
        </div>
      </div>
    </div>
  );
}
