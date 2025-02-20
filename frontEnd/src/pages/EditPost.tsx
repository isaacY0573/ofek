import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Container,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";

const EditPost: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Ensure id is received as a string
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const postId = Number(id);
    if (isNaN(postId)) {
      navigate("/"); // Redirect to home if 'id' is invalid
      return;
    }

    const posts = JSON.parse(localStorage.getItem("posts") ?? "[]");
    const post = posts.find((post: { id: number }) => post.id === postId);

    if (post) {
      setName(post.name);
      setLastName(post.lastName);
      setAge(String(post.age)); // Ensure age is a string for controlled input
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  const handleSubmit = () => {
    if (!name || !lastName || !age) {
      setError("All fields are required.");
      return;
    }

    const postId = Number(id);
    if (isNaN(postId) || postId <= 0) {
      setError("Invalid post ID.");
      return;
    }

    if (isNaN(Number(age)) || Number(age) <= 0) {
      setError("Age must be a positive number.");
      return;
    }

    setError("");

    const updatedPost = {
      id: postId,
      name,
      lastName,
      age: Number(age),
    };

    const existingPosts = JSON.parse(localStorage.getItem("posts") ?? "[]");
    const postIndex = existingPosts.findIndex((post: { id: number }) => post.id === postId);

    if (postIndex !== -1) {
      existingPosts[postIndex] = updatedPost;
      localStorage.setItem("posts", JSON.stringify(existingPosts));
    }

    navigate("/");
  };

  return (
    <>
      <Header />
      <Container className="mt-[100px]">
        <Card>
          <CardContent>
            <TextField
              label="First Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              fullWidth
              margin="normal"
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default EditPost;
