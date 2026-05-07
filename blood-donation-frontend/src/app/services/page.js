export default function ServicesPage() {
  return (
    <div style={{ padding: '80px 40px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', color: '#7f1d1d', marginBottom: '1rem' }}>Our Services</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '40px auto' }}>
        <div style={{ padding: '30px', backgroundColor: '#fef2f2', borderRadius: '12px' }}>
          <h3 style={{ color: '#dc2626', fontSize: '1.5rem' }}>Find Donors</h3>
          <p style={{ color: '#666', lineHeight: '1.6' }}>Search for blood donors in your area matching your blood type requirements.</p>
        </div>
        <div style={{ padding: '30px', backgroundColor: '#fef2f2', borderRadius: '12px' }}>
          <h3 style={{ color: '#dc2626', fontSize: '1.5rem' }}>Become a Donor</h3>
          <p style={{ color: '#666', lineHeight: '1.6' }}>Register as a blood donor and help save lives in your community.</p>
        </div>
        <div style={{ padding: '30px', backgroundColor: '#fef2f2', borderRadius: '12px' }}>
          <h3 style={{ color: '#dc2626', fontSize: '1.5rem' }}>Emergency Support</h3>
          <p style={{ color: '#666', lineHeight: '1.6' }}>24/7 emergency blood requirement support for critical situations.</p>
        </div>
      </div>
    </div>
  );
}