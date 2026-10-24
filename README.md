# JWT Authentication Backend

A stateless authentication API built with Express, MongoDB, Mongoose, bcrypt, and JSON Web Tokens.

## What This Project Demonstrates

- User registration
- Password hashing with bcrypt
- Login and JWT generation
- JWT verification middleware
- Protected routes
- MongoDB user persistence
- Centralized error handling

## Requirements

- Node.js
- MongoDB running locally or a MongoDB Atlas connection
- Thunder Client, Postman, or another API client

## Setup

Install dependencies:

```powershell
npm install
```

Create a local `.env` file using `.env.example` as a reference:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/jwt_authentication
JWT_SECRET=your-generated-secret
JWT_EXPIRES_IN=1d
```

Generate a JWT secret with Node.js:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Do not commit `.env` or expose the real `JWT_SECRET`.

## Run the Server

Development mode:

```powershell
npm run dev
```

Normal mode:

```powershell
npm start
```

The server runs at `http://localhost:3000` by default.

## API Endpoints

### Health Check

```http
GET /health
```

### Register

```http
POST /api/auth/register
Content-Type: application/json
```

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

The password is hashed by the User model before the document is saved to MongoDB.

### Login

```http
POST /api/auth/login
Content-Type: application/json
```

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

A successful response includes a JWT access token.

### Protected Profile

```http
GET /api/users/profile
Authorization: Bearer <your-jwt>
```

A valid token is required. The response contains the user profile without the password.

## Authentication Flow

1. The server loads configuration and connects to MongoDB.
2. A user registers with an email and password.
3. The User model hashes the password with bcrypt before saving it.
4. The user logs in with the original password.
5. bcrypt compares the submitted password with the stored hash.
6. The server creates a JWT containing the user ID in the `sub` claim.
7. The client sends the JWT in the `Authorization` header for protected requests.
8. Authentication middleware verifies the token and places the user ID on `request.userId`.
9. The protected controller uses that ID to load the user profile.

## Why It Is Stateless

The server does not store login sessions or active JWTs. Each protected request carries its own token, and the server verifies it using `JWT_SECRET`.

For this basic implementation, logout means deleting the token on the client. The token remains valid until it expires. Token revocation would require additional state, such as a token blacklist or short-lived access tokens with refresh-token rotation.

## Project Structure

```text
src/
├── config/
│   ├── database.js       # MongoDB connection
│   └── env.js            # Environment configuration
├── controllers/
│   ├── authController.js # Register and login logic
│   └── userController.js # Protected profile logic
├── middleware/
│   ├── authenticate.js   # JWT verification
│   └── errorHandler.js   # Centralized error responses
├── models/
│   └── User.js           # User schema and password hashing
├── routes/
│   ├── authRoutes.js     # Register and login routes
│   └── userRoutes.js     # Protected user routes
├── utils/
│   └── jwt.js            # Create and verify JWTs
└── server.js             # Express application startup
```
