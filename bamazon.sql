DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,

  PRIMARY KEY (item_id)
);
SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jenga", "Games", 10.00, 100), ("Macbook Pro", "Computers", 1000, 20), ("TV", "Electronics", 600, 20), ("Playstation 4", "Electronics", 400, 10), ("Bicycle", "Sporting Goods", 400, 30), ("Soccer Jersey", "Apparel", 90, 25), ("Purse", "Womens Accessories", 70, 5), ("Wallet", "Mens Accesories", 25, 5), ("Drone", "Electronics", 200, 30), ("Ipad", "Electronics", 300, 10);

-- ### Alternative way to insert more than one row
-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);
