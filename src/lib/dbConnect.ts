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
