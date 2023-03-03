## Restaurant app

### Currently working on unit test and role based access control system.

## Built With
* Node.js
* Express.js
* MongoDB
* TypeScript


## Requirements

For development, you will only need Node.js v16+ installed in your environnement.


## Install 
    using SSH:
    $ git clone git@github.com:knrbokhari/restaurant_app_server_ts.git
    or using HTTPS:
    $ git clone https://github.com/knrbokhari/restaurant_app_server_ts.git
    $ cd restaurant_app_server_ts
    $ npm install


## Configure app
Create a `.env` file. Open `restaurant_app_server_ts/.env` then You will need to give your MONGO_DB, JWT_SECRET, PORT, SMTP_HOST, SMTP_EMAIL, SMTP_PASSWORD, FROM_EMAIL, FROM_NAME, CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET and STRIPE_SECRET:

```
MONGO_DB = 
JWT_SECRET = 
PORT = 
SMTP_HOST = 
SMTP_EMAIL = 
SMTP_PASSWORD = 
FROM_EMAIL = 
FROM_NAME = 
CLOUD_NAME = 
CLOUD_API_KEY = 
CLOUD_API_SECRET = 
STRIPE_SECRET =
```
### Run the server with nodemon
    $ npm run dev
### Run the test 
    $ npm run test
### Run the build 
    $ npm run build
### Run the server 
    $ npm start

### API Documentation
Check out the API documentation by visiting this [Link](https://github.com/knrbokhari/restaurant_app_server_ts).

### Live server link
<!-- Check out the API by visiting this [Link](https://nodejs-development-task-production.up.railway.app/). -->
Coming Soon..

### About this app
* This API is designed with robust security features including JWT implementation, email and password authentication, change password,user verification token, and password reset functionality.

* This API offers seamless integration with Stripe payment system, allowing for easy and secure payment processing. This API provides a secure and reliable solution for user authentication and payment processing.