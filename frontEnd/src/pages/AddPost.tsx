import React from "react"; // Explicitly import React
import { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // import useNavigate
import Header from "../components/Header";

const AddPost: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setAge] = useState<string>(""); // Store as string initially
  const [id, setId] = useState<string>(""); // Store as string initially
  const [error, setError] = useState<string>("");

  const navigate = useNavigate(); // initialize navigate

  const handleSubmit = () => {
    if (!name || !lastName || !age || !id) {
      setError("All fields are required.");
      return;
    }
    setError("");

    // Create the new post
    const newPost = {
      id: Number(id), // Convert to number
      name,
      lastName,
      age: Number(age), // Convert to number
    };

    // Get current posts from localStorage or initialize with an empty array
    const existingPosts: typeof newPost[] = JSON.parse(
      localStorage.getItem("posts") ?? "[]"
    );

    // Save the new post to localStorage
    existingPosts.push(newPost);
    localStorage.setItem("posts", JSON.stringify(existingPosts));

    // Navigate back to the home page after the post is added
    navigate("/");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
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
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              fullWidth
            >
              Submit
            </Button>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default AddPost;
