const express = require('express')
let route = require('./src/router/router')
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');
const PORT =  process.env.PORT || 3000
const app = express();

app.use(bodyParser.json());

mongoose.connect("mongodb+srv://richardwork:2YLjcp0favzUASR9@cluster3.bli4t.mongodb.net/RichardProject?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);


app.listen( PORT, function () {
    console.log(`Server is  running on port  ${PORT}`)
});  
