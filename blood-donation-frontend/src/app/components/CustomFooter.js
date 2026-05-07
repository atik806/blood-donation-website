import Link from "next/link";

export default function CustomFooter() {
  return (
    <footer className="footer">
       
      <div className="footer-grid">
    
        {/* About */}
        <div className="footer-section">
          <h3>LifeSaver</h3>
          <p>Connecting donors with patients to save lives.</p>
          <Link href="/Login" style={{ backgroundColor: '#fff', color: '#dc2626', textDecoration: 'none', display: 'inline-block', padding: '10px 20px', borderRadius: '6px' }}>
            Donate Now
          </Link>
        </div>

        {/* Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <p><Link href="/">Home</Link></p>
          <p><Link href="/Login">Find Donor</Link></p>
          <p><Link href="/Login">Become Donor</Link></p>
          <p><Link href="/About">About</Link></p>
        </div>

        {/* Blood Groups */}
        <div className="footer-section">
          <h3>Blood Groups</h3>
          <p>A+ | A- | B+ | B-</p>
          <p>AB+ | AB- | O+ | O-</p>
          <p>24/7 Emergency Support</p>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Emergency Contact</h3>
          <p>📞 +880 1234-567890</p>
          <p>📧 help@lifesaver.com</p>
          <p className="footer-social">
            <a href="#">Facebook</a>
            <a href="#">WhatsApp</a>
            <a href="#">LinkedIn</a>
          </p>
        </div>

      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        © 2026 LifeSaver | Save Lives ❤️
      </div>

    </footer>
  );
}