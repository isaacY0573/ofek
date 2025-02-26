import { FaTrash } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Container,
  Paper,
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
    window.scrollTo({ top: 0, behavior: "smooth" });
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

      setPosts(posts.map((post) => (post._id === editingPost._id ? editingPost : post)));
      setEditingPost(null);
      setError("");
    } catch (error) {
      console.error("Error updating post:", error);
      setError("Failed to update post.");
    }
  };


  //deleting new posts
  const handleDelete = async (postId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/delete/${postId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete post");

      // Remove the deleted post from state
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };




  return (
    <>
      <Header />
      <Container maxWidth="md" className="mt-[50px]">
        <Typography variant="h4" gutterBottom align="center">
          Edit Posts
        </Typography>

        {editingPost && (
          <Paper elevation={3} className="p-6 mb-6">
            <Typography variant="h5" gutterBottom>
              Editing: {editingPost.name} {editingPost.lastName}
            </Typography>
            <TextField
              label="First Name"
              name="name"
              value={editingPost.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={editingPost.lastName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Age"
              type="number"
              name="age"
              value={editingPost.age}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button variant="contained" color="primary" onClick={handleUpdate} fullWidth>
              Save Changes
            </Button>
          </Paper>
        )}

        {posts.map((post) => (
          <Card key={post._id} className="mb-4 shadow-lg">
            <CardContent>
              <Typography variant="h6">
                {post.name} {post.lastName}
              </Typography>
              <Typography className="p-4" variant="body2">
                Age: {post.age}
              </Typography>
              <div className="flex justify-center gap-2">
                <Button
                  variant="outlined"
                  color="primary"
                  className="m-2"
                  onClick={() => handleEditClick(post)}
                  style={{ textTransform: "none", borderRadius: "8px" }}
                >
                  Edit
                </Button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded-lg shadow-md transition-all duration-300"
                >
                  <FaTrash className="text-white text-sm" />
                  Delete
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </Container>
    </>
  );
};

export default EditPost;
