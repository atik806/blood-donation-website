import Link from "next/link";

export default function BodyArea() {
  return (
    <div className="bodyarea-container">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .hero-content {
          animation: fadeInUp 0.8s ease-out;
        }
        .stat-card {
          animation: fadeInUp 0.8s ease-out;
          transition: all 0.3s ease;
        }
        .stat-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 12px 30px rgba(220, 38, 38, 0.2);
        }
        .feature-card {
          animation: fadeInUp 0.8s ease-out;
          transition: all 0.3s ease;
        }
        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
        }
        .btn-primary {
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(220, 38, 38, 0.4);
        }
        .bloodgroup-badge {
          animation: fadeInUp 0.8s ease-out;
          transition: all 0.3s ease;
        }
        .bloodgroup-badge:hover {
          transform: scale(1.1) rotate(5deg);
        }
      `}</style>

      {/* Hero Section */}
      <section style={{ background: 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 50%, #dc2626 100%)', color: '#fff', padding: '120px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle at 20% 50%, #fff 0%, transparent 50%), radial-gradient(circle at 80% 80%, #fff 0%, transparent 50%)', pointerEvents: 'none' }}></div>
        <div className="hero-content" style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px', animation: 'pulse 2s infinite' }}>❤️</div>
          <h1 style={{ fontSize: '4rem', fontWeight: '900', marginBottom: '20px', color: '#fff', lineHeight: '1.2' }}>
            Donate Blood, Save Lives
          </h1>
          <p style={{ fontSize: '1.4rem', color: '#fecaca', marginBottom: '40px', lineHeight: '1.8', fontWeight: '300' }}>
            Every donation is a lifeline. Be a hero and help someone in need. Your 15 minutes can save up to 3 lives.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/Login" className="btn-primary" style={{ backgroundColor: '#fff', color: '#dc2626', padding: '16px 40px', borderRadius: '50px', textDecoration: 'none', fontWeight: '700', fontSize: '1.1rem' }}>
              🩸 Become a Donor
            </Link>
            <Link href="/Signup" className="btn-primary" style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff', padding: '16px 40px', borderRadius: '50px', border: '2px solid #fff', textDecoration: 'none', fontWeight: '700', fontSize: '1.1rem', backdropFilter: 'blur(10px)' }}>
              📋 Request Blood
            </Link>
          </div>
        </div>
      </section>


      {/* Stats Section */}
      <section style={{ padding: '80px 20px', backgroundColor: '#fff', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.8rem', color: '#7f1d1d', marginBottom: '60px', fontWeight: '800' }}>Our Impact</h2>
        <div style={{ maxWidth: '1200px', margin: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px' }}>
          <div className="stat-card" style={{ padding: '40px 20px', borderRadius: '16px', background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)', border: '2px solid #fecaca' }}>
            <div style={{ fontSize: '3rem', fontWeight: '900', color: '#dc2626', marginBottom: '10px' }}>10K+</div>
            <p style={{ fontSize: '1.1rem', color: '#7f1d1d', fontWeight: '600' }}>Active Donors</p>
            <p style={{ fontSize: '0.9rem', color: '#991b1b', marginTop: '8px' }}>Making a difference</p>
          </div>
          <div className="stat-card" style={{ padding: '40px 20px', borderRadius: '16px', background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)', border: '2px solid #fecaca' }}>
            <div style={{ fontSize: '3rem', fontWeight: '900', color: '#dc2626', marginBottom: '10px' }}>50K+</div>
            <p style={{ fontSize: '1.1rem', color: '#7f1d1d', fontWeight: '600' }}>Lives Saved</p>
            <p style={{ fontSize: '0.9rem', color: '#991b1b', marginTop: '8px' }}>Through donations</p>
          </div>
          <div className="stat-card" style={{ padding: '40px 20px', borderRadius: '16px', background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)', border: '2px solid #fecaca' }}>
            <div style={{ fontSize: '3rem', fontWeight: '900', color: '#dc2626', marginBottom: '10px' }}>100+</div>
            <p style={{ fontSize: '1.1rem', color: '#7f1d1d', fontWeight: '600' }}>Hospitals</p>
            <p style={{ fontSize: '0.9rem', color: '#991b1b', marginTop: '8px' }}>Connected network</p>
          </div>
          <div className="stat-card" style={{ padding: '40px 20px', borderRadius: '16px', background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)', border: '2px solid #fecaca' }}>
            <div style={{ fontSize: '3rem', fontWeight: '900', color: '#dc2626', marginBottom: '10px' }}>24/7</div>
            <p style={{ fontSize: '1.1rem', color: '#7f1d1d', fontWeight: '600' }}>Support</p>
            <p style={{ fontSize: '0.9rem', color: '#991b1b', marginTop: '8px' }}>Always available</p>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section style={{ backgroundColor: '#fef2f2', padding: '100px 20px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.8rem', color: '#7f1d1d', marginBottom: '20px', fontWeight: '800' }}>Why Your Donation Matters</h2>
        <p style={{ textAlign: 'center', fontSize: '1.1rem', color: '#666', marginBottom: '60px', maxWidth: '600px', margin: '0 auto 60px' }}>One donation can save up to 3 lives. Here's how your contribution makes a real difference.</p>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
          <div className="feature-card" style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #fee2e2' }}>
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🚑</div>
            <h3 style={{ color: '#dc2626', marginBottom: '15px', fontSize: '1.4rem', fontWeight: '700' }}>Emergency Situations</h3>
            <p style={{ color: '#666', lineHeight: '1.8' }}>Accident victims and trauma patients need immediate blood transfusions. Your donation can be the difference between life and death.</p>
          </div>
          <div className="feature-card" style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #fee2e2' }}>
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🏥</div>
            <h3 style={{ color: '#dc2626', marginBottom: '15px', fontSize: '1.4rem', fontWeight: '700' }}>Surgical Procedures</h3>
            <p style={{ color: '#666', lineHeight: '1.8' }}>Major surgeries require blood transfusions. Your donation ensures patients can undergo life-saving procedures safely.</p>
          </div>
          <div className="feature-card" style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #fee2e2' }}>
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>👶</div>
            <h3 style={{ color: '#dc2626', marginBottom: '15px', fontSize: '1.4rem', fontWeight: '700' }}>Chronic Treatments</h3>
            <p style={{ color: '#666', lineHeight: '1.8' }}>Patients with anemia, cancer, and blood disorders need regular transfusions. Your donation provides hope and healing.</p>
          </div>
        </div>
      </section>

      {/* Blood Groups */}
      <section style={{ background: '#fff', padding: '100px 20px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.8rem', color: '#7f1d1d', marginBottom: '20px', fontWeight: '800' }}>All Blood Types Needed</h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '50px', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 50px' }}>Every blood type is valuable. Whether you're O-, O+, or any other type, your donation saves lives.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', maxWidth: '800px', margin: '0 auto' }}>
          {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((type) => (
            <span key={type} className="bloodgroup-badge" style={{ backgroundColor: '#dc2626', color: '#fff', padding: '16px 24px', borderRadius: '12px', fontWeight: '700', fontSize: '1.1rem', boxShadow: '0 4px 15px rgba(220, 38, 38, 0.2)', cursor: 'pointer' }}>
              {type}
            </span>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 50%, #7f1d1d 100%)', padding: '100px 20px', textAlign: 'center', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle at 20% 50%, #fff 0%, transparent 50%)', pointerEvents: 'none' }}></div>
        <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '20px', fontWeight: '800' }}>Ready to Save Lives?</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '40px', color: '#fecaca', lineHeight: '1.8' }}>Join thousands of heroes who have already made a difference. Your 15-minute donation can save up to 3 lives today.</p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/Signup" className="btn-primary" style={{ backgroundColor: '#fff', color: '#dc2626', padding: '18px 45px', borderRadius: '50px', textDecoration: 'none', fontWeight: '700', fontSize: '1.1rem', display: 'inline-block' }}>
              🩸 Register as Donor
            </Link>
            <Link href="/Login" className="btn-primary" style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff', padding: '18px 45px', borderRadius: '50px', border: '2px solid #fff', textDecoration: 'none', fontWeight: '700', fontSize: '1.1rem', display: 'inline-block', backdropFilter: 'blur(10px)' }}>
              📋 Request Blood
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}