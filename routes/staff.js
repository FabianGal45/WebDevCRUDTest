var express = require('express');
var router = express.Router();
var MySql = require('sync-mysql');

//get = show data
router.get('/', function(req, res, next) { 
  //res.render('staff', { title: 'Staff Members' });
  var connection = new MySql({
    host: 'localhost',
    user: 'root',
    password: 'passwordformysql',
    database: 'staff_todos'
  });
  var staff_members = connection.query('SELECT * FROM staff;');
  console.log(staff_members);
  // console.log("TEST: "+staff_members[1].fName);
  
  res.render('staff', {
    title: 'Staff Members',
    staff_members: staff_members
  });
});

router.get('/another_page', function(req, res, next){
  res.render("another_page", {
    title: 'Another Page'
  })

});

router.get('/update', function(req, res, next){ //or it can be edit
  var staff_id = req.query.staff_id;
  //console.log(staff_id);//check the id of the staff name/member

  res.render("update", { //name of the ejs file
    title: 'Update staff',
    staff_id: staff_id
  });
});


//post = take in data
//res is what we want when comming out
router.post('/add', function(req, res, next){ 
  var connection = new MySql({
    host: 'localhost',
    user: 'root',
    password: 'passwordformysql',
    database: 'staff_todos'
  });

  connection.query('INSERT INTO staff(fName) VALUES (?)', [req.body.staff_name]);

  console.log(req.body.staff_name);  
  res.redirect("/staff");
});

router.post('/delete', function(req, res, next){
  var connection = new MySql({
    host: 'localhost',
    user: 'root',
    password: 'passwordformysql',
    database: 'staff_todos'
  });
  var delete_id = req.body.staff_id;//takes the staff_id from the html file
  connection.query('DELETE FROM staff WHERE staffID=(?);', [delete_id]);//we need to have the variable in square brackets as there can be multiple questrion marks in the query
  res.redirect("/staff"); //go back to the /staff page to start again.
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
    database: 'staff_todos'
  });
  
  //console.log('UPDATE staff SET fName = (?) WHERE staffID=(?);',[staff_id, staff_name])
  connection.query("UPDATE staff SET fName = (?) WHERE staffID=(?);", [staff_name, staff_id]);
  res.redirect("/staff");
});


module.exports = router;
