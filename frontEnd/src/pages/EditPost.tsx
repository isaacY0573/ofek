import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Container,
} from "@mui/material";
import Header from "../components/Header";

interface Post {
  _id: string;
  name: string;
  lastName: string;
  age: number;
}

const EditPost: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/posts");
        if (!response.ok) throw new Error("Failed to fetch posts");

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleEditClick = (post: Post) => {
    setEditingPost(post);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingPost) {
      setEditingPost({ ...editingPost, [e.target.name]: e.target.value });
    }
  };

  const handleUpdate = async () => {
    if (!editingPost || !editingPost.name || !editingPost.lastName || !editingPost.age) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/update/${editingPost._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editingPost.name,
          lastName: editingPost.lastName,
          age: Number(editingPost.age),
        }),
      });

      if (!response.ok) throw new Error("Failed to update post");

      // Update the UI
      setPosts(posts.map(post => (post._id === editingPost._id ? editingPost : post)));
      setEditingPost(null);
      setError("");
    } catch (error) {
      console.error("Error updating post:", error);
      setError("Failed to update post.");
    }
  };

  return (
    <>
      <Header />
      <Container className="mt-[100px]">
        <Typography variant="h4" gutterBottom>
          Edit Posts
        </Typography>
        {posts.map(post => (
          <Card key={post._id} className="mb-4">
            <CardContent>
              <Typography variant="h6">{post.name} {post.lastName}</Typography>
              <Typography variant="body2">Age: {post.age}</Typography>
              <Button variant="outlined" color="primary" onClick={() => handleEditClick(post)}>
                Edit
              </Button>
            </CardContent>
          </Card>
        ))}

        {editingPost && (
          <Card className="mt-4">
            <CardContent>
              <TextField label="First Name" name="name" value={editingPost.name} onChange={handleChange} fullWidth margin="normal" />
              <TextField label="Last Name" name="lastName" value={editingPost.lastName} onChange={handleChange} fullWidth margin="normal" />
              <TextField label="Age" type="number" name="age" value={editingPost.age} onChange={handleChange} fullWidth margin="normal" />
              {error && <Typography color="error">{error}</Typography>}
              <Button variant="contained" color="primary" onClick={handleUpdate} fullWidth>
                Save Changes
              </Button>
            </CardContent>
          </Card>
        )}
      </Container>
    </>
  );
};

export default EditPost;
