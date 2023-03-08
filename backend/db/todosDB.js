import { MongoClient, ObjectId } from "mongodb";

const uri = "mongodb+srv://Mariano:zR1JJcKqLANDjkrp@todoapp.xvrm8zl.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const dbName = "TODOapp";
const todosColl = "todos";
const database = client.db(dbName);
const collection = database.collection(todosColl);

client.connect();

export default {
  async Get(id) {
    try {
      return collection.find({ _id : new ObjectId(id)}).toArray();
    } catch (error) {
      return false;
    }
  },
  
  async Insert(title) {
    try {
      const { insertedId } = await collection.insertOne({ title, tasks: [] });
      return insertedId.toString();
    } catch (error) {
      throw new Error(error)
    }
  },
  
  async GetAll(idsArray) {
    if(!idsArray.length) return [];
    
    const normIds = idsArray.map((id) => new ObjectId(id));

    try {
      return collection.find({ _id : { $in: normIds }}).toArray()
    } catch (error) {
      throw new Error(error);
    }
  },
  
  async Delete(id) {
    try {
      collection.deleteOne({ _id : new ObjectId(id)});
      return true
    } catch (error) {
      throw new Error(error)
    }
  },
  
  async Update(id, update) {
    try {
      collection.updateOne({ _id : new ObjectId(id) }, update);
    } catch (error) {
      throw new Error(error)
    }
  },
  
  async UpdateTask(id, task) {
    try {
      await collection.updateOne(
        { _id : new ObjectId(id), 'tasks._id' : task._id  }, 
        { $set : { 'tasks.$' : task  }  });
      return collection.find({ _id : new ObjectId(id)}).toArray();
    } catch (error) {
      throw new Error(error)
    }
  },

  async PushTask(id, task) {
    task._id = new ObjectId(32);
  
    try {
      await collection.updateOne({_id: new ObjectId(id)}, {$push: {tasks : task}});
      return collection.find({ _id : new ObjectId(id)}).toArray();
    } catch (error) {
      throw new Error(error)
    }
  },

  async PullTask(id, taskId) {  
    try {
      await collection.updateOne(
        { _id : new ObjectId(id) },
        { $pull : { tasks : { _id : new ObjectId(taskId)}}});
      return collection.find({ _id : new ObjectId(id)}).toArray();
    } catch (error) {
      throw new Error(error)
    }
  }
}