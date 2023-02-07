<h1><p align="center"><img src="https://user-images.githubusercontent.com/73012553/208285088-63810daf-d821-41fb-b39f-5f0852b0cc54.png" width="700" /></p></h1>

# ETI Assignment 2

Class: P03<br />

Name: Lee Wen Kang (10203100B)<br />
Name: Lee Wen Kang (10203100B)<br />
Name: Lee Wen Kang (10203100B)<br />
Name: Lee Wen Kang (10203100B)<br />
Name: Brian Lim (10208584A)<br />

## Contents

1. [Repositories](#Repositories)
2. [Solution Design](#Solution-Architecture)
3. [Architecture Design](#Solution-Architecture)
4. [Startup Guide](#Startup-Guide)

TODO: This assignment is to implement a ride-share platform using a microservice architecture with 2 primary groups of users, passengers and drivers. Passengers should be able to start trips while drivers should be able to accept them.

## Repositories

| No  | Service Name             | Purpose                                                                                                      | Link                                                             |
| :-- | :----------------------- | :----------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------- |
| 1   | rideshare-cli (current)  | Acts as an interface for users to interact with. It connects to rideshare-api to interact with the database. | [Link](https://github.com/NPLeeWenKang/rideshare-cli)            |
| 2   | rideshare-account-svc    | Interacts directly with the database for persistent data storage for passengers and drivers. Uses REST.      | [Link](https://github.com/NPLeeWenKang/rideshare-account-svc)    |
| 3   | rideshare-trip-svc       | Interacts directly with the database for persistent data storage for trips and its assignments. Uses REST.   | [Link](https://github.com/NPLeeWenKang/rideshare-trip-svc)       |
| 4   | rideshare-ta_process-svc | Service that is in charge of assigning trips to drivers. Trip assignment is abbreviated as ta.               | [Link](https://github.com/NPLeeWenKang/rideshare-ta_process-svc) |
| 5   | rideshare-system-db      | MySQL for persistent data storage.                                                                           | [Link](https://github.com/NPLeeWenKang/rideshare-system-db)      |
| 6   | rideshare-ui (bonus)     | For the bonus marks, this service serves a website built using React.                                        | [Link](https://github.com/NPLeeWenKang/rideshare-ui)             |
| 7   | Purchase History         | Allow customers to view all their purchase history and business owners to view their products sold           | [Link](https://github.com/ETI-GroupE/purchase-history)           |

## Solution Design

TODO: para about microservice (insert diagram)

### Authentication (Dong En)

possible talking points

1. description
2. endpoints made
3. Design consideration

### Catalog (Wen Kang)

### Feedback (Wen Kang)

### Purchase History (Brian)
Description: Purchase History is to allow both types of users, customers and business owners to view all products they have bought
in the past as well ass being able to view the products that are being sold on Buyee respectively.

Endpoints made: 
1). api/v1/allpurchase              URL: https://buyee-purchase-history-1-nr7eovel5q-as.a.run.app/api/v1/allpurchase                        ("GET")
2). api/v1/updatehistory            URL: https://buyee-purchase-history-1-nr7eovel5q-as.a.run.app/api/v1/updatehistory                      ("POST")
3). api/v1/viewAllBusinessPurchase   URL: https://buyee-purchase-history-1-nr7eovel5q-as.a.run.app/api/v1/api/v1/viewAllBusinessPurchase    ("GET")

Design Consideration: To work with Shopping Cart and Delivery & Discount Endpoints

### Architecture Diagram

## Startup Guide

Set up guides for each service is in its own repository.
