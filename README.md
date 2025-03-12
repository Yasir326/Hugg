# Yasir's Hugg Tech Test Implementation 🤗 🚀

##

## Getting Started

### Prerequisites
- Node.js (20 or higher)
- npm

### Installation
1. Clone the repository
   1. `git clone https://github.com/Yasir326/Hugg.git`
   2. `cd hugg-technical-task`


2. Install dependencies
   
   * `npm install`


### Running the Application
To start the server in development mode:

1. Running the app
  * `npm run dev`


The server will start on http://localhost:3000 by default.

### Running Tests
To run the test suite:
   
1. Running Tests
   
   * `npm run test`
  
2. Running individual tests

  * `npm test -- tests/controllers/productsController.test.ts`
  * `npm test -- tests/controllers/brandController.test.ts`

  

### API Testing with Postman

A Postman collection is included in this repository to help you test the API endpoints.

**Importing the Collection**
1. Make sure  the server is running via `npm run dev`
2. Open Postman
3. Click on "Import" in the top left corner
4. Select "File" and navigate to `postman_collection/Hugg.postman_collection.json`
5. Click "Import"

### Using the Collection
The collection includes the following requests:

1. **Login**
   - Endpoint: `POST http://localhost:3000/login`
   - Body: 
     ```json
     {
       "username": "hugg",
       "password": "huggmeimscared"
     }
     ```
     *note: I would not post real credentials in a readme, this is just for the task for ease of testing*
     
   - This will return an authentication token that is automatically stored in the collection variables as `{{authToken}}`

2. **Get Products by Brand ID**
   - Endpoint: `GET http://localhost:3000/api/brands/{id}/products`
   - Replace `{id}` with an actual brand ID
   - Requires authentication token from login request
   - Optional query parameters: `page` and `limit` for pagination

3. **Get Stores by Product ID**
   - Endpoint: `GET http://localhost:3000/api/products/{id}/stores`
   - Replace `{id}` with an actual product ID
   - Requires authentication token from login request
   - Optional query parameters: `page` and `limit` for pagination

4. **API Documentation**
   - Endpoint: `GET http://localhost:3000/documentation`
   - Provides Swagger documentation for the API

### Authentication Flow
1. Run the "login" request first to obtain an authentication token
2. The token is automatically stored in the collection variables as `{{authToken}}`
3. Subsequent requests in the collection are pre-configured to use this token in their Authorization headers
4. You can verify this by checking the "Authorization" tab of any request, which should be set to "Bearer Token" with the value `{{authToken}}`
5. No manual copying of tokens is required - the collection handles this automatically

### Verifying Authentication Setup
To check that authentication is properly configured for a request:
1. Select any API request in the collection (except login)
2. Click on the "Authorization" tab
3. You should see "Type: Bearer Token" and "Token: {{authToken}}"
4. This confirms that the request will automatically use the token obtained from the login endpoint

## API Documentation

| Endpoint | Method | Description | Query Parameters |
|----------|--------|-------------|------------------|
| `/login` | POST | Authenticate and get token | None |
| `/api/brands/:id/products` | GET | Get products for a specific brand | `page`, `limit` |
| `/api/products/:id/stores` | GET | Get stores for a specific product | `page`, `limit` |
| `/documentation` | GET | API documentation | None |
| `/` | GET | Welcome page with available routes | None |

All API endpoints (except login and documentation) require authentication using a JWT token that you can obtain from the login endpoint.