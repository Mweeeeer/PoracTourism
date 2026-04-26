import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await register(email, password, name);
      navigate('/listings');
    } catch (err) {
      setError('Failed to create an account: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container section" style={{ maxWidth: '500px' }}>
      <div style={{ backgroundColor: 'var(--white)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-md)' }}>
        <h2 className="text-center">Create an Account</h2>
        {error && <div style={{ backgroundColor: 'var(--danger)', color: 'white', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" required className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" required className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" required className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" required className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <button disabled={loading} type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Sign Up
          </button>
        </form>
        
        <div className="text-center" style={{ marginTop: '1.5rem' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary-green)', fontWeight: 'bold' }}>Log In</Link>
        </div>
      </div>
    </div>
  );
}
