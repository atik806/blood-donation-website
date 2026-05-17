import Link from "next/link";

export default function BodyArea() {
  return (
    <div className="bodyarea-container">
      {/* Hero Section */}
      <section className="hero-home" style={{ background: 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%)', color: '#fff', padding: '100px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '20px', color: '#fff' }}>
            Donate Blood, Save Lives ❤️
          </h1>
          <p style={{ fontSize: '1.3rem', color: '#fecaca', marginBottom: '30px', lineHeight: '1.6' }}>
            Be a hero today. Your donation can save multiple lives. Join thousands of donors making a difference.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/Login" style={{ backgroundColor: '#fff', color: '#dc2626', padding: '14px 32px', borderRadius: '50px', textDecoration: 'none', fontWeight: '600', fontSize: '1.1rem', transition: '0.3s' }}>
              Become a Donor
            </Link>
            <Link href="/about" style={{ backgroundColor: 'transparent', color: '#fff', padding: '14px 32px', borderRadius: '50px', border: '2px solid #fff', textDecoration: 'none', fontWeight: '600', fontSize: '1.1rem', transition: '0.3s' }}>
              Learn More
            </Link>
          </div>
        </div>
      </section>
      

      {/* Stats Section */}
      <section className="stats-section" style={{ padding: '60px 20px', backgroundColor: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: '1000px', margin: 'auto ', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' }}>
          <div style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '2.5rem', color: '#dc2626', fontWeight: '700', marginBottom: '10px' }}>10,000+</h3>
            <p style={{ fontSize: '1.1rem', color: '#666' }}>Donors Registered</p>
          </div>
          <div style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '2.5rem', color: '#dc2626', fontWeight: '700', marginBottom: '10px' }}>50,000+</h3>
            <p style={{ fontSize: '1.1rem', color: '#666' }}>Lives Saved</p>
          </div>
          <div style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '2.5rem', color: '#dc2626', fontWeight: '700', marginBottom: '10px' }}>100+</h3>
            <p style={{ fontSize: '1.1rem', color: '#666' }}>Hospitals Connected</p>
          </div>
          <div style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '2.5rem', color: '#dc2626', fontWeight: '700', marginBottom: '10px' }}>24/7</h3>
            <p style={{ fontSize: '1.1rem', color: '#666' }}>Emergency Support</p>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="bodyarea-section" style={{ backgroundColor: '#fef2f2', padding: '80px 20px' }}>
        <h2 className="bodyarea-heading" style={{ textAlign: 'center', fontSize: '2.5rem', color: '#7f1d1d', marginBottom: '20px' }}>Why Donate Blood?</h2>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '15px' }}>🚑</div>
            <h3 style={{ color: '#dc2626', marginBottom: '10px' }}>Emergency Situations</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>Help accident victims and patients in critical condition who need immediate blood transfusions.</p>
          </div>
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '15px' }}>🏥</div>
            <h3 style={{ color: '#dc2626', marginBottom: '10px' }}>Surgical Procedures</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>Support patients undergoing major surgeries who require blood transfusions.</p>
          </div>
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '15px' }}>👶</div>
            <h3 style={{ color: '#dc2626', marginBottom: '10px' }}>Treatments</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>Help patients with anemia, cancer, and other diseases who need regular blood transfusions.</p>
          </div>
        </div>
      </section>

      {/* Blood Groups */}
      <section className="bodyarea-section" style={{ background: '#fff', padding: '80px 20px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', color: '#7f1d1d', marginBottom: '20px' }}>Available Blood Groups</h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>All blood types are needed. Your donation can save anyone.</p>
        <div className="bodyarea-bloodgroups" style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          <span className="bloodgroup-badge">A+</span>
          <span className="bloodgroup-badge">A-</span>
          <span className="bloodgroup-badge">B+</span>
          <span className="bloodgroup-badge">B-</span>
          <span className="bloodgroup-badge">AB+</span>
          <span className="bloodgroup-badge">AB-</span>
          <span className="bloodgroup-badge">O+</span>
          <span className="bloodgroup-badge">O-</span>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)', padding: '80px 20px', textAlign: 'center', color: '#fff' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Ready to Save Lives?</h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '30px', color: '#fecaca' }}>Join our community of heroes today. It only takes 15 minutes.</p>
        <Link href="/signup" style={{ backgroundColor: '#fff', color: '#dc2626', padding: '16px 40px', borderRadius: '50px', textDecoration: 'none', fontWeight: '700', fontSize: '1.2rem', display: 'inline-block' }}>
          Register Now
        </Link>
      </section>
    </div>
  );
}