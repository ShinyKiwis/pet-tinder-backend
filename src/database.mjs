import { MongoClient, ServerApiVersion } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();

const DBNAME = "pet-tinder";

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

await client.connect();
const db = client.db(DBNAME);
const collection = db.collection("users");

export async function createUser(username, password) {
  const user = {
    username: username,
    password: password,
    bio: "",
    loved: [],
    adopted: [],
  };
  const isExisted = await collection.countDocuments({ username: username });
  if (isExisted == 0) {
    await collection.insertOne(user);
    return true;
  } else {
    return false;
  }
}

export async function getUser(username, password) {
  const user = await collection.findOne({ username: username });
  if (user.username === username && user.password === password) {
    return user;
  }
  return {
    "ERROR": "Invalid Credentials"
  };
}
