# CSE341 Project

CSE341 - Web Services Project from BYU-Idaho Software Development Degree program

## View Deployed Site

[Click here to test the API](https://cse-341-project1-gsq2.onrender.com)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/MichaelKazembe/cse-341-project1.git
   cd cse-341-project1
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

This is a RESTful API for managing contacts. Below are the available endpoints.

### Endpoints

| Method | Endpoint      | Description                     | Parameters                                                                 | Response                                                                                                                             |
| ------ | ------------- | ------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| GET    | /contacts     | Retrieve all contacts           | None                                                                       | 200 OK: JSON array of contacts<br>500 Internal Server Error: On failure                                                              |
| GET    | /contacts/:id | Retrieve a single contact by ID | id (string): Contact ID                                                    | 200 OK: JSON object of the contact<br>404 Not Found: If contact not found<br>500 Internal Server Error: On failure                   |
| POST   | /contacts     | Create a new contact            | None (body: JSON with firstName, lastName, email, favoriteColor, birthday) | 201 Created: JSON with message and contactId<br>400 Bad Request: If required fields missing<br>500 Internal Server Error: On failure |
| PUT    | /contacts/:id | Update a contact by ID          | id (string): Contact ID (body: JSON with fields to update)                 | 200 OK: JSON with message<br>404 Not Found: If contact not found<br>500 Internal Server Error: On failure                            |
| DELETE | /contacts/:id | Delete a contact by ID          | id (string): Contact ID                                                    | 200 OK: JSON with message<br>404 Not Found: If contact not found<br>500 Internal Server Error: On failure                            |

### Example Requests

- Get all contacts:

  ```
  GET http://localhost:3000/contacts
  ```

- Get a single contact:

  ```
  GET http://localhost:3000/contacts/6907af3f6fe7c98d51ae9570
  ```

- Create a new contact:

  ```
  POST http://localhost:3000/contacts
  Content-Type: application/json

  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "favoriteColor": "blue",
    "birthday": "1990-01-01"
  }
  ```

- Update a contact:

  ```
  PUT http://localhost:3000/contacts/6907af3f6fe7c98d51ae9570
  Content-Type: application/json

  {
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@example.com",
    "favoriteColor": "green",
    "birthday": "1992-02-02"
  }
  ```

- Delete a contact:
  ```
  DELETE http://localhost:3000/contacts/6907af3f6fe7c98d51ae9570
  ```

### Response Format

Contacts are returned in JSON format with the following structure:

```json
{
  "_id": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "favoriteColor": "string",
  "birthday": "string"
}
```

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Swagger
