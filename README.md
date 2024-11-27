# Opass - Authentication and Authorization System

Opass is an open-source, pluggable authentication and authorization system built with Express, TypeORM, and PostgreSQL. It provides a simple way to add user authentication, including email registration, login, JWT-based authorization, and refresh token functionality.

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
   REFRESH_TOKEN_SECRET=secure_refresh_secret
   PORT=3000
   ```
   - Replace `postgres_username` and `postgres_password` with your PostgreSQL credentials.
   - Replace `secure_jwt_secret` and `secure_refresh_secret` with strong, random secrets for signing JWTs. You can generate secure secrets using:
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
  - `200 OK`: Login successful, returns access token and refresh token.
  - `400 Bad Request`: Invalid email or password.

### **Refresh Token**
- **Endpoint**: `/auth/refresh-token`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "refreshToken": "your_refresh_token"
  }
  ```
- **Response**:
  - `200 OK`: Returns a new access token.
  - `403 Forbidden`: Invalid or expired refresh token.

## Example Usage

### Running the Example File

We have provided an example file named `usage.ts` to demonstrate the flow of the authentication system.

1. Ensure the server is running:
   ```sh
   npm run dev
   ```

2. Run the example script:
   ```sh
   npm run example
   ```

   The script will:
   - Register a new user.
   - Log in to generate access and refresh tokens.
   - Use the access token to fetch a protected resource.
   - Refresh the access token when it expires.

---

## Development

### Run in Development Mode
Start the server in development mode to enable automatic restarts on changes:
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
REFRESH_TOKEN_SECRET=secure_refresh_secret
PORT=3001
```

Run the integration tests with:
```sh
npm run test
```

## TODO

1. Add refresh token support and `/auth/refresh-token` endpoint :heavy_check_mark:
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
