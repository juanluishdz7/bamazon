var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  Start();
});

function Start() {
  console.log("-----------------------------------");
  console.log("-----------------------------------");

  connection.query("SELECT * FROM products", function(err, results) {
    for (var i = 0; i < results.length; i++) {
      console.log("Product ID: " + results[i].item_id + " | Product name: " + results[i].product_name + " | Department: " + results[i].department_name + " | Price: " + results[i].price + " | Stock Quantity: " + results[i].stock_quantity);
    }
    console.log("-----------------------------------");
    console.log("-----------------------------------");

    inquirer
    .prompt([
      {
      name: "item_id",
      type: "input",
      choices: function() {
        var choiceArray = [];
        for (var i = 0; i < results.length; i++) {
          choiceArray.push(results[i].item_id);
        }
      },
      message: "Enter the ID of the product you would like to purchase",
      validate: function(value) {
        if (isNaN(value) == false) {
            return true;
        } else {
            return false;
        }
    }
    },
    {
      name: "quantity",
      type: "input",
      message: "How many items would you like to purchase?",
      validate: function(value) {
        if (isNaN(value) == false) {
            return true;
        } else {
            return false;
        }
    }
    
      }])
    .then(function(answer) {
      var chosenId = answer.item_id - 1;
      var product = results[chosenId];
      var chosenQuantity = answer.quantity;
      if (chosenQuantity < results[chosenId].stock_quantity) {
      console.log("Your purchase of " + product.product_name + " has been completed " +  product.price * chosenQuantity + " dollars have been charged to your account");
      connection.query("UPDATE products SET ? WHERE ?", [{
        stock_quantity: results[chosenId].stock_quantity - chosenQuantity
      }, {
        item_id: results[chosenId].item_id
      }], function(err, results) {
          Start();
      });
    } else {
      console.log("Sorry, insufficient quantity of " + product.product_name + " at this time. All we have is " + results[chosenId].stock_quantity + " in our inventory.");
      console.log("-----------------------------------");
      Start();
    }
    
  
  })
  })
}

  