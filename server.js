const express = require("express")
const app = experss()
const morgan = require("morgan")
const mongoose = require("mongoose")


app.use(express.json())
app.use(morgan("dev"))


// connect to DB

mongoose.connect("mongodb://localhost:27017/projectdb",
    {
        userNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    () => console.log("Connected to DB")
)


//middleware

app.use("/projects", (req, res, next) => {
    console.log("The items Middleware was executed")
    next()
})

//routes

app.use("/projects", require("./routes/projectRouter.js"))
// error handler

app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})

app.listen(7001, () => {
    console.log("The server is running on Port 7001")
})