import Link from "next/link";
import "./SignUp.css";
export default function Signup() {
  return (
    <div className="signup-body">
    <div className="container">
      <div className="card">
        <h1 className="title">Sign Up</h1>
        <p className="subtitle">
          Join as a donor and help save lives ❤️
        </p>

        <form className="form">
          <input type="text" placeholder="Full Name" className="input" />
          <input type="email" placeholder="Email Address" className="input" />

          <select className="input">
            <option>Select Blood Group</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>O+</option>
            <option>O-</option>
            <option>AB+</option>
            <option>AB-</option>
          </select>

          <div className="radioGroup">
            <label>
              <input type="radio" name="gender" />
              Male
            </label>
            <label>
              <input type="radio" name="gender" />
              Female
            </label>
            <label>
              <input type="radio" name="gender" />
              Other
            </label>
          </div>
          <select className="input">
            
            <option>Become a Donor</option>
            <option>Find a Donor</option>
            
          </select>

          <input type="password" placeholder="Password" className="input" />

          <button type="submit" className="button">
            Register
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}
