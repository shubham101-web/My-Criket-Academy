const express = require("express");
const path = require('path');
const app = express();
var mongoose = require('mongoose')
const bodyparser = require('body-parser')
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser :true});
const port = 8000;

// define mongoose Schema
var contactSchema = new mongoose.Schema({
    name : String,
    phone : String,
    email : String,
    address : String,
    desc : String
});


var Contact = mongoose.model('Contact', contactSchema)


// yha per "/static" file ka name he or ,express.static(folder ka naam he)//

app.use('/static', express.static('static'))

//ye middleware helpkrta he form ke data ko express tk lanne ke liye
app.use(express.urlencoded())

// set the pug template
app.set('view engine', 'pug')

//set views directory

app.set('views', path.join(__dirname, 'views'))

// our pug demo endpoint
app.get('/',(req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params)

})

app.post('/contact',(req, res)=>{
    var myData = new Contact(req.body)
    myData.save().then(()=>{
        res.send("this item has been saved to the  database")
    }).catch(()=>{
        res.status(400).send("item  was not saved to the datanase ")
    })
    // res.status(200).render('contact.pug')

});


app.get('/contact',(req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params)

})


app.listen(port, ()=>{
    console.log(`the application started sucessfully on port ${port}`);
})
