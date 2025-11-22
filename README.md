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

4. Run the application:
   - For development: `npm run dev`
   - For production: `npm start`

The server will start on `http://localhost:3000` by default.

## API Documentation

This is a RESTful API for managing restaurants. Below are the available endpoints.

### Endpoints

| Method | Endpoint         | Description                        | Parameters                                                                 | Response                                                                                                                                |
| ------ | ---------------- | ---------------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | /restaurants     | Retrieve all restaurants           | None                                                                       | 200 OK: JSON array of restaurants<br>500 Internal Server Error: On failure                                                              |
| GET    | /restaurants/:id | Retrieve a single restaurant by ID | id (string): Contact ID                                                    | 200 OK: JSON object of the restaurant<br>404 Not Found: If restaurant not found<br>500 Internal Server Error: On failure                |
| POST   | /restaurants     | Create a new restaurant            | None (body: JSON with firstName, lastName, email, favoriteColor, birthday) | 201 Created: JSON with message and restaurantId<br>400 Bad Request: If required fields missing<br>500 Internal Server Error: On failure |
| PUT    | /restaurants/:id | Update a restaurant by ID          | id (string): Contact ID (body: JSON with fields to update)                 | 200 OK: JSON with message<br>404 Not Found: If restaurant not found<br>500 Internal Server Error: On failure                            |
| DELETE | /restaurants/:id | Delete a restaurant by ID          | id (string): Contact ID                                                    | 200 OK: JSON with message<br>404 Not Found: If restaurant not found<br>500 Internal Server Error: On failure                            |

### Example Requests

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
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "favoriteColor": "blue",
    "birthday": "1990-01-01"
  }
  ```

- Update a restaurant:

  ```
  PUT http://localhost:3000/restaurants/6907af3f6fe7c98d51ae9570
  Content-Type: application/json

  {
    "name": "string",
    "cuisine": "string",
    "location": "string",
    "rating": "integer"
  }
  ```

- Delete a restaurant:
  ```
  DELETE http://localhost:3000/restaurants/6907af3f6fe7c98d51ae9570
  ```

### Response Format

Contacts are returned in JSON format with the following structure:

```json
{
  "_id": "string",
  "name": "string",
  "cuisine": "string",
  "location": "string",
  "rating": "integer"
}
```

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Express-validator
- Swagger-ui
