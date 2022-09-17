const express = require('express');
const userRoute = require('./routes/v1/userRoute');
const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;
app.use('/user',userRoute);
app.all('*',(req,res)=>{
    res.send('No Routes Found')
});
app.listen(port,()=>{
    console.log('server is running on port',port)
});