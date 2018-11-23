var mysql = require("mysql");
var inquire= require("inquirer");

var connection= mysql.createConnection({
    host:"localhost",
    port: 3306,
    user: "root",
    password:"password",
    database: "bamazon"
});


connection.connect(function(err){
    if (err) throw err;
    console.log("connected as id" + connection.threadId +"\n");
    afterConnection();
});


function afterConnection() {
    connection.query("SELECT * FROM products", function(err, rows) {
      if (err) throw err;
     
      rows.forEach(function(result){
      console.log(result.id,result.product_name,result.price,result.stock_quantity);
      })
      connection.end();
    });

}
  
  






