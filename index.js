const express = require('express');
const { rootRouter } = require('./Routes');

const app = express();
const cors = require('cors');

app.use(express.json())
app.use(cors());
app.use('/api/v1', rootRouter);


const port = 3000;

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})