# Student Marketplace

Welcome to the Student Marketplace project! This web application is designed specifically for students to buy and sell used goods at the end of the school year. It provides a platform for students to connect and exchange items conveniently.

## Features

- **Account Creation**: Users can create accounts to manage their listings and purchases.
- **Buying and Selling**: Students can list their used goods for sale and browse items available for purchase.
- **Location-Based Filtering**: Users can filter listings based on their location to find items nearby.
- **User Profiles**: Each user has a profile that displays their listings and transaction history.
- **Search Functionality**: Users can search for specific items or categories.
- **Messaging System**: A built-in messaging feature allows buyers and sellers to communicate directly.
- **Rating System**: Users can rate their transactions to build trust within the community.

## Project Structure

The project is divided into two main parts: the backend and the frontend.

### Backend

- **src/app.js**: Entry point of the backend application, initializes the Express app and connects to the database.
- **src/controllers/index.js**: Contains controller functions for handling user accounts, listings, and transactions.
- **src/models/index.js**: Defines data models for users and listings.
- **src/routes/index.js**: Sets up route definitions for user authentication and listing management.
- **src/utils/index.js**: Contains utility functions for input validation and error handling.
- **package.json**: Lists backend dependencies and scripts.

### Frontend

- **public/index.html**: Main HTML file for the frontend application.
- **public/styles.css**: CSS styles for the frontend user interface.
- **src/App.js**: Main component that sets up routing and layout for the React application.
- **src/components/index.js**: Exports reusable components like Header, Footer, and ListingCard.
- **src/pages/index.js**: Exports main pages such as Home, Listings, and UserProfile.
- **src/utils/index.js**: Contains utility functions for API calls and state management.
- **package.json**: Lists frontend dependencies and scripts.

## Installation

To get started with the project, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the backend directory and install dependencies:
   ```
   cd student-marketplace/backend
   npm install
   ```

3. Navigate to the frontend directory and install dependencies:
   ```
   cd ../frontend
   npm install
   ```

4. Start the backend server:
   ```
   cd ../backend
   npm start
   ```

5. Start the frontend application:
   ```
   cd ../frontend
   npm start
   ```

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.