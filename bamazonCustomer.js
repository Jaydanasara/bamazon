var mysql = require("mysql");
var inquirer= require("inquirer");

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
     console.log("ID#   Products               Department     Price       Quantity");
     console.log("----------------------------------------------------------------------------");
      rows.forEach(function(result){
      console.log(result.id+"     ",result.product_name+"    ", result.department+"     ",result.price+"     ", result.stock_quantity);
      })
      Getinfoid()
    });

}
  
 function Getinfoid(){
inquirer. prompt([
    {
        type:"input",
        name:"getId",
        message:"Input the ID# of the item you wish to purchase"
    }

])
.then(function(answer){
    if (answer.getId >10){
        console.log ("there is no product with that number please enter the correct ID");
        Getinfoid()
    }
        

else {

    
    inquirer. prompt([   
    {
        type:"input",
        name:"getquantity",
        message:"enter the Quantity you wish to purchase"
    }

])
.then(function(answer){
    

     connection.query("SELECT * FROM products where ?",

        {

            id: answer.getId

        }, function (err, res) {

            if (err) throw err;
            
                
            

           if (res[0].stock_quantity >= answer.getquantity) {

                console.log('\nPurchased!');

                
            }
        
        })
    })
    

}

})
 }


//                 //Update database

//                 var newQuantity = res[0].stock_quantity - parseInt(answer.getQuantity);



//                 var totalCost = parseInt(answer.getQuantity) * res[0].price;

//                 var sales = res[0].product_sales + totalCost;



//                 updateQuantity(answer.id, newQuantity, sales);

//                 console.log('\nTotal Cost: ' + totalCost);

//                 connection.end();







