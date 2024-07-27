import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const mongoURI: any = process.env.MongoDB_URL ;
type connectionObject = {
  isConnected?: number | boolean;
};

const connection: connectionObject = {};


async function dbConnect() {
  if (connection.isConnected) {
    console.log("already connected");
    return;
  }
  try{

  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("use previous connection");
      return;
    }
    await mongoose.disconnect();
  }
  if (!mongoURI || typeof mongoURI !== 'string') {
    throw new Error('MONGODB_URI environment variable is not defined or is not a string.');
}
  const db = await mongoose.connect(mongoURI as string);
  connection.isConnected = db.connections[0].readyState;

  console.log("new connection");

}catch(err){
  console.error("coonection failed ",mongoURI,err)
}
}


// const db = { connect, disconnect };
export default dbConnect;