# Opass - Authentication and Authorization System

Opass is an open-source, pluggable authentication and authorization system built with Express, TypeORM, and PostgreSQL. It provides a simple way to add user authentication, including email registration, login, and JWT-based authorization.

## Installation

### Prerequisites
- **Node.js**: v14 or higher.
- **PostgreSQL**: Ensure PostgreSQL is installed and running.

### Steps to Set Up
1. **Clone the Repository**:
   ```sh
   git clone https://github.com/tonytangau/opass.git
   cd opass
   ```
2. **Install Dependencies**:
   ```sh
   npm i
   ```
3. **Set Up Environment Variables**:
   Create a `.env` file in the root of the project with the following content:
   ```env
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   POSTGRES_USER=postgres_username
   POSTGRES_PASSWORD=postgres_password
   POSTGRES_DB=opass
   JWT_SECRET=secure_jwt_secret
   PORT=3000
   ```
   - Replace `postgres_username` and `postgres_password` with your PostgreSQL credentials.
   - Replace `secure_jwt_secret` with a strong, random secret for JWT signing. You can generate a secure secret using:
     ```sh
     openssl rand -base64 32
     ```
4. **Run the Server**:
   ```sh
   npm start
   ```

## API Endpoints

### **User Registration**
- **Endpoint**: `/auth/register`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  - `201 Created`: User registered successfully.
  - `400 Bad Request`: User already exists.

### **User Login**
- **Endpoint**: `/auth/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  - `200 OK`: Login successful, returns JWT token.
  - `400 Bad Request`: Invalid email or password.

## Development

### Run in Development Mode
- **Start the Server in Development Mode** to automatically restart the server when changes are made:
  ```sh
  npm run dev
  ```

## Running Tests
### Set Up Test Environment Variables
Create a `.env.test` file in the root of the project with the following content:

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres_test_username
POSTGRES_PASSWORD=postgres_test_password
POSTGRES_DB=opass_test
JWT_SECRET=secure_test_jwt_secret
PORT=3001

To run the integration tests for Opass, use the following command:

```sh
npm run test
```

## TODO

1. Add refresh token support and `/auth/refresh-token` endpoint
2. Implement password reset with email integration
3. Integrate OAuth with:
   - Microsoft accounts
   - Google accounts
4. Enhance role-based access control (RBAC)
5. Introduce multi-factor authentication (MFA)
6. Add user profile management endpoints
7. Implement logging and monitoring for authentication activities
8. Add rate limiting to prevent brute force attacks

## License
This project is open-source and available under the [MIT License](LICENSE).
