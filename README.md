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
- __Admin:__ a superuser who can do anything. This role will only be performed by the client and its partners.
- __Buyer:__"walks" around the site, can contact a separate seller or car dealership.
- __Carshowroom:__ is responsible for creating, editing and deleting car dealerships on the platform. In addition, you can also display a list of all available car dealerships and the details of each.
- __Cardealership-admin:__ managing administrative tasks in the dealership such as customer service, finance and inventory management.
- __Cardealership-manager:__ managing the sales team and ensuring sales targets are met. 
They are also responsible for building customer relationships and ensuring customer satisfaction. Contains methods to create, edit, and delete a manager profile, view a list of managers and their profiles, and grant and revoke access to manager-only features.
- __Cardealership-automechanic:__ diagnosis and repair of customers' cars. 
Contains methods for creating, editing, and deleting a mechanic profile, viewing a list of mechanics and their profiles, and granting and denying access to mechanic-only features.
- __Cardealership-sales:__ selling vehicles to customers, providing information about vehicles and ensuring that the customer is satisfied with their purchase.
  Contains methods for creating, editing, and deleting a seller profile, viewing a list of sellers and their profiles, and granting and revoking access to seller-only features.
- __Cardealership-service-manager:__ managing the service department and ensuring that all customer repairs are completed in a timely and satisfactory manner, as well as inventory management.
  Contains methods for creating, editing, and deleting a service manager profile, viewing a list of service managers and their profiles, and granting and denying access to features that are only available to service managers.
- __Manager:__ manages the platform, blocks people, removes invalid ads, checks for suspicious ads, etc. Only an administrator can create such a user.
- __Seller:__ a registered seller can list his own car for sale, but only one car can be listed for sale.
The client can create a price list in the following currencies: USD, EUR, UAH. The price is indicated in only one of the currencies. 
The rest of the currencies are calculated at the exchange rate of a private bank. Prices are updated once a day. 
It is mandatory to specify the rate at which we made the calculation and the price specified by the user when placing the ad. 
Every ad is automatically checked for profanity.If the platform does not find any suspicious dictionary, the ad goes into active status and is added to the platform. 
If the platform finds inappropriate words, the system offers to edit the ad.
The seller can edit the ad only 3 times. If the ad fails 3 times, it goes into inactive status. In this case, a letter will be sent to the manager for verification.
- __Seller-premium:__ The same as the seller, but the number of cars for sale is not limited. The platform also provides him with the following data:
   - number of ad views
   - number of views per day, week, month
   - The average price of a car in the region where it is sold.
   - The average price of a car throughout Ukraine

## Integration with AWS
The server is integrated with AWS for cloud storage and other services. You can configure your connection to AWS by setting the appropriate environment variables. The server currently uses S3 to store list images.

## To make a request to Postman
PS:to successfully connect and receive a response, the server must be running on localhost:3000.</p>

Here are the methods and URLs for the project respectively `{{api}} - http://localhost:3000`:

- Admin:

| method |                            URL                             |                                      description |
|--------|:----------------------------------------------------------:|-------------------------------------------------:|
| POST   |                       {{api}}/admin                        |                               Create a new admin |
| GET    |                       {{api}}/admin                        |                             Get a list of admins |
| PATCH  |                   {{api}}/admin/:idAdmin                   |                                     Update admin |
| GET    |                   {{api}}/admin/:idAdmin                   |                                  Get admin by ID |
| DELETE |                   {{api}}/admin/:idAdmin                   |                                     Remove admin |
| GET    |                  {{api}}/admin/:firstName                  |                               Get admin by  name |
| POST   |              {{api}}/admin/new/:idSeller/car               |                 Create a new vehicle as an admin |
| POST   |         {{api}}/admin/another/:idSeller/car                | The admin will create another car for the seller |
| PATCH  |      {{api}}/admin/update/seller/:idSeller/car/:idCar      |                       Auto update from the admin |
| GET    |                   {{api}}/admin/cars/all                   |                            Get all cars by Admin |

