const express = require('express');
const { rootRouter } = require('./Routes');

const app = express();
const cors = require('cors');

app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173", "https://your-frontend.vercel.app"], 
    credentials: true,  
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization"
  }));
  
app.use('/api/v1', rootRouter);


const port =  process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})