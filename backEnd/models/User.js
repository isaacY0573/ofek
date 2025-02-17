require("dotenv").config();
const mongoose = require("mongoose");

// Define your user schema and model
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);

// Sample data
const users = [
  { username: "user1", email: "user1@example.com", password: "hashedpassword1", role: "user" },
  { username: "user2", email: "user2@example.com", password: "hashedpassword2", role: "user" },
  { username: "user3", email: "user3@example.com", password: "hashedpassword3", role: "user" },
  { username: "user4", email: "user4@example.com", password: "hashedpassword4", role: "user" },
  { username: "user5", email: "user5@example.com", password: "hashedpassword5", role: "user" },
  { username: "admin1", email: "admin1@example.com", password: "hashedpassword6", role: "admin" },
  { username: "user6", email: "user6@example.com", password: "hashedpassword7", role: "user" },
  { username: "admin2", email: "admin2@example.com", password: "hashedpassword8", role: "admin" },
  { username: "user7", email: "user7@example.com", password: "hashedpassword9", role: "user" },
  { username: "user8", email: "user8@example.com", password: "hashedpassword10", role: "user" },
];

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connected to MongoDB Atlas");

    // Insert multiple users into the database
    await User.insertMany(users);
    console.log("Users inserted");

    // Close the connection after the insert operation
    mongoose.connection.close();
  })
  .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));
