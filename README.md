# Homemade Food Delivery Platform

Welcome to the Homemade Food Delivery Platform! This project is a full-featured web application developed using the MERN stack, designed to connect users with homemade food options. The platform includes various functionalities such as cart management, subscription services, geolocation, OTP authentication, payment processing, and an admin panel for managing orders and menus.

## Technology Stack

### Frontend
- **React.js**: JavaScript library for building user interfaces.
- **Redux Toolkit**: State management for cart and subscription.
- **Material UI**: UI component library.
- **OpenStreetMap API**: For geolocation, place search, and mapping.
- **Firebase**: OTP authentication.
- **Cashfree SDK**: Payment processing.
- **Figma**: UI/UX design.

### Backend
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web application framework.
- **MongoDB**: NoSQL database.

## Features

### User Features
- **Signup/Login**: Secure user authentication.
- **OTP Authentication**: Using Firebase for secure login.
- **Geolocation and Place Search**: Accurate location identification using OpenStreetMap API.
- **Cart Management**: Add, update, and remove items from the cart using Redux Toolkit.
- **Subscription Services**: Manage food subscriptions with Redux Toolkit.
- **Payment Processing**: Secure payments with Cashfree SDK.
- **Search Dishes**: Search for specific dishes easily.
- **Help and Support**: Directly receive customer grievances via email using Formspree API.

### Admin Features
- **Order Management**: Track and update the status of orders.
- **Menu Management**: Update menus of homemakers.
- **Dashboard**: Overview of platform activities and metrics.

## Installation and Setup

### Prerequisites
- Node.js
- npm (Node package manager)
- MongoDB

### Clone Repository
```bash
git clone https://github.com/ThatsRajeev/Mopin
cd Mopin
```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the backend directory and add the following environment variables:
   ```env
   MONGO_URL=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   FIREBASE_API_KEY=your_firebase_api_key
   CASHFREE_APP_ID=your_cashfree_app_id
   CASHFREE_SECRET_KEY=your_cashfree_secret_key
   FRONTEND_ORIGIN=your_frontend_uri
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the frontend directory and add the following environment variables:
   ```env
   REACT_APP_SERVER_URL=your_server_url
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
   REACT_APP_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
   ```
4. Start the frontend server:
   ```bash
   npm start
   ```

## Usage
- Visit `http://localhost:3000` to access the application.
- Sign up or log in to start ordering homemade food.
- Use the admin panel to manage orders and update menus.

## Contributing
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Thank you for using the Homemade Food Delivery Platform! If you have any questions or feedback, feel free to open an issue or contact us directly.
