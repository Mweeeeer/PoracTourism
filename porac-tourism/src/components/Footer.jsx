import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Porac Tourism Platform. All rights reserved.</p>
    </footer>
  );
}
