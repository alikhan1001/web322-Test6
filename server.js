// setup server
const express = require('express');
const handlebars = require('express-handlebars');

const app = express();
app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(express.json());

// setup handlebars
app.set('view engine', 'hbs');
// main.hbs is the default layout
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/',
    extname: 'hbs',
    defaultLayout: 'main'
}));
app.use(express.static('public'));

// serve the form page
app.get('/', (req, res) => {
    res.render('form');
});

// validition when post to /validate-form
app.post('/validate-form', (req, res) => {
    // errors array will contains all errors
    let errors=[];

  	// get name value
    let name= req.body["name"];
    
    // get email value
    let email= req.body["email"];
    
    // get copy value | we won't need it in this exercise
    let copy= req.body["copy"];
    
    // get messagevalue
    let message= req.body["message"];


    // regular expression for email validation 
    var emailExp=/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;


	// check if null or empty ,error if not met the creteria
    if(name==null || name=="") {
    //push error message to array
      errors.push({"error":"name is not valid"});
    }
    
    // check if null or empty and verify email if match with regular expression, error if not met the creteria
    if(email==null || email=="" || !(email.match(emailExp))) {
    // //push error message to array
      errors.push({"error":"email is not valid"});
    }
    
    
// check if null or empty and check if length if message length is at least 10 , error if not met the creteria
    if(message==null || message=="" || message.length<10) {
    ////push error message to array
      errors.push({"error":"message is not valid"});
    }
    
    // return response with errors array
    res.json(errors);

});

// run the server to listen to port 3000
app.listen(3000, () => {
  console.log('server started');
});
