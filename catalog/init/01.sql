--Drop Tables
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS product;

--Create Tables
CREATE TABLE category (
    category_id SERIAL,
    category_name varchar,
    PRIMARY KEY(category_id)
);

CREATE TABLE product (
    product_id SERIAL,
    owner_id int, -- FK for user service
    product_name varchar,
    product_description varchar,
    product_price float,
    product_category int REFERENCES category(category_id),
    product_ship_location varchar,
    product_stock int,
    PRIMARY KEY(product_id)
);


