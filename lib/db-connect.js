import mongoose from 'mongoose';

// windows is available in browser
// like windows we have global variable in node env

global.mongoose = {
  conn: null,
  promise: null,
};

export async function dbConnect() {
  if (global.mongoose && global.mongoose.conn) {
    return global.mongoose.conn;
  } else {
    const user = process.env.MONGODB_USER;
    const password = process.env.MONGODB_PASSWORD;
    const database = process.env.MONGODB_DATABASE;
    mongoose.set('strictQuery', false)
    const connString = `mongodb+srv://${user}:${password}@cluster0.0wvfift.mongodb.net/${database}?retryWrites=true&w=majority`
    const promise = mongoose.connect(connString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
    }).then(mongoose => mongoose);

    global.mongoose = {
        conn: await promise,
        promise,
    }

    return await promise

  }
}
