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
