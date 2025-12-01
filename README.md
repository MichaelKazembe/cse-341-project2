# CSE341 Project

CSE341 - Web Services Project from BYU-Idaho Software Development Degree program

## View Deployed Site

[Click here to test the API](https://restaurants-api-iwx3.onrender.com)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/MichaelKazembe/cse-341-project2.git
   cd cse-341-project2
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Add your MongoDB connection URL:
     ```
     MONGODB_URL=your_mongodb_connection_string_here
     ```
   - Add GitHub OAuth credentials (obtain from GitHub Developer Settings):
     ```
     GITHUB_CLIENT_ID=your_github_client_id_here
     GITHUB_CLIENT_SECRET=your_github_client_secret_here
     CALLBACK_URL=http://localhost:3000/github/callback
     ```
   - Optional: Set the base URL for Swagger documentation:
     ```
     BASE_URL=http://localhost:3000
     ```

4. Run the application:
   - For development: `npm run dev`
   - For production: `npm start`

The server will start on `http://localhost:3000` by default.

## Authentication

This API uses GitHub OAuth for authentication. To access protected endpoints (POST, PUT, DELETE for restaurants and users), users must log in via GitHub.

### Login

- Navigate to `http://localhost:3000/login` to initiate GitHub authentication.
- You will be redirected to GitHub to authorize the application.
- After authorization, you will be redirected back to the home page, logged in.

### Logout

- Navigate to `http://localhost:3000/logout` to log out.
- You will be redirected to the home page, logged out.

### Protected Endpoints

Endpoints that require authentication are marked with an asterisk (\*) in the API Documentation tables below.

## API Documentation

This is a RESTful API for managing restaurants and users. Below are the available endpoints.

### Endpoints for Restaurants

| Method | Endpoint         | Description                        | Parameters                                                    | Response                                                                                                                                |
| ------ | ---------------- | ---------------------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | /restaurants     | Retrieve all restaurants           | None                                                          | 200 OK: JSON array of restaurants<br>500 Internal Server Error: On failure                                                              |
| GET    | /restaurants/:id | Retrieve a single restaurant by ID | id (string): Restaurant ID                                    | 200 OK: JSON object of the restaurant<br>404 Not Found: If restaurant not found<br>500 Internal Server Error: On failure                |
| POST   | /restaurants     | Create a new restaurant*           | None (body: JSON with name, cuisine, location, rating)        | 201 Created: JSON with message and restaurantId<br>400 Bad Request: If required fields missing<br>500 Internal Server Error: On failure |
| PUT    | /restaurants/:id | Update a restaurant by ID*         | id (string): Restaurant ID (body: JSON with fields to update) | 200 OK: JSON with message<br>404 Not Found: If restaurant not found<br>500 Internal Server Error: On failure                            |
| DELETE | /restaurants/:id | Delete a restaurant by ID*         | id (string): Restaurant ID                                    | 200 OK: JSON with message<br>404 Not Found: If restaurant not found<br>500 Internal Server Error: On failure                            |

### Endpoints for Users

| Method | Endpoint   | Description                  | Parameters                                                                      | Response                                                                                                                              |
| ------ | ---------- | ---------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | /users     | Retrieve all users           | None                                                                            | 200 OK: JSON array of users<br>500 Internal Server Error: On failure                                                                  |
| GET    | /users/:id | Retrieve a single user by ID | id (string): User ID                                                            | 200 OK: JSON object of the user<br>404 Not Found: If user not found<br>500 Internal Server Error: On failure                          |
| POST   | /users     | Create a new user*           | None (body: JSON with firstname, lastname, email, age, password, address, role) | 201 Created: JSON with message and userId<br>400 Bad Request: If required fields missing or invalid data<br>500 Internal Server Error |
| PUT    | /users/:id | Update a user by ID*         | id (string): User ID (body: JSON with fields to update)                         | 200 OK: JSON with message<br>404 Not Found: If user not found<br>500 Internal Server Error: On failure                                |
| DELETE | /users/:id | Delete a user by ID*         | id (string): User ID                                                            | 200 OK: JSON with message<br>404 Not Found: If user not found<br>500 Internal Server Error: On failure                                |

### Example Requests for Restaurants

- Get all restaurants:

  ```
  GET http://localhost:3000/restaurants
  ```

- Get a single restaurant:

  ```
  GET http://localhost:3000/restaurants/6907af3f6fe7c98d51ae9570
  ```

- Create a new restaurant:

  ```
  POST http://localhost:3000/restaurants
  Content-Type: application/json

  {
    "name": "Ndiwo Restaurant",
    "cuisine": "Malawian",
    "location": "123 Main St, City, State",
    "rating": 4
  }
  ```

- Update a restaurant:

  ```
  PUT http://localhost:3000/restaurants/6907af3f6fe7c98d51ae9570
  Content-Type: application/json

  {
    "name": "Updated Restaurant",
    "cuisine": "Updated Cuisine",
    "location": "456 Updated St, Springfield",
    "rating": 4.5
  }
  ```

- Delete a restaurant:

  ```
  DELETE http://localhost:3000/restaurants/6907af3f6fe7c98d51ae9570
  ```

### Example Requests for Users

- Get all users:

  ```
  GET http://localhost:3000/users
  ```

- Get a single user:

  ```
  GET http://localhost:3000/users/692367338e5dd8100f3b7bff
  ```

- Create a new user:

  ```
  POST http://localhost:3000/users
  Content-Type: application/json

  {
    "firstname": "Michael",
    "lastname": "Kazembe",
    "email": "michael@example.com",
    "age": "24",
    "password": "qw2(ajaj",
    "address": "123 Area 18A Lilongwe Malawi",
    "role": "admin"
  }
  ```

- Update a user:

  ```
  PUT http://localhost:3000/users/692367338e5dd8100f3b7bff
  Content-Type: application/json

  {
    "firstname": "Michael",
    "lastname": "Kazembe",
    "email": "michael@example.com",
    "age": "25",
    "password": "newpass123",
    "address": "123 Area 18A Lilongwe Malawi",
    "role": "user"
  }
  ```

- Delete a user:

  ```
  DELETE http://localhost:3000/users/692367338e5dd8100f3b7bff
  ```

### Response Format

Restaurants are returned in JSON format with the following structure:

```json
{
  "_id": "string",
  "name": "string",
  "cuisine": "string",
  "location": "string",
  "rating": "integer"
}
```

Users are returned in JSON format with the following structure:

```json
{
  "_id": "string",
  "firstname": "string",
  "lastname": "string",
  "email": "string",
  "age": "string",
  "password": "string",
  "address": "string",
  "role": "string"
}
```

## Testing the API

Testing for the API is included in the `test.rest` file, located in the root directory. It contains REST client test cases for both restaurants and users. The test cases cover all CRUD operations including valid and invalid data scenarios.

To run these tests, you can use Visual Studio Code with the REST Client extension. Open the `test.rest` file and execute the requests individually or as a group.

## API Documentation with Swagger

This project includes interactive API documentation using Swagger UI.

- To view the Swagger UI, navigate to: `http://localhost:3000/api-docs` when the server is running.
- The Swagger UI provides detailed documentation of all API endpoints, request/response schemas, and allows you to test endpoints interactively.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Express-validator
- Passport.js
- Passport-GitHub2
- Express-session
- Swagger-ui-express
- Swagger-autogen
