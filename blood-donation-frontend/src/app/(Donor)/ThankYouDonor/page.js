"use client";

import { useRouter } from "next/navigation";
import "./style.css";

export default function ThankYouDonor() {
  const router = useRouter();

  return (
    <div className="thank-you-container">
      <div className="thank-you-card">
        
        {/* Heart Icon */}
        <div className="heart-icon">
          ❤️
        </div>

        {/* Heading */}
        <h1 className="thank-you-title">
          Thank You, Donor!
        </h1>

        {/* Message */}
        <p className="thank-you-message">
          Your kindness and willingness to donate blood
          can save lives and give hope to patients in
          need. Every donation matters and your support
          makes a real difference.
        </p>

        {/* Quote */}
        <div className="thank-you-quote">
          "A single donation can save multiple lives."
        </div>

        {/* Buttons */}
        <div className="button-group">
          <button
            onClick={() =>
              router.push("/donorDashboard")
            }
            className="btn btn-primary"
          >
            Back to Dashboard
          </button>

          <button
            onClick={() =>
              router.push("/viewBloodRequests")
            }
            className="btn btn-secondary"
          >
            View More Requests
          </button>
        </div>
      </div>
    </div>
  );
}
