# Admin Setup Instructions

## Environment Setup

1. **Copy environment variables**:
   ```bash
   cp .env.local.example .env.local
   ```
2. **Update .env.local** with your database credentials and admin details:
   ```
   NEXTAUTH_SECRET=your-nextauth-secret-key-for-development
   NEXTAUTH_URL=http://localhost:3000
   MONGODB_URI=mongodb://localhost:27017/nextjsteer
   ADMIN_EMAIL=admin@morningsundayteer.today
   ADMIN_PASSWORD=admin123
   ```

## Admin User Creation

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Create admin user**:
   ```bash
   npm run create-admin
   ```

## Admin Functionality

When logged in as an admin user, the following features are hidden:

### Home Page

- Morning Noon Result section
- Morning Evening Result section
- Common Number Noon card
- Common Number Evening card

### Previous Results Page

- Previous Noon Result card
- Previous Evening Result card

### Route Protection

The following routes are automatically blocked for admin users:

- `/common-number-noon`
- `/common-number-eve`
- `/previous-result-noon`
- `/previous-result-eve`
- `/add-result-noon`
- `/add-result-eve`

## Login Credentials

- **Email**: admin@morningsundayteer.today (or value from ADMIN_EMAIL in .env.local)
- **Password**: admin123 (or value from ADMIN_PASSWORD in .env.local)

## Development

```bash
npm run dev
```

Visit http://localhost:3000 and login with admin credentials to test the functionality.
