const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const url = "mongodb://localhost:27017/keepapp"
mongoose.connect(url)
    .then(() => {
        console.log("connection sucessfull")
    })
    .catch((error) => {
        console.log(error)
    })
