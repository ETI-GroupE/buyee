<h1><p align="center"><img src="https://raw.githubusercontent.com/ETI-GroupE/buyee/main/Buyee.png" width="700" /></p></h1>

# ETI Assignment 2

Class: P01<br />

Name: Lee Wen Kang (10203100B)<br />
Name: Chua Dong En (10202623A)<br />
Name: Lee Wen Kang (10203100B)<br />
Name: Lee Wen Kang (10203100B)<br />
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

### Architecture Design

## Startup Guide

Set up guides for each service is in its own repository.
