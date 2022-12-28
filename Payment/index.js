const mongoose = require("mongoose");

require('dotenv').config();
const app = require("./app");

const port = process.env.PORT;
const server = app.listen(port,()=> {
    console.log(`Server running on port: ${port}`);
});

process.on('uncaughtException',err=>{
    console.log('UNCAUGHT EXCEPTION!!!');
    console.log(err.name,err.message);
    process.exit(1);
})

process.on('unhandledRejection',err => {
    console.log(err);
    console.log('UNHANDELED REJECTION!!');
    console.log(err.name,err.message);
    server.close(()=>{
        process.exit(1);
    });
})
