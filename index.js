const express = require("express")
const app = express()
const mongoose = require('mongoose')
const record = require('./src/routes/record')
const router = require('./src/routes/users')
const cors = require('cors')
const auth= require('./src/middleware/auth')
const port = process.env.PORT || 3000


app.get("/", (req, res) => {
  res.send({ message: "Hello World!" })
})

app.use(cors({
        origin: "https://crud-angular-ap.herokuapp.com"
    })
    )
app.use('/record',auth.auth, record);
app.use('/users', router);
const url = `mongodb+srv://nithinvisva:visuakc6999@crudapp.ubtykah.mongodb.net/?retryWrites=true&w=majority`;

const connectionParams={
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

app.listen(port, () => {
  console.log(`Example app listening at Port: ${port}`)
})