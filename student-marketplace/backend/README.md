# Student Marketplace Backend

This is the backend for the Student Marketplace web application, designed for students to buy and sell used goods at the end of the school year.

## Features

- User account creation and management
- Listing creation and management for items
- Location-based filtering for listings
- Transaction handling between buyers and sellers

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the backend directory:
   ```
   cd student-marketplace/backend
   ```

3. Install the required dependencies:
   ```
   npm install
   ```

4. Set up your environment variables. Create a `.env` file in the backend directory and add your database connection string and any other necessary configurations.

5. Start the server:
   ```
   npm start
   ```

## API Endpoints

- **User Endpoints**
  - `POST /api/users` - Create a new user
  - `GET /api/users/:id` - Retrieve user information

- **Listing Endpoints**
  - `POST /api/listings` - Create a new listing
  - `GET /api/listings` - Retrieve all listings
  - `GET /api/listings/filter` - Filter listings based on location and categories

## Usage Examples

- To create a new user, send a POST request to `/api/users` with the user details in the request body.
- To retrieve all listings, send a GET request to `/api/listings`.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.