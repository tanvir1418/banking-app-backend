# User Admin API

A comprehensive NodeJS API system built with ExpressJS and MongoDB, featuring user registration, authentication, admin management, and secure password reset functionality.

## Features

- **User Registration & Authentication**
- **Admin Management System**
- **JWT-based Authentication with 30-day token expiry**
- **Email Notifications for login and password reset**
- **Secure Password Reset with Token-based System**
- **Role-based Access Control (User/Admin)**
- **Comprehensive Input Validation**
- **Security Middleware (CORS, Helmet, Rate Limiting, etc.)**
- **Default Admin Creation**
- **Well-structured Modular Architecture**

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi
- **Email**: Nodemailer
- **Security**: Helmet, CORS, Rate Limiting, XSS Protection, HPP, Mongo Sanitize
- **Password Hashing**: bcryptjs

## Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd user-admin-api
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Setup**

```bash
cp .env.example .env
```

4. **Configure environment variables in `.env`**

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/user-admin-db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-complex
JWT_EXPIRES_IN=30d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Default Admin Configuration
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123456

# Frontend URL (for reset password links)
FRONTEND_URL=http://localhost:3000
```

5. **Start the server**

```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Public Routes (`/api/public`)

#### User Registration

```http
POST /api/public/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

#### User/Admin Login

```http
POST /api/public/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Forgot Password

```http
POST /api/public/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

#### Reset Password

```http
POST /api/public/reset-password/:token
Content-Type: application/json

{
  "password": "newpassword123",
  "confirmPassword": "newpassword123"
}
```

### Common Routes (`/api/common`) - Requires Authentication

#### Get Profile

```http
GET /api/common/profile
Authorization: Bearer <token>
```

#### Verify Token

```http
GET /api/common/verify-token
Authorization: Bearer <token>
```

### User Routes (`/api/user`) - Requires User Role

#### Update Profile

```http
PUT /api/user/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "email": "newemail@example.com"
}
```

#### Change Password

```http
PUT /api/user/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

#### Delete Account

```http
DELETE /api/user/account
Authorization: Bearer <token>
```

### Admin Routes (`/api/admin`) - Requires Admin Role

#### Get Dashboard Stats

```http
GET /api/admin/dashboard
Authorization: Bearer <token>
```

#### Get All Users

```http
GET /api/admin/users
Authorization: Bearer <token>
```

#### Get User by ID

```http
GET /api/admin/users/:id
Authorization: Bearer <token>
```

#### Update User Status

```http
PUT /api/admin/users/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "isActive": true
}
```

#### Delete User

```http
DELETE /api/admin/users/:id
Authorization: Bearer <token>
```

## Response Format

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {},
  "token": "jwt-token-here"
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

## Security Features

- **JWT Authentication** with 30-day expiry
- **Password Hashing** using bcryptjs
- **Rate Limiting** (100 requests per 15 minutes, 5 for auth routes)
- **CORS Protection**
- **Helmet** for security headers
- **XSS Protection**
- **NoSQL Injection Prevention**
- **HTTP Parameter Pollution Prevention**
- **Input Validation** using Joi

## Project Structure

```
├── config/
│   └── database.js          # Database configuration
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── adminController.js   # Admin management
│   └── userController.js    # User management
├── helpers/
│   ├── jwtHelper.js         # JWT utilities
│   └── emailHelper.js       # Email utilities
├── middlewares/
│   ├── authMiddleware.js    # Authentication middleware
│   ├── validationMiddleware.js # Validation middleware
│   └── errorMiddleware.js   # Error handling
├── models/
│   └── User.js              # User model
├── routes/
│   ├── publicRoutes.js      # Public endpoints
│   ├── commonRoutes.js      # Common endpoints
│   ├── userRoutes.js        # User endpoints
│   └── adminRoutes.js       # Admin endpoints
├── utils/
│   └── createDefaultAdmin.js # Default admin creation
├── validations/
│   └── authValidation.js    # Input validation schemas
├── .env.example             # Environment variables template
├── package.json             # Dependencies and scripts
└── server.js                # Main server file
```

## Default Admin Account

When the server starts for the first time, it automatically creates a default admin account:

- **Email**: Value from `ADMIN_EMAIL` environment variable
- **Password**: Value from `ADMIN_PASSWORD` environment variable

## Email Notifications

The system sends email notifications for:

- **Successful Login**: "Successful login."
- **Password Reset**: Contains reset link

## Token Management

- **JWT tokens expire in 30 days**
- **Bearer token format**: `Authorization: Bearer <token>`
- **Tokens include user ID and role**

## Error Handling

- **Comprehensive error handling** for all routes
- **Validation errors** with detailed field-specific messages
- **Database errors** with user-friendly messages
- **JWT errors** with appropriate status codes

## Development

```bash
# Install dependencies
npm install

# Start development server with auto-reload
npm run dev

# Start production server
npm start
```

## Environment Variables

Make sure to set all required environment variables before running the application. Check `.env.example` for the complete list.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
