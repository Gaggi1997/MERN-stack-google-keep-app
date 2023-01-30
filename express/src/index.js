const express = require('express')
const app = express();
const port = 8000;
var cors = require('cors')
require('./db')
app.use(cors())
app.use(express.json())
// app.get('/' , (req , res) => {
//     res.send("hello gaggi")
// })
//Routes
app.use('/api/auth' , require('./routes/auth'))
app.use('/api/notes' , require('./routes/notes'))
app.listen(port , () => {
    console.log("listening to port " + port )
})