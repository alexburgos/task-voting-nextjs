import mongoose from 'mongoose'

// Next.js middleware to connect to mongo db (mongo should be running)
const connectDb = handler => async (req, res) => {
  if (mongoose.connections[0].readyState) return handler(req, res)
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/planning-poker',
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
      }
    )
    return handler(req, res)
  } catch (error) {
    console.log('Is Mongo running?');
    console.error(error);
    throw error;
  }
}


export default connectDb
