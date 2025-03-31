# Paytm Backend

This is the backend for the Paytm Clone, a MERN stack-based application handling user signin, signup, money transactions, filtering of user(search option)

## 🚀 Features

1) JWT-based authentication

2) Secure money transfers using UPI

3) User account and balance management

4) API endpoints for frontend integration

## 🛠 Tech Stack

1) Backend: Node.js, Express.js, MongoDB, Mongoose

2) Authentication: JWT (JSON Web Token)

3) Database: MongoDB with Mongoose ORM

4) API Testing: Postman

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository

    git clone https://github.com/krishnagupta1543/paytm-clone-backend.git

    cd paytm-backend

### 2️⃣ Install Dependencies

    npm install

### 3️⃣ Set Up Environment Variables

Create a .env file in the root directory and add:

    PORT=3000
    
    MONGOOSE_URL= your_mongoose_url

    JWT_SECRET= your_jwt_secret

### 4️⃣ Run the Backend Server

    node index.js

## 📡 API Endpoints (Test with Postman)

| Method | Endpoint           | Description                    | 
|--------|-------------------|---------------------------------|
| POST   | `/api/v1/user/signup` | Register a new user            |
| POST   | `/api/v1/user/signin`  | Authenticate user & get token  |
| PUT    | `/api/v1/user/update` | Update user details      |
| GET    | `/api/v1/account/balance`     | Get the current user balance |
| POST    | `/api/v1/account/transfer` | Transfer money from one user to another     |
| GET    | `/api/v1/user/bulk?filter=krishna&token={your token}` | Search user by first name or last name     |3

## 🔍 Testing with Postman

1) Open Postman.

2) Set the base URL to

       http://localhost:3000

4) Use the API endpoints above to test functionality.

5) For protected routes, include Authorization: Bearer <token> in headers.

## 🤝 Contributing

1) Fork the repository

2) Create a new branch (feature-branch)

3) Commit your changes

4) Push to your fork

5) Submit a Pull Request

## 🌐 Connect with Me

👤 Author: Krishna Gupta

 🇮🇳 <a href = "https://www.linkedin.com/in/krishna-gupta-b4327920a/" target = "">Linkedin<a/>
