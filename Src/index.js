import connectDB from './DB/db.js'
import {app} from './app.js' 
import dotenv from 'dotenv'
dotenv.config({path:'./env'})



console.log("object",`${process.env.MONGO_URI}`);


connectDB()
.then(()=>{
    app.listen(`${process.env.PORT}`,()=>{
        console.log(`Server started @ ${process.env.MONGO_URI}`)
    })
})
.catch((err)=>{
    console.log(ServerErr,err);
})