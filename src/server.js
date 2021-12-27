const express = require('express');
const app = express();
const {sequelize,bullapi} =require('../models')
const data = require('../jobs/redisJob')



app.get('/',(req,res)=>{
    res.send("hello world")
});

app.use(data)



app.get('/api-1',(req,res)=>{
    res.send("you hit api-1")
})

app.get('/api-2',(req,res)=>{
    res.send("you hit api-2")
})

app.listen({port: 3000},async()=>{
    console.log('Server up at http://localhost:3000/')
    await sequelize.authenticate()
    console.log('Database connected!');

})
module.exports = app
