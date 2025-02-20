const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User'); // Import User model
const http = require('http');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = "mongodb+srv://isaacY:Yy0573115272@cluster0.dsb75.mongodb.net/isaacY?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('Error connecting to MongoDB Atlas:', error));
   
// Route to fetch all usersJ
app.get('/posts', async (req, res) => {
  try {
    const users = await User.find();  // Fetch all users from DB
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

// Route to fetch a single user
app.get('/user/:id', async (req, res) => {
  try {
    const id = req.params.id; // Keep it as a string
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
});

// route to add a new post
app.post('/add', async (req, res) => {
  try {
    const { name, lastName, age } = req.body;

    if (!name || !lastName || !age) {
      return res.status(400).json({ message: 'All fields (name, lastName, age) are required' });
    }

    const newUser = new User({ name, lastName, age });
    await newUser.save();

    res.status(201).json({ message: 'User added successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error adding user', error: error.message });
  }
});

// Route to update a user
app.patch('/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { name, lastName, age } = req.body;

    // Check if ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const updatedUser = await User.findByIdAndUpdate(id, { name, lastName, age }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);

  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
});

// Route to delete a single user
app.delete('/delete/:id', async (req, res) => {
  try {
    const  id  =  (req.params.id);
     
    
    // Check if ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});



app.listen(3000, () => console.log('Server is running on port 3000'));
