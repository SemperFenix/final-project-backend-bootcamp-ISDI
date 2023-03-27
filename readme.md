# Final project

## Aikido Techniques and Users Backend API

This is a backend API built using Node.js and TypeScript, implementing the Domain-Driven Design (DDD) architecture pattern. The project manages Aikido techniques and users.

## Installation

To run this project locally, follow these steps:

1. Clone this repository.
2. Install the dependencies with `npm install`.
3. Create a `.env` file and set the environment variables, following the example in `.env.example`.
4. Start the server with `npm run start`.

## Usage

The API endpoints can be accessed using HTTP requests to the appropriate URL, as listed in the tables below.

### Users

| Method | URL                       | Description                                                                                                                                                                                                                                              |
|--------|---------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| POST   | /aikido-users/register    | Register a new user. Required fields: `email`, `password`, `firstName`, `lastName`. Optional fields: `rank`, `dojo`.                                                                                                                                   |
| POST   | /aikido-users/login       | Authenticate a user. Required fields: `email`, `password`.                                                                                                                                                                                              |
| GET    | /aikido-users/users/list/:id?:id | Retrieve a list of users. Optional query parameters: `dojo` (filter by dojo), `rank` (filter by rank). Requires authentication.                                                                                                                            |
| GET    | /aikido-users/users/:id   | Retrieve a user by ID. Requires authentication.                                                                                                                                                                                                          |
| PATCH  | /aikido-users/update/:id  | Update the authenticated user's information. Optional fields: `email`, `password`, `firstName`, `lastName`, `rank`, `dojo`. Requires authentication.                                                                                                 |
| PATCH  | /aikido-users/update/admin/:id | Update a user's information. Optional fields: `email`, `password`, `firstName`, `lastName`, `rank`, `dojo`. Requires authentication as an admin.                                                                                                        |
| DELETE | /aikido-users/delete/:id  | Delete the authenticated user's account. Requires authentication.                                                                                                                                                                                        |
| PATCH  | /aikido-users/add-uke/:id | Add a user as an "uke" (training partner) for the authenticated user. Requires authentication.                                                                                                                                                          |
| PATCH  | /aikido-users/remove-uke/:id | Remove a user from the authenticated user's list of "ukes". Requires authentication.                                                                                                                                                                      |
| PATCH  | /aikido-users/add-tech/:id | Add a technique to the authenticated user's list of learned techniques. Requires authentication.                                                                                                                                                         |
| PATCH  | /aikido-users/remove-tech/:id | Remove a technique from the authenticated user's list of learned techniques. Requires authentication.                                                                                                                                                  |

### Techniques

| Method | URL                      | Description                                                                                                                                                                                                                                             |
|--------|--------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| POST   | /techniques/add          | Add a new technique. Required fields: `name`, `description`, `category`, `steps` (array of step objects, each with a `name` and `description`). Requires authentication as an admin.                                                                    |
| GET    | /techniques/:id          | Retrieve a technique by ID. Requires authentication.                                                                                                                                                                                                    |
| PATCH  | /techniques/update/:id   | Update a technique's information. Optional fields: `name`, `description`, `category`, `steps` (array of step objects, each with a `name` and `description`). Requires authentication as an admin.                                                         |
| GET    | /techniques/list/filter?:id | Retrieve a list of techniques, filtered by category. Optional query parameter: `category
