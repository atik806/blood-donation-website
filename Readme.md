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


# Blood Donation Management System - Backend

NestJS REST API backend for the Blood Donation Management System. Provides authentication, donor/patient management, admin controls, and blood request handling.

## Tech Stack

- **Framework:** NestJS 11
- **Language:** TypeScript
- **ORM:** TypeORM 0.3
- **Database:** PostgreSQL
- **Auth:** JWT + Passport + bcrypt
- **Validation:** class-validator + class-transformer

## Project Structure

```
src/
├── auth/              # Authentication module
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── jwt.strategy.ts       # Passport JWT strategy
│   ├── jwtGuard.guard.ts     # JWT guard (checks token)
│   ├── roles.guard.ts        # Role-based access guard
│   ├── login.dto.ts
│   ├── current-donor-decorator.ts
│   ├── public.decorator.ts
│   └── roles.decorator.ts
├── donor/             # Donor CRUD
│   ├── donor.controller.ts
│   ├── donor.service.ts
│   ├── donor.entity.ts
│   └── Create.donor.dto.ts
├── patient/           # Patient CRUD
│   ├── patient.controller.ts
│   ├── patient.service.ts
│   ├── patient.entity.ts
│   └── create-patient-dto.ts
├── admin/             # Admin management
│   ├── admin.controller.ts
│   ├── admin.service.ts
│   ├── admin.entity.ts
│   └── admin.dto.ts
├── blood-request/     # Blood request management
│   ├── blood-request.controller.ts
│   ├── blood-request.service.ts
│   ├── blood-request.entity.ts
│   └── create-blood-request.dto.ts
├── app.module.ts      # Root module
├── app.controller.ts
├── app.service.ts
└── main.ts            # Entry point (port 3000)
```

## Setup

### Prerequisites

- Node.js v18+
- PostgreSQL running on `localhost:5432`
- npm

### Installation

```bash
npm install
```

### Database

Create a PostgreSQL database:

```sql
CREATE DATABASE blood_donation;
```

Configure credentials in `.env` (see `.env.example`):

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=blood_donation
JWT_SECRET=your_jwt_secret
```

> **Note:** `synchronize: true` is enabled in `app.module.ts`, so tables are auto-created on startup.

### Running

```bash
# development (watch mode)
npm run start:dev

# production
npm run build && npm run start:prod
```

The API runs on `http://localhost:3000` by default.

## API Endpoints

### Authentication (`/auth`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/donor/register` | Public | Register new donor |
| POST | `/auth/donor/login` | Public | Donor login |
| POST | `/auth/patient/login` | Public | Patient login |
| POST | `/auth/admin/login` | Public | Admin login |
| POST | `/auth/admin/register` | Public | Register new admin |

### Donors (`/donor`)

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| POST | `/donor` | Public | - | Create donor |
| GET | `/donor` | JWT | Admin | List all donors |
| GET | `/donor/profile` | JWT | Donor | Get own profile |
| GET | `/donor/:id` | JWT | Admin/Donor | Get donor by ID |
| PATCH | `/donor/:id` | JWT | Donor | Update donor |
| DELETE | `/donor/:id` | JWT | Admin | Delete donor |

### Patients (`/patient`)

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| POST | `/patient` | Public | - | Register patient |
| GET | `/patient` | JWT | Admin | List all patients |
| GET | `/patient/:id` | JWT | Admin/Patient | Get patient by ID |
| PATCH | `/patient/:id` | JWT | Patient | Update patient |
| DELETE | `/patient/:id` | JWT | Admin | Delete patient |

### Blood Requests (`/blood-requests`)

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| POST | `/blood-requests` | Public | - | Create request |
| GET | `/blood-requests` | JWT | Admin | List all requests |
| GET | `/blood-requests/:id` | JWT | Admin/Patient | Get by ID |
| GET | `/blood-requests/patient/:patientId` | JWT | Admin/Patient | Get by patient |
| PATCH | `/blood-requests/:id/status` | JWT | Admin | Update status |
| DELETE | `/blood-requests/:id` | JWT | Admin | Delete request |

### Admin Management (`/admin`)

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| POST | `/admin` | Public | - | Create admin |
| GET | `/admin/donors` | JWT | Admin | List all donors |
| GET | `/admin/donors/:id` | JWT | Admin | Get donor by ID |
| PATCH | `/admin/donors/:id` | JWT | Admin | Update donor |
| DELETE | `/admin/donors/:id` | JWT | Admin | Delete donor |

## Entities

### Donor
| Field | Type | Notes |
|-------|------|-------|
| id | number | Primary key |
| name | string | |
| email | string | Unique |
| password | string | bcrypt hashed |
| bloodGroup | string | |
| phone | string | Nullable |
| address | string | Nullable |
| available | boolean | Default: true |
| roles | string | Default: "donor" |
| lastDonationDate | string | Nullable |
| totalDonations | number | Default: 0 |

### Patient
| Field | Type | Notes |
|-------|------|-------|
| id | number | Primary key |
| name | string | |
| email | string | Unique |
| password | string | bcrypt hashed |
| bloodGroupNeeded | string | |
| phone | string | |
| address | string | |
| hospital | string | |
| urgency | string | Default: "normal" |
| roles | string | Default: "patient" |

### Admin
| Field | Type | Notes |
|-------|------|-------|
| id | number | Primary key |
| name | string | |
| email | string | |
| password | string | bcrypt hashed |
| roles | string | Default: "admin" |

### BloodRequest
| Field | Type | Notes |
|-------|------|-------|
| id | number | Primary key |
| patient | relation | Many-to-One with Patient |
| patientId | number | Foreign key |
| bloodGroup | string | |
| units | number | Default: 1 |
| hospital | string | |
| urgency | string | "normal" / "emergency" |
| status | string | "pending" / "fulfilled" / "cancelled" |
| createdAt | timestamp | Auto-generated |
| updatedAt | timestamp | Auto-updated |

## Scripts

```bash
npm run build        # Compile TypeScript
npm run start        # Start server
npm run start:dev    # Start with watch mode
npm run start:prod   # Start compiled production build
npm run test         # Run unit tests
npm run test:e2e     # Run e2e tests
npm run lint         # Lint source files
```

## Frontend

The frontend Next.js application is available at `../blood-donation-frontend/`. The frontend runs on port 4000 and expects this API on port 3000.


## License

MIT
