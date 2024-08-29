import { MongoClient } from "mongodb";

const connectionString = "mongodb+srv://ksidarth16:GE7Q7kUeCDQ1HRMf@cluster0.ivmq01x.mongodb.net/"

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("lab-data");

export default db;