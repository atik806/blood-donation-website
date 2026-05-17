import "./contact.css";

export default function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-left">
          <h1>Contact Us</h1>

          <p>
            Have questions about blood donation or want to become a donor?
            Reach out to us anytime.
          </p>

          <div className="info-box">
            <h3>📍 Address</h3>
            <p>Dhaka, Bangladesh</p>
          </div>

          <div className="info-box">
            <h3>📞 Phone</h3>
            <p>+880 1700-000000</p>
          </div>

          <div className="info-box">
            <h3>✉️ Email</h3>
            <p>support@bloodcare.com</p>
          </div>
        </div>

        <div className="contact-right">
          <form>
            <div className="input-group">
              <label>Full Name</label>
              <input type="text" placeholder="Enter your name" />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" />
            </div>

            <div className="input-group">
              <label>Subject</label>
              <input type="text" placeholder="Enter subject" />
            </div>

            <div className="input-group">
              <label>Message</label>
              <textarea
                rows="5"
                placeholder="Write your message..."
              ></textarea>
            </div>

            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}