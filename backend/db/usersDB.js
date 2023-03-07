import { MongoClient } from "mongodb";

const uri = "mongodb+srv://Mariano:zR1JJcKqLANDjkrp@cluster0.i9q8rjg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const dbName = "test";
const usersColl = "users";
const database = client.db(dbName);
const collection = database.collection(usersColl);

client.connect()

export default {
  async Insert(user) {
    try {
      await collection.insertOne(user);
    } catch (error) {
      throw new Error(error);
    }
  },
  async Get(email) {
    try {
      return await collection.find({ email }).toArray();
    } catch (error) {
      throw new Error(error);
    }
  },
  async PushTodo(email, todoId) {
    try {
      await collection.updateOne({ email }, {$push: { todos: todoId }});
      return await collection.find({ email }).toArray();
    } catch (error) {
      throw new Error(error);
    }
  },
  async PullTodo(email, todoId) {
    try {
      await collection.updateOne({ email }, {$pull: { todos: todoId }});
      return await collection.find({ email }).toArray();
    } catch (error) {
      throw new Error(error);
    }
  }
}