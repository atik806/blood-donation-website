# Blood Donation Management System - Frontend

A modern web application built with Next.js for managing blood donations, connecting donors with patients in need.

## Features

### Authentication
- User registration with role selection (Donor/Patient)
- Login with role-based authentication (Donor/Patient/Admin)
- JWT token-based session management

### Role-Based Dashboards

#### Donor Dashboard
- View personal profile information
- Track donation history (total donations, last donation date)
- Update availability status
- View and respond to blood requests

#### Patient Dashboard
- Submit blood requests
- Track request status (pending/fulfilled)
- View request history

#### Admin Dashboard
- View statistics (total donors, patients, requests)
- Manage donors and patients
- Monitor blood requests

### Landing Page
- Hero section with call-to-action
- Impact statistics
- Information about why to donate blood
- Display of all blood types
- Registration CTA

## Tech Stack

- **Framework:** Next.js 16.2.4
- **UI Library:** React 19.2.4
- **Styling:** Tailwind CSS 4.3.0
- **Runtime:** Node.js

## Project Structure

```
blood-donation-frontend/
├── src/app/
│   ├── (Admin)/              # Admin route group
│   │   └── AdminDashboard/   # Admin dashboard page
│   ├── (Donor)/              # Donor route group
│   │   ├── donorDashboard/   # Donor dashboard
│   │   ├── UpdateProfile/    # Profile update
│   │   └── UpdateAvailability/ # Availability update
│   ├── (Patient)/            # Patient route group
│   │   └── patientDashboard/ # Patient dashboard
│   ├── Login/                # Login page
│   ├── Signup/               # Registration page
│   ├── landingPage/          # Landing page
│   ├── Contact/              # Contact page
│   ├── About/                # About page
│   └── services/             # Services page
├── public/                   # Static assets
└── package.json              # Dependencies
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd blood-donation-frontend
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:4000](http://localhost:4000) in your browser

### Available Scripts

- `npm run dev` - Start development server on port 4000
- `npm run build` - Build for production
- `npm run start` - Start production server

## API Endpoints

The frontend communicates with the backend at `http://localhost:3000`:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/auth/donor/register` | POST | Register new donor |
| `/auth/donor/login` | POST | Donor login |
| `/auth/patient/register` | POST | Register new patient |
| `/auth/patient/login` | POST | Patient login |
| `/auth/admin/login` | POST | Admin login |
| `/donor/profile` | GET | Get donor profile |

## Blood Groups Supported

- A+
- A-
- B+
- B-
- AB+
- AB-
- O+
- O-

## User Flow

1. **Landing Page** - Users can learn about the platform and start donating
2. **Registration** - Users sign up as either Donor or Patient
3. **Login** - Authentication with role selection
4. **Dashboard** - Role-specific dashboard with relevant features

## Environment

This is a frontend application that requires a backend API running on `http://localhost:3000`.

## License

MIT
