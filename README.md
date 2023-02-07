<h1><p align="center"><img src="https://raw.githubusercontent.com/ETI-GroupE/buyee/main/Buyee.png" width="400" /></p></h1>

# ETI Assignment 2

Class: P01<br />

Name: Lee Wen Kang (10203100B)<br />
Name: Chua Dong En (10202623A)<br />
Name: Lee Wen Kang (10203100B)<br />
Name: Lincoln Chia (10205479E)<br />
Name: Brian Lim (10208584A)<br />

## Contents

1. [Repositories](#Repositories)
2. [Solution Design](#Solution-Design)
3. [Architecture Design](#Architecture-Design)
4. [Startup Guide](#Startup-Guide)

This assignment is to develop a program of our choice while apply cloud native concepts. The program must be decomposed into coherent, loosely coupled microservices. You need to consider operational efficiency and ability to recover from failures in order to minimize any impact on business operations.

## Repositories

| No  | Service Name             | Purpose                                                                                                      | Link                                                             |
| :-- | :----------------------- | :----------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------- |
| 1   | rideshare-cli (current)  | Acts as an interface for users to interact with. It connects to rideshare-api to interact with the database. | [Link](https://github.com/NPLeeWenKang/rideshare-cli)            |
| 2   | Auth                     | Authentication service for user account creation, logging in, uses JWT                                       | [Link](https://github.com/ETI-GroupE/auth)                       |
| 3   | rideshare-trip-svc       | Interacts directly with the database for persistent data storage for trips and its assignments. Uses REST.   | [Link](https://github.com/NPLeeWenKang/rideshare-trip-svc)       |
| 4   | rideshare-ta_process-svc | Service that is in charge of assigning trips to drivers. Trip assignment is abbreviated as ta.               | [Link](https://github.com/NPLeeWenKang/rideshare-ta_process-svc) |
| 5   | rideshare-system-db      | MySQL for persistent data storage.                                                                           | [Link](https://github.com/NPLeeWenKang/rideshare-system-db)      |
| 6   | rideshare-ui (bonus)     | For the bonus marks, this service serves a website built using React.                                        | [Link](https://github.com/NPLeeWenKang/rideshare-ui)             |
| 7   | Purchase History         | Allow customers to view all their purchase history and business owners to view their products sold           | [Link](https://github.com/ETI-GroupE/purchase-history)           |
| 7   | Shopping Cart & checkout | Allow customers to view all their purchase history and business owners to view their products sold           | [Link](https://github.com/ETI-GroupE/ShoppingCart)               |

## Solution Design

TODO: para about microservice (insert diagram)

### Authentication (Dong En)

Description: Auth service allows users to sign up, log in, modify account details and be issued Json Web Tokens (JWTs) to be used for verification by this service. Users have roles and verification endpoints check for both user identity and role permissions.

Endpoints:
![image](https://user-images.githubusercontent.com/73124349/217296810-8a3ce7c0-6326-4019-911f-92723b7119ec.png)

Database Design:
![image](https://user-images.githubusercontent.com/73124349/217296886-091916e8-54a4-40b3-92b2-9d18524b06f6.png)

Design Considerations: Opted for design pattern where issuing of JWT and verification of JWT is in single service for simplicity. Realised that writing middleware for multiple languages (js, go, python) for JWT verification would not make it in the time scope that we have.

### Catalog (Wen Kang)

### Feedback (Wen Kang)

### Purchase History (Brian)

Description: Purchase History is to allow both types of users, customers and business owners to view all products they have bought
in the past as well ass being able to view the products that are being sold on Buyee respectively.

Endpoints made:
1). api/v1/allpurchase URL: https://buyee-purchase-history-1-nr7eovel5q-as.a.run.app/api/v1/allpurchase ("GET")
2). api/v1/updatehistory URL: https://buyee-purchase-history-1-nr7eovel5q-as.a.run.app/api/v1/updatehistory ("POST")
3). api/v1/viewAllBusinessPurchase URL: https://buyee-purchase-history-1-nr7eovel5q-as.a.run.app/api/v1/api/v1/viewAllBusinessPurchase ("GET")

Design Consideration: To work with Shopping Cart and Delivery & Discount Endpoints

### Shopping Cart & checkout (Lincoln)

Design Considerations: Left calculation of final amount to be done in the backend before sending it to the checkout database. The shopping cart user database will have a many to one relationship between user to shopping cart respectively. This is so that users can have multiple shopping carts which can be turned into orders in the product history page. The shopping cart will hold just the product ID and will query for the information in order to reduce redundent data. Finally checkout will contain the nessasary information needed for users to checkout of the account such as devliery address and the credit card details.

### Discounts (Herman)

Description: Discounts service stores all the discounts available in our app , and endpoints provide access to discounts,actions to apply discount etc.

Design consideration: To have 2 tables in this database, cartdiscount(shopCartId,discountId) to store all discounts applied to a shopping cart , as well as discounts
table to store all relevant information about discounts

Endpoints:<br>
(GET)https://buyee-discount-qqglc24h2a-as.a.run.app/api/v1/discounts -> Get all discounts available<br>
(GET)https://buyee-discount-qqglc24h2a-as.a.run.app/api/v1/discounts/:shopCartId -> Get all discounts applied in the given cart.<br>
(POST)https://buyee-discount-qqglc24h2a-as.a.run.app/api/v1/discountapply/:shopcartId/:discount_id -> Apply discount to cart.<br>


### Delivery (Herman)
Description: Delivery service stores orderstatus & location of order.Mainly used for Admin user to update delivery status of productId,orderId.

Design Consideration: contains database with composite key(orderId,productId), since different products in the order can have different delivery status,locations &times. Interacts with Purchase History to populate the database so status can be updated. 

Endpoints:<br>
(POST)https://buyee-delivery-qqglc24h2a-as.a.run.app/api/v1/status -> post purchasehistory body (all purchasehistory records) into orderstatus database
(GET)https://buyee-delivery-qqglc24h2a-as.a.run.app/api/v1/status/:orderId/:productId ->get order status of product in order
(GET)https://buyee-delivery-qqglc24h2a-as.a.run.app/api/v1/status -> Get all records from orderstatus. To be populated for Admin UI so admin user can update delivery status<br>
(PUT)https://buyee-delivery-qqglc24h2a-as.a.run.app/api/v1/status/:orderId/:productId/:statusid -> Update product in order 

### Architecture Design

## Startup Guide

Set up guides for each service is in its own repository.