- Admin-buyer:

| method |                            URL                             |                         description |
|--------|:----------------------------------------------------------:|------------------------------------:|
| POST   |                    {{api}}/admin/buyer                     |      Create a new buyer as an admin |
| PATCH  |                {{api}}/admin/buyer/:idBuyer                |        Update the buyer as an admin |
| GET    |                {{api}}/admin/buyer/:idBuyer                |  Get the buyer by ID from the admin |
| DELETE |               {{api}}/admin /buyer/:idBuyer                |              Delete  buyer by admin |
| GET    |                  {{api}}/admin/buyer/list                  | Get the list of buyers by the admin |
| GET    |            {{api}}/admin/buyer/name/:firstName             |         Get the buyer by admin name |

- Admin-manager

| method |                            URL                             |                      description |
|--------|:----------------------------------------------------------:|---------------------------------:|
| POST   |                   {{api}}/admin/manager                    | Create a new manager as an admin |
| PATCH  |              {{api}}/admin/manager/:idManager              |         Update  manager by admin |
| GET    |              {{api}}/admin/manager/:idManager              |    Get  manager by ID from admin |
| DELETE |              {{api}}/admin/manager/:idManager              |   Delete the manager as an admin |
| GET    |           {{api}}/admin/manager/name/:firstName            |        Get a manager named admin |
| GET    |                {{api}}/admin/managers/list                 |  Get a list of managers by admin |

- Admin-seller

| method |                            URL                             |                          description |
|--------|:----------------------------------------------------------:|-------------------------------------:|
| POST   |                    {{api}}/admin/seller                    |      Create a new seller as an admin |
| PATCH  |               {{api}}/admin/seller/:idSeller               |              Seller update  by admin |
| GET    |               {{api}}/admin/seller/:idSeller               |          Get seller by ID from admin |
| DELETE |               {{api}}/admin/seller/:idSeller               |    Remove of the seller by the admin |
| GET    |            {{api}}/admin/seller/name/:firstName            |            Get a manager named admin |
| GET    |                 {{api}}/admin/sellers/list                 | Get a list of sellers from the admin |
| GET    |             {{api}}/admin/seller/:idSeller/car             |       Get all seller`s cars by admin |
| GET    |         {{api}}/admin/seller/:idSeller/car/:idCar          |           Get the car from the admin |
| DELETE |          {{api}}/admin/seller/:idSeller/car/:idCa          |      Remove of  the car by the admin |

- Admin-seller-premium

| method |                            URL                             |                                                 description |
|--------|:----------------------------------------------------------:|------------------------------------------------------------:|
| POST   |           {{api}}/admin/sellerPremium/:sellerId            |                          Upgrade seller to premium by admin |
| POST   |        {{api}}/admin/sellerPremium/:sellerId/cancel        |        The admin canceled the seller`s premium subscription |
| GET    |        {{api}}/admin/sellerPremium/:sellerId/views         |               Get the number of views for a seller by admin |
| GET    |    {{api}}/admin/sellerPremium/:sellerId/views/:period     |   Get the number of views per period for a seller by  admin |
| GET    | {{api}}/admin/sellerPremium/:sellerId/averagePrice/region  | Get the average price in the seller`s region from the admin |
| GET    | {{api}}/admin/sellerPremium/:sellerId/averagePrice/ukraine |                Get the average price for Ukraine from admin |


- Admin-carshowroom:

| method  |                    URL                     |                                             description |
|---------|:------------------------------------------:|--------------------------------------------------------:|
| POST    |         {{api}}/admin/carshowroom          |                   Create a new car showroom as an admin |
| GET     |         {{api}}/admin/carshowroom          |               Get a list of car showroom from the admin |
| PATCH   | {{api}}/admin/carshowroom/:idCarshowroom   |                       Upgrade of the car showroom admin |
| GET     |  {{api}}/admin/carshowroom/:idCarshowroom  |                 Get a car showroom by ID from the admin |
| DELETE  |  {{api}}/admin/carshowroom/:idCarshowroom  |                         Remove of car showroom by admin |

- Admin-carshowroomAdmin:

| method |                      URL                      |                                        description |
|--------|:---------------------------------------------:|---------------------------------------------------:|
| POST    |        {{api}}/admin/carshowroomAdmin         |        Create a new car showroom admin using admin |
| GET     |        {{api}}/admin/carshowroomAdmin         |       Get a list of car showroom admins by admin   |
| PATCH   | {{api}}/admin/carshowroomAdmin/:idCarshowroomAdmin |    Upgrade the car showroom administrator to admin |
| GET     | {{api}}/admin/carshowroomAdmin/:idCarshowroomAdmin |          Get a car showroom admin by ID from admin |
| DELETE  | {{api}}/admin/carshowroomAdmin/:idCarshowroomAdmin | Remove the car showroom administrator as an  admin |

- Admin-carshowroomManager:

| method |                            URL                             |                                   description |
|--------|:----------------------------------------------------------:|----------------------------------------------:|
| POST    |        {{api}}/admin/carshowroomManager         | Create a new car showroom manager as an admin |
| GET     |        {{api}}/admin/carshowroomManager      |   Get a list of car showroom manager by admin |
| PATCH   | {{api}}/admin/carshowroomManager/:idCarshowroomManager |  Upgrade the car showroom manager as an admin |
| GET     | {{api}}/admin/carshowroomManager/:idCarshowroomManager |   Get a car showroom manager by ID from admin |
| DELETE  | {{api}}/admin/carshowroomManager/:idCarshowroomManager |  Remove the manager of the car showroom admin |

- Admin-carshowroomAutoMechanic:

| method |                            URL                             |                                        description |
|--------|:----------------------------------------------------------:|---------------------------------------------------:|
| POST    |        {{api}}/admin/carshowroomAutoMechanic        |     Create a new car showroom mechanic as an admin |
| GET     |        {{api}}/admin/carshowroomAutoMechanic      | Get a list of car showroom mechanic from the admin |
| PATCH   | {{api}}/admin/carshowroomAutoMechanic/:idCarshowroomAutoMechanic |      Upgrade the car showroom mechanic as an admin |
| GET     | {{api}}/admin/carshowroomAutoMechanic/:idCarshowroomAutoMechanic |       Get a car showroom mechanic by ID from admin |
| DELETE  | {{api}}/admin/carshowroomAutoMechanic/:idCarshowroomAutoMechanic |      Remove car mechanic  admin |
- Admin-carshowroomSales:

| method |                            URL                             |                                       description |
|--------|:----------------------------------------------------------:|--------------------------------------------------:|
| POST    |        {{api}}/admin/carshowroomSales        |          The admin will create a new car showroom |
| GET     |        {{api}}/admin/carshowroomSales      | Get a list of car showroom sellers from the admin |
| PATCH   | {{api}}/admin/carshowroomSales/:idCarshowroomSales |          Upgrade of the car showroom by the admin |
| GET     | {{api}}/admin/carshowroomSales/:idCarshowroomSales |               Get a car showroom by ID from admin |
| DELETE  | {{api}}/admin/carshowroomSales/:idCarshowroomSales|      Remove the sellers of the car showroom admin |
- Admin-carshowroomServiceManager:

| method |                            URL                             |                                               description |
|--------|:----------------------------------------------------------:|----------------------------------------------------------:|
| POST    |        {{api}}/admin/carshowroomServiceManager        |     Create a new car showroom service manager as an admin |
| GET     |        {{api}}/admin/carshowroomServiceManager      |          Get a list of car service manager from the admin |
| PATCH   | {{api}}/admin/carshowroomServiceManager/:idCarshowroomServiceManager |      Upgrade of the car showroom service manager by admin |
| GET     | {{api}}/admin/carshowroomServiceManager/:idCarshowroomServiceManager | Get the car showroom service manager by ID from the admin |
| DELETE  | {{api}}/admin/carshowroomServiceManager/:idCarshowroomServiceManager|     Removal of car showroom service manager  admin |

- Auth:

| method |          URL          |   description |
|--------|:---------------------:|--------------:|
| POST   |  {{api}}/auth/login   |    Login user |
| POST   | {{api}}/auth/register | Register user |

- Buyer:

| method |           URL            |                description |
|-------|:------------------------:|---------------------------:|
| POST  |      {{api}}/buyer       | Create a new customer<br/> |
| GET   |      {{api}}/buyer       |  Get a list of buyers<br/> |
| PATCH |  {{api}}/buyer/:idBuyer  |           Update the buyer |
| GET   |  {{api}}/buyer/:idBuyer  |          Get a buyer by ID |
| DELETE | {{api}}/buyer/:idBuyer   |              Remove  buyer |
|GET   | {{api}}/buyer/:firstName |      Find a buyer by  name |

- Manager:

| method |            URL             |            description |
|--------|:--------------------------:|-----------------------:|
| POST   |      {{api}}/manager       |   Create a new manager |
| GET    |      {{api}}/manager       | Get a list of managers |
| PATCH  | {{api}}/manager/:idManager |         Update manager |
| GET    | {{api}}/manager/:idManager |      Get an ID manager |
| DELETE | {{api}}/manager/:idManager |         Remove manager |
| GET    | {{api}}/manager/:firstName |  Get  manager by  name |

- Seller:

| method |            URL            |                       description |
|--------|:-------------------------:|----------------------------------:|
| POST   |      {{api}}/seller       |               Create a new seller 
| GET    |  {{api}}/seller           |             Get a list of sallers |
| PATCH  | {{api}}/seller/:idSeller  |                   Update a seller |
| GET    | {{api}}/seller/:idSeller  |                  Get seller by ID 
| DELETE | {{api}}/seller/:idSeller  |                   Remove a seller |
| GET    | {{api}}/seller/:firstName |             Find a seller by name |
| POST   |    {{api}}/seller/:idSeller/car     | Create of a new car by the seller |
| GET    |    {{api}}/seller/:idSeller/car     |   Get the whole car by the seller |
| PATCH  | {{api}}/seller/:idSeller/car/:idCar |   Update of the car by the seller |
| GET    | {{api}}/seller/:idSeller/car/:idCar |         Get the car by the seller |
| DELETE |      {{api}}/seller/:idSeller/car   |  Remove of the  car by the seller |

- Seller Premium:

| method |                          URL                          |                                       description |
|--------|:-----------------------------------------------------:|--------------------------------------------------:|
| POST   |            {{api}}/sellerPremium/:sellerId            |                    Upgrade your seller to premium |
| POST   |        {{api}}/sellerPremium/:sellerId/cancel         |            Cancel a seller`s premium subscription |
| POST   |      {{api}}/sellerPremium/another/:idSeller/car      |        Create another car at the seller`s premium |
| GET    |         {{api}}/sellerPremium/:sellerId/views         |            Get the number of views for the seller |
| GET    |     {{api}}/sellerPremium/:sellerId/views/:period     | Get the views seller`s number of views per period |
| GET    | {{api}}/sellerPremium/:sellerId/averagePrice/region   |      Get the average price in the seller`s region |
| GET    | {{api}}/sellerPremium/:sellerId/averagePrice/ukraine  |                 Get the average price for Ukraine |

## Future improvements
* Development of access to the platform not only for individual sellers, but also for __car dealerships__ with their __managers__, __administrators__, __salespeople__, __service managers__, __automechanics__ (through the permission system)
* Implement a payment system that will allow users to buy cars online.
* Implement a messaging system to allow buyers and sellers to communicate directly through the platform.
* Improvements to the search functionality to make it more reliable and user-friendly.

## Stay in touch

- Author - [Ivanna Zobniv](https://github.com/IvannaZobniv)
- Mail me - ivannazobniv333@gmail.com

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