# OPass - Simple Auth System

OPass is a lightweight, stateless authentication and authorization system built with **Express**, **TypeScript**, and **JWT**. It provides a simple, pluggable way to manage user authentication and protected routes in your applications.

---

## **Features**
- 🔐 **JWT Authentication**: Stateless and secure authentication using JSON Web Tokens (JWT).
- 📦 **Simple Integration**: Minimal setup for API projects.
- 🚀 **Express Middleware**: Easily protect routes with JWT validation middleware.
- 💻 **TypeScript Support**: Fully typed for modern Node.js applications.

---

## **Getting Started**

### **1. Prerequisites**
- **Node.js** (v14 or higher)
- **npm** or **yarn**

---

### **2. Installation**

Clone the repository and install the dependencies:

```bash
git clone https://github.com/tonytangau/opass.git
cd opass
npm i
```

---

### **3. Environment Configuration**

Create a `.env` file in the root directory:

```env
JWT_SECRET=your_jwt_secret
```

- Replace `your_jwt_secret` with a strong secret for signing JWT tokens.

---

### **4. Run the Server**

Start the development server:

```bash
npm run dev
```

The server will run on **http://localhost:3000**.

---

## **API Endpoints**

### **1. Protected Route**

- **Endpoint**: `/protected`
- **Method**: `GET`
- **Headers**: 
  - `Authorization: Bearer <valid_jwt_token>`

#### **Example Request**
```bash
curl -H "Authorization: Bearer <valid_jwt_token>" http://localhost:3000/protected
```

#### **Example Response**
```json
{
  "message": "Access granted to protected resource!",
  "user": {
    "id": "12345",
    "email": "mockuser@example.com"
  }
}
```

---

### **2. Invalid JWT**

If you send an invalid or missing JWT token, you’ll get:

- **Status**: `403 Forbidden`
- **Response**:
```json
{
  "message": "Forbidden: Invalid token"
}
```

---

## **Development**

### **Scripts**
- **`npm run dev`**: Start the server in development mode.
- **`npm run build`**: Compile TypeScript to JavaScript.
- **`npm run test`**: Run the test suite with Jest.

---

## **Project Structure**

```
/opass
│
├── src/
│   ├── middleware/
│   │   └── authMiddleware.ts   # JWT validation middleware
│   └── oauth/
│       └── outlookAuth.ts      # Outlook auth using Azure AD
│
├── example/
│   ├── app.ts                  # Example app using OPass
│   └── routes/                 # Example routes
│
├── tests/
│   └── auth.test.ts            # Test suite for authentication
│
└── .env                        # Environment variables
```

---

## **License**
This project is open-source and available under the [MIT License](LICENSE).

---

## **Key Updates**
1. Removed references to **OAuth login flow** for now.
2. Focused on the **JWT-protected route** as the core working feature.
3. Added clear setup steps and API documentation.
