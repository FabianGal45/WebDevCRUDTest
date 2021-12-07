var express = require('express');
var router = express.Router();
var MySql = require('sync-mysql');

//get = show data
router.get('/', function(req, res, next) { 
  var connection = new MySql({
    host: 'localhost',
    user: 'root',
    password: 'passwordformysql',
    database: 'pc_world'
  });
  var products = connection.query('SELECT * FROM products;');
  console.log(products);
  
  res.render('products', {
    title: 'Products',
    products: products
  });
});

router.get('/another_page', function(req, res, next){
  res.render("another_page", {
    title: 'Another Page'
  })

});

router.get('/update', function(req, res, next){ //or it can be edit
  var product_id = req.query.product_id;

  res.render("update", { //name of the ejs file
    title: 'Update Products',
    product_id: product_id
  });
});


//post = take in data
//res is what we want when comming out
router.post('/add', function(req, res, next){ 
  var connection = new MySql({
    host: 'localhost',
    user: 'root',
    password: 'passwordformysql',
    database: 'pc_world'
  });

  connection.query('INSERT INTO products(itemName) VALUES (?);', [req.body.item_name]);

  console.log(req.body.item_name);  
  res.redirect("/products");
});

router.post('/delete', function(req, res, next){
  var connection = new MySql({
    host: 'localhost',
    user: 'root',
    password: 'passwordformysql',
    database: 'pc_world'
  });
  
  var delete_id = req.body.prduct_id;//takes the staff_id from the html file
  connection.query('DELETE FROM products WHERE itemID=(?);', [delete_id]);//we need to have the variable in square brackets as there can be multiple questrion marks in the query
  res.redirect("/products"); //go back to the /staff page to start again.
});

router.post('/update', function(req, res, next){
  var staff_id = req.body.staff_id;
  var staff_name = req.body.staff_name;
  // console.log("TeSt: "+ staff_name);
  // console.log("TEsT: "+ staff_id);
  var connection = new MySql({
    host: 'localhost',
    user: 'root',
    password: 'passwordformysql',
    database: 'pc_world'
  });
  
  //console.log('UPDATE staff SET fName = (?) WHERE staffID=(?);',[staff_id, staff_name])
  connection.query("UPDATE staff SET fName = (?) WHERE staffID=(?);", [staff_name, staff_id]);
  res.redirect("/products");
});


module.exports = router;
