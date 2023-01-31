--Drop Tables
DROP TABLE IF EXISTS feedback;

--Create Tables
CREATE TABLE feedback (
    feedback_id SERIAL,
    created_at_date DATE NOT NULL DEFAULT CURRENT_DATE,
    user_id int,
    product_id int,
    rating int CHECK(rating >= 0 AND rating <= 5),
    description varchar,
    PRIMARY KEY(feedback_id)
);