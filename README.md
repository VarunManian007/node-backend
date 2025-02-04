## Description

## Project Structure
```
node-backend/
├── .github/
│   └── workflows/
│       └── main.yml
├── src/
|   └── constants
|       └── messages.constants.ts
|   └── controller
|       └── user.controller.ts
|   └── middleware
|       ├──jwt-filter.middleware.ts
|       └── log.middleware.ts
|   └── model
|       └── api-response.model.ts
|   └── module
|       └── user.module.ts
|   └── schema
|       └── user.schema.ts
|   └── services
|       └── user.services.ts
|   └── test
|       └── user.controller.spec.ts
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── test/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── .env (.gitignored -> Have to create. Please scroll down for more info) 
├── .gitignore
├── .prettierrc
├── README.md
├── eslint.config.mjs
├── nest-cli.json
├── package.json
├── package-lock.json (.gitignored -> Run npm install) 
├── tsconfig.build.json
└── tsconfig.json
```

## Project setup

```bash
$ npm install
```

### `.env file`

Create .env file and add:
1. DB_URI=mongodb://localhost:27017/product-db
2. PORT=3001
3. CORS_ORIGIN=http://localhost:3000
4. TOKEN_SECRET=SECRET_KEY

Note:
1. Running it in 3001 so that no conflicts arise with React frontend which runs on port 3000.
2. TOKEN_SECRET is a text for jwt secret key.

### `npm install/npm i`

1. Installs all the dependencies needed for the project to run.

### `MongoDB used via Docker`

```bash
$ docker run -d --name mongodb -p 27017:27017 mongo
```

## Compile and run the project


```bash
$ npm start
```

## Run tests

```bash
# unit tests
$ npm run test
```

## API Documentation

### **Register User**
**Endpoint:**
```
POST /user/register
```
**Description:**
Registers a new user with email, password, and username.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "userName": "JohnDoe"
}
```
**Response:**
- **Success (200 OK)**:
```json
{
    "success": true,
    "message": "User registered successfully.",
    "data": {}
}
```
- **Errors:**
  - `400 Bad Request`: Invalid email format, username too short, or weak password.

---

### **Login User**
**Endpoint:**
```
POST /user/login
```
**Description:**
Logs in a user with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```
**Response:**
- **Success (200 OK)**:
```json
{
    "success": true,
    "message": "User logged in successfully.",
    "data": {
        "access_token": "jwt-token"
    }
}
```
- **Errors:**
  - `400 Bad Request`: Missing email or password.
  - `401 Unauthorized`: Incorrect email or password.

---

### **Get All Users**
**Endpoint:**
```
GET /user/getAllUsers
```
**Headers:**
```
Authorization: Bearer {jwt-token}
```

**Description:**
Fetches all registered users.

**Response:**
- **Success (200 OK)**:
```json
{
    "success": true,
    "message": "Fetched users successfully.",
    "data": [
        {
            "_id": "679f6035dc19957d823f57c5",
            "email": "user@example.com",
            "userName": "JohnDoe",
            "createdAt": "2025-02-02T12:08:21.700Z",
            "updatedAt": "2025-02-02T12:08:21.700Z",
            "__v": 0,
            "isAdmin": true
        },
        {
            "_id": "679f6035dc19957d823f57c5",
            "email": "user1@example.com",
            "userName": "JohnDoe1",
            "createdAt": "2025-02-02T12:08:21.700Z",
            "updatedAt": "2025-02-02T12:08:21.700Z",
            "__v": 0,
            "isAdmin": false
        }
    ]
}
```
- **Errors:**
  - `500 Internal Server Error`: If fetching users fails.

---

### **General Notes:**
- All responses return JSON format.
- Authentication tokens are required for protected endpoints.
- Input validation is enforced for security.


