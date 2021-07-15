const express = require('express');
const handlebars = require('express-handlebars');

const app = express();

app.use(
  express.urlencoded({
    extended: true
  })
)


// setup handlebars
app.set('view engine', 'hbs');


// using main.hbs as a default layout
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'main'
}));


app.use(express.static('public'));



// customers data | if you didn't add "customers" to the begin of json , you will not able to chandle it in views

// as mentioned in exercise : "customers" object , and that what i did
let jsonData={"customers":[

{ "id": "_4FG12Y7U6", "company": "Avionics Inc.", "firstname": "John", "lastname": "Doe", "entered": "2013-06-12T10:00:00Z" },

{ "id": "_4FG12Y7TX", "company": "Avis World Headquarters", "firstname": "Steve", "lastname": "Herbin", "entered": "2013-09-10T10:00:00Z" },

{ "id": "_4FG12Y7TV", "company": "BGP Productions", "firstname": "German", "lastname": "Vicencio", "entered": "2013-09-30T12:46:40Z" }

]};


// setup a route for home.hbs template view
app.get('/', (req, res) => {
    // Integrates the body of "home.hbs" inside the defaultLayout "main.hbs"
    res.render('home',jsonData);
});

// server listen port
const port = 3000;


// run server
app.listen(port, () => console.log(`App listening to port ${port}`));


