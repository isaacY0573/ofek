import React, { useState, useEffect } from 'react';
import { TextField, Button, Card, CardContent, Typography, Container } from '@mui/material';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const AddPost: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [age, setAge] = useState<string>(''); 
  const [id, setId] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [post, setPost] = useState();

  const navigate = useNavigate(); // initialize navigate

  const handleSubmit = async () => {
    if (!name || !lastName || !age || !id) {
      setError('All fields are required.');
      return;
    }
    setError('');

    // Create the new post
    const newPost = {
      id: Number(id), 
      name,
      lastName,
      age: Number(age),
    };

    // Send POST request to backend to add the post
    try {
      const response = await fetch('http://localhost:3000/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      const data = await response.json();
      if (data.message === 'User added successfully') {
        // Navigate to home page after post is added
        navigate('/');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Error adding post');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <>
      <Header />
      <Container className="mt-[100px]">
        <Card>
          <CardContent>
            <TextField
              label="Id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              fullWidth
              margin="normal"
              onKeyDown={handleKeyDown}
            />
            <TextField
              label="First Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
              onKeyDown={handleKeyDown}
            />
            <TextField
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
              margin="normal"
              onKeyDown={handleKeyDown}
            />
            <TextField
              label="Age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              fullWidth
              margin="normal"
              onKeyDown={handleKeyDown}
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
              Submit
            </Button>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default AddPost;
