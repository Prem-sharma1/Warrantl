const express=require('express');
const app=express();
const bodyParser=require('body-parser')
const cors=require('cors')
const AuthRoute=require('./Router/AuthRoute')
require('dotenv').config();
require('./models/Db');
const PORT=process.env.PORT||8080
app.get('/ping',(req,res)=>{
 res.send('pong');
});
app.use(bodyParser.json())
app.use(cors());
app.use('/auth',AuthRoute);

app.listen(PORT,()=>{
console.log(`Server is listen on ${PORT}`)
})