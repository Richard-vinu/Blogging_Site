const express = require('express')
let route = require('./src/router/router')
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');
const PORT = 3000
const app = express();

app.use(bodyParser.json());

mongoose.connect("mongodb+srv://manaskumar:iFVJhjYrsH7iars8@cluster0.s4pqkzd.mongodb.net/Project1?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);


app.listen(process.env.PORT || PORT, function () {
    console.log('Express app running on port ' + (process.env.PORT || PORT))
});  
