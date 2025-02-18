const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User'); // Import User model
const http = require('http');

const app = express();
const uri = "mongodb+srv://isaacY:Yy0573115272@cluster0.dsb75.mongodb.net/isaacY?retryWrites=true&w=majority&appName=Cluster0";


// Connect to MongoDB
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('Error connecting to MongoDB Atlas:', error));
   
// Route to fetch all usersJ
app.get('/', async (req, res) => {
  try {
    const users = await User.find();  // Fetch all users from DB
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

// Route to delete a single user
app.delete('/delete/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser){
     return  res.status(404).json({ message: 'User not found' });
  }
  res.json({ message: 'User deleted successfully', deletedUser });

  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
});





app.listen(3000, () => console.log('Server is running on port 3000'));
