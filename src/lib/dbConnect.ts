// import { connect } from "http2";
// import mongoose from "mongoose";

// type ConnectionObject =  {
//     isConnected?:number
// }

// const connection : ConnectionObject = {}

// async function dbConnect(): Promise<void> {
//     if(connection){
//         console.log("Already connected to the database");
//         return
//     }
//     try{
//        const db =  await mongoose.connect(process.env.MONGODB_URI||'',{})
//         connection.isConnected = db.connections[0].readyState
//         console.log("DB Connected successfully");
//     }catch(error){

//         console.log("DB is not connected",error)
//         process.exit()
//     }
// }

// export default dbConnect;

import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log("MongoDb conneceted suucessfully");
        })

        connection.on('error',(err)=>{
            console.log('MongoDB connection error. PLease make sure MongoDB is running.' +err)
            process.exit();

        })
    }catch(error){
        console.log('Something went Wrong!');
        console.log(error);

    }
}