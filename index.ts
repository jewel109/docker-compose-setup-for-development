import express from "express";
import { db } from "./db.ts";
import { User } from "./userModel.ts";
import { Kafka } from "kafkajs";
import { createClient } from "redis";

const { SERVER_PORT, KAFKA_HOST } = process.env
console.log(KAFKA_HOST)

// FIXME
console.log(SERVER_PORT)
const app = express()

app.use(express.json())
db()

async function conn() {
  try {
    const kafka = new Kafka({
      clientId: 'my-app',
      brokers: [`${KAFKA_HOST}:9092`],
    })
    const producer = kafka.producer();
    await producer.connect();
    console.log("connected kafka")

    const redisClient = createClient({
      url: "redis://redis:6379"

    })
    console.log("redis connnected")

  } catch (error) {

    console.log(error)
  }
}
conn()
app.post('/users', async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const users = await User.find({ name, email, age });
    if (users.length !== 0) {
      console.log(users)
      return res.status(401).json({ msg: "user already exist" });

    } else if (users) {
      const newUser = new User({ name, email, age });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);

    }

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error creating user", error });
  }
});

app.delete('/delete', async (req, res) => {

  const data = await User.deleteMany({})
  res.status(200).json({ msg: "deleted" })
})

// GET /users - Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving users", error });
  }
});

app.listen(SERVER_PORT, () => {
  console.log(`server is running on port ${SERVER_PORT} `)
})
