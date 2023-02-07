<h1><p align="center"><img src="https://raw.githubusercontent.com/ETI-GroupE/buyee/main/Buyee.png" width="400" /></p></h1>

# ETI Assignment 2

Class: P01<br />

Name: Lee Wen Kang (10203100B)<br />
Name: Chua Dong En (10202623A)<br />
Name: Herman (10206327K)<br />
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
| 1   | Buyee Frontend (Current Repo)  | Frontend that connects all the services to form a eccomerce application | [Link](https://github.com/ETI-GroupE/buyee)            |
| 2   | Auth                     | Authentication service for user account creation, logging in, uses JWT                                       | [Link](https://github.com/ETI-GroupE/auth)                       |
| 3   | Catalog       | Contains products and product categories. Is the center piece of the application where several service interect with it   | [Link](https://github.com/ETI-GroupE/catalog)       |
| 4   | Feedback | Allows customers to rate and submit feedback for any product               | [Link](https://github.com/ETI-GroupE/feedback) |
| 5   | Delivery status          | Delivery status endpoint that interacts with purchase history and admin ui                                   | [Link](https://github.com/ETI-GroupE/deliverystatus)             |
| 6   | Discounts                | Discounts, has endpoints that shopping cart needs                                                            | [Link](https://github.com/ETI-GroupE/discounts)                  |
| 7   | Purchase History         | Allow customers to view all their purchase history and business owners to view their products sold           | [Link](https://github.com/ETI-GroupE/purchase-history)           |
| 8   | Shopping Cart & checkout | Allow customers to view all their purchase history and business owners to view their products sold           | [Link](https://github.com/ETI-GroupE/ShoppingCart)               |
| 9   | Database init script | initiation script for the database           | [Link](https://github.com/ETI-GroupE/database-scripts)               |

## Solution Design

![Solution Design](https://user-images.githubusercontent.com/73012553/217334579-9e3122ea-d8da-42f8-a174-9f5c8864705d.png)

For this assignment, the team used a microservice architecture.

1. Authentication (By Dong En)
2. Catalog (By Wen Kang)
3. Feedback (By Wen Kang)
4. Shopping Cart (By Lincoln)
5. Checkout (By Lincoln)
6. Purchase History (By Brian)
7. Delivery (By Herman)
8. Discount (By Herman)

### Authentication (Dong En)

Description: Auth service allows users to sign up, log in, modify account details and be issued Json Web Tokens (JWTs) to be used for verification by this service. Users have roles and verification endpoints check for both user identity and role permissions.

Endpoints:

![image](https://user-images.githubusercontent.com/73124349/217296810-8a3ce7c0-6326-4019-911f-92723b7119ec.png)

Database Design:

![image](https://user-images.githubusercontent.com/73124349/217296886-091916e8-54a4-40b3-92b2-9d18524b06f6.png)

Design Considerations: Opted for design pattern where issuing of JWT and verification of JWT is in single service for simplicity. Realised that writing middleware for multiple languages (js, go, python) for JWT verification would not make it in the time scope that we have.

### Catalog (Wen Kang)

Description: Catalog service is in charge of buyee's product and category tables. It allow users to get products based on a variaty of filters such as product_id and product_name. In addition to products, this service also houses the category table which includes product categories such as tech and fashion. So when users query for products, my service will automatically aggregate the data to match category_name to each product.

Endpoint and database design:

![catalog](https://user-images.githubusercontent.com/73012553/217318838-59a8d748-0d4e-4710-a155-a071c607bcc9.png)

Design Considerations: 

Being the center point of the whole buyee application, it was vital that the products `GET` method was very versatile and can be used by both frontend queries and backend queries. So, for the `(GET) /api/v1/products` endpoint, it allowed multiple query strings (5 parameters) to be used to properly filter for data that is needed. Furthermore, although pagination was not implemented on the frontend, I still implemented pagination on the `(GET) /api/v1/products` endpoint with `offset` and `limit`.

The `/api/v1/product/product_stock/decrement/:id` endpoint was also created so that Lincoln's check-out service is able to decrement the product stock whenever a user checks out. At the request of Lincoln, an additional query parameter `by` was implemented so that this service is more flexible and is able to decrement a product stock by any amount, as long as the final stock is more than or equals to 0.

### Feedback (Wen Kang)

Description: This service in in-charge of user feedbacks for buyee's products. Initially, this feature was suppose to be integrated with Brian's "purchase history" frontend to allow only users who has purchased the item to write a feedback, but because he was unable to complete both his frontend and backend in time, some comprimises had to be made. Currently, users can can view feedback about a product at the `<website_ip>/customer/products.html` page and can also create feedbacks for the product (now, any customer can create a feedback regardless of whether they have purhcased it).

Endpoint and database design:

![feedback](https://user-images.githubusercontent.com/73012553/217324567-26dc21c8-2ecf-448b-8e91-40b0d7baa57e.png)

Design Considerations:

When designing this service, the original idea was for users who has purchased the item to leave a feedback on their purchase history page which is the usual standard that eccomerce websites like Shopee use. However, because Brian's purchase history frontend and backend is unfinished, the frontend for service has to be modified to allow any user to submit a feedback.

To simplify and offload data process from frontend to backend, the `(GET) /api/v1/feedbacks/stats` aggregates the data on the backend and reduces the need to post-process data on the frontend which could affect performance.

### Purchase History (Brian)

Description: Purchase History is to allow both types of users, customers and business owners to view all products they have bought
in the past as well ass being able to view the products that are being sold on Buyee respectively.

Endpoints made:
1. api/v1/allpurchase URL: https://buyee-purchase-history-1-nr7eovel5q-as.a.run.app/api/v1/allpurchase ("GET")
2. api/v1/updatehistory URL: https://buyee-purchase-history-1-nr7eovel5q-as.a.run.app/api/v1/updatehistory ("POST")
3. api/v1/viewAllBusinessPurchase URL: https://buyee-purchase-history-1-nr7eovel5q-as.a.run.app/api/v1/api/v1/viewAllBusinessPurchase ("GET")

Design Consideration: To work with Shopping Cart and Delivery & Discount Endpoints

### Shopping Cart & checkout (Lincoln)
![image](https://user-images.githubusercontent.com/73088199/217388048-02336b18-613b-487d-ad24-3a1ff639d0d2.png)
![image](https://user-images.githubusercontent.com/73088199/217388075-8231de12-531a-4f95-a13b-093606c1e42f.png)



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
(POST)https://buyee-delivery-qqglc24h2a-as.a.run.app/api/v1/status -> post purchasehistory body (all purchasehistory records) into orderstatus database<br>
(GET)https://buyee-delivery-qqglc24h2a-as.a.run.app/api/v1/status/:orderId/:productId ->get order status of product in order<br>
(GET)https://buyee-delivery-qqglc24h2a-as.a.run.app/api/v1/status -> Get all records from orderstatus. To be populated for Admin UI so admin user can update delivery status<br>
(PUT)https://buyee-delivery-qqglc24h2a-as.a.run.app/api/v1/status/:orderId/:productId/:statusid -> Update product in order 

### Architecture Design

![Architecture Design](https://user-images.githubusercontent.com/73012553/217330647-036a08a8-7331-4261-a5f2-89056a7f9e0a.png)

All the services, frontend and databases are hosted on cloud run. For the database section of the diagram, for the purpose of saving money, only 1 service has been configured with the full implementation as the full implementation requires several databases to be spun up which minimally costs $42 per instance.

## Startup Guide

Set up guides for each service is in its own repository.
