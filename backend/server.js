const LinkRouter = require("./routes/LinkRouter");
const UserRouter = require("./routes/UserRouter");
const mongoose=require('mongoose')
const app=require('express')()
const jbp=require('body-parser').json()
const cors=require('cors')()
const urle=require('body-parser').urlencoded({ extended: false })
const port=8000

app.use(jbp)
app.use(cors)
app.use(urle)
app.use(UserRouter)
app.use(LinkRouter)

mongoose.connect('mongodb://localhost:27017/Shawtly').then(()=>{
    console.log("Successfully Connected")
}).catch(()=>{
    console.log("Could not connect")
})

app.listen(port,()=>{
    console.log('Shawtly is ready to shorten')
})