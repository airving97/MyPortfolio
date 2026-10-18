# COMP229 Assignment 2 – MyPortfolio

Built from the supplied `mern_skeleton` and the Assignment 1 `Lab1-main/portfolio-site` frontend.

## Setup (Windows / VS Code)
1. Install Node.js and MongoDB Community Server, or create a MongoDB Atlas cluster.
2. Open this `MyPortfolio` folder in VS Code.
3. Run `npm install` in the root, then `npm install` inside `client`.
4. Copy `.env.example` to `.env`. Set `MONGODB_URI` to your working MongoDB connection string and `JWT_SECRET` to a long random value. **Never commit `.env` to GitHub.**
5. From the root run `npm run dev` to start Express at `http://localhost:5000` and Vite at `http://localhost:5173`.
6. Browse `http://localhost:5000/` for the welcome message, and `http://localhost:5173/` for your Assignment 1 portfolio. Submit the contact form to create a MongoDB contact record.

## API routes
For each of `/api/contacts`, `/api/projects`, `/api/qualifications`, `/api/users`:
- `GET /`, `GET /:id`, `POST /`, `PUT /:id`, `DELETE /:id`, `DELETE /`.
- All routes require `Authorization: Bearer <token>` except `POST /api/contacts` (public portfolio form).
- User passwords are hashed with bcrypt and excluded from responses.

Auth: `POST /api/auth/register` with `name,email,password` (minimum 8 characters); `POST /api/auth/signin` with `email,password`; `POST /api/auth/signout` with bearer token; `GET /api/auth/me` with bearer token.

### Sample test bodies
Register: `{ "name":"Demo User", "email":"demo@example.com", "password":"ChangeThisPassword123!" }`
Contact: `{ "firstname":"Alex", "lastname":"Smith", "email":"alex@example.com" }`
Project: `{ "title":"Portfolio", "firstname":"Alex", "lastname":"Smith", "email":"alex@example.com", "completion":"2026-10-18", "description":"React portfolio" }`
Qualification: `{ "title":"Diploma", "firstname":"Alex", "lastname":"Smith", "email":"alex@example.com", "completion":"2026-10-18", "description":"Web development" }`

## Testing and evidence
Use Postman or Thunder Client to register/sign in, copy the JWT, then test all six methods for each resource. For `/:id`, use the `_id` returned from POST. Take real screenshots of the MongoDB `Portfolio` database and its four collections, successful server connection log, server welcome message, and CRUD requests/responses. User records are created when registering; other collections are created when first inserting a document. Sign-out discards the JWT client-side; the demo endpoint does not revoke previously issued tokens.

## Submission
- Push this source to your own GitHub repository (exclude `node_modules` and `.env`).
- Capture screenshots in a Word document.
- Record a video showing your local frontend and API, and your deployed version if you host it.
- For cloud deployment, configure MongoDB Atlas and the host's environment variables; the Vite development proxy is only for local development. Production hosting requires a separately configured API URL or a reverse proxy.

**Note:** Contact form saves the three contact fields required by the assignment; the existing phone/message inputs are not persisted because they are not part of the specified schema. Authentication routes are backend-only. This is a coursework starter, not a production security review.
