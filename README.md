# IMDB-API

This project was generated using [Nx](https://nx.dev).
🔎 **Smart, Fast and Extensible Build System**

## Features & Dependencies

- NodeJS
- Express
- Typescript
- Prisma ORM + PostgreSQL (running on aws rds or local)
- Express Session (for authentification and authorization) (with redis store)
- Redis (for data caching)
- Eslint & Prettier (code formatting and error lint)
- Jest & Supertest
- Winston + Morgan for logging
- Nodemailer (with mailtrap.io) and EJS
- Argon2 for password hashing
- MFA with node-2fa
- Clustering implementation

## Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `nx e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
