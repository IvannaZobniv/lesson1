<p align="center">
  <a href="http://localhost:3000/api/doc#/" target="blank"><img src="https://img.freepik.com/free-vector/transport-flat-muscle-car-illustration_23-2149450022.jpg?w=996&t=st=1684642071~exp=1684642671~hmac=7a6841e10a0a35499c4e1ea68c5daac7ad61cfff71f309c0959e0c7a7857b630" width="500" alt="Car Company Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p>This is the backend of AnyCompany's platform for buying and selling cars, built using Nest.js.</p>
<p>The backend includes role-based authentication, authorization, and access control, as well as support for basic and premium user accounts.</p>
<p>In addition, the platform allows registered sellers to create car listings with a drop-down menu to select the make and model of the car.</p>
<p>Users can create lists with prices in US dollars, euros or hryvnias, prices are updated daily according to the PrivatBank exchange rate. </p>
<p>Ads are automatically checked for profanity, and premium users can access additional information about their ads, such as views and average regional prices.</p>

## Technologies Used
To get started with the backend, you will need to have Node.js and npm installed on your machine.

- Nest.js. It uses JavaScript, is built with TypeScript
- PostgreSQL. An open-source ORM is Prisma.

## Installation
1. Clone the repository.
2. Install the necessary dependencies using the `npm install` command.
3. We use Prisma CLI. It is recommended to call the CLI locally by prefixing it with npx:
   `npx prism'. 
4. 4.Create an initial Prisma setup using the command
   `npx prism init`.
5. Create a PostgreSQL database and update the `.env` file with the correct database credentials.
6. Run the `npm run start` command to start the server.
7. Navigate to `http://localhost:3000` in your browser to view the application.

## Migration database
<p>There is a migration.sql file in the project which means that the database is already created and you need to run SQL queries from this file to create the database schema.</p>
<p>To run the migration, you can use any convenient way to run SQL queries, such as the command line, or a database application such as PostgreSQL , MySQL, Workbench or pgAdmin.</p>

- If you are working with PostgreSQL, you can use the command line and the psql command to execute SQL queries from the migration file.
- Example: `psql -U username -d database_name -f migration.sql`
where username is the database user, database_name is the database name, and migration.sql is the path to the migration file.

- If you are working with MySQL, you can use the mysql command to execute SQL queries from the migration file.
- Example: `mysql -u username -p database_name < migration.sql`
<p>After executing the SQL queries from the migration file, the database will be updated to the appropriate version and you can start interacting with it through your application.</p>

## Authentication
The server supports authentication using JWT (JSON Web Tokens). When a user logs in or registers, a JWT is generated and sent to the client.

## Authorization and access control
The server includes access control for four main roles: 
- buyer
- seller
- manager
- administrator. 
<p>A user can have multiple roles. There are also roles for car dealerships.</p>
<p>The server also includes middleware to check the user's role and permissions for each request. Seller and admin can create new lists.</p>

## Premium accounts
The server supports two types of user accounts: basic and premium. Users can purchase premium accounts for a fee and access additional features such as statistics on their listings.

## Roles
- __Admin:__
- __Buyer:__
- __Carshowroom:__
- __Cardealership-admin:__
- __Cardealership-manager:__
- __Cardealership-automechanic:__
- __Cardealership-sales:__
- __Cardealership-service-manager:__
- __Manager:__
- __Seller:__
- __Seller-premium:__
- 









<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
