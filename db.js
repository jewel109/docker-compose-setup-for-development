import mongoose from "mongoose";

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB
} = process.env;
export const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
export const options = {
  useNewUrlParser: true,
  connectTimeoutMS: 10000,
};


export const db = async () => {
  try {

    const conn = mongoose.connect(url, options)
    console.log('connected to db')
  } catch (error) {
    console.log(error)
  }

}
