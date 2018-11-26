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
    inquirer.prompt([
{
    type:"input",
    name:"getId",
    message:"input the ID# of the item you wish to purchase"

},

{
    type:"input",
    name:"getquantity",
    message:"enter the quantity you wish to purchase"
    }
])
    
    .then(function(answer){
        if (answer.getId >10){
            console.log("there is no product with that number please enter the correct ID");
            Getinfoid()
        }
        else{
            
              
            
                connection.query("SELECT * FROM products where ?",
                {
                    id:answer.getId
                },function(err,res){
                    if(err) throw err;

                    if(res[0].stock_quantity>=answer.getquantity){
                        console.log("\n Puchase Completed");
                        
                        var newQuantity = res[0].stock_quantity - parseInt(answer.getquantity);

console.log(" The New quantity is :" +  newQuantity);

                        var totalCost = parseInt(answer.getquantity) * res[0].price;

                        



                        updateQuantity(answer.getId, newQuantity);

                        console.log('\nTotal Cost: ' + totalCost);


                    }
                    else{
                        console.log("we are out of stock check back soon")
                        afterConnection()
                    }
                })
            
        }
    })
}

function updateQuantity(nid, amount,  ) {

    connection.query("UPDATE products set ? where ?",

        [

            {
                stock_quantity: amount

            

            },

            {

                id: nid
              
            }
            
        ], function (err, res) {

            console.log( " products updated!\n");
            showupdate()
                connection.end()
        });

}


function showupdate() {
    connection.query("SELECT * FROM products", function(err, rows) {
      if (err) throw err;
     console.log("ID#   Products               Department     Price       Quantity");
     console.log("----------------------------------------------------------------------------");
      rows.forEach(function(result){
      console.log(result.id+"     ",result.product_name+"    ", result.department+"     ",result.price+"     ", result.stock_quantity);
      })
      
    });

}

