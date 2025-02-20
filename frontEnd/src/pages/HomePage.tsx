import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import PersonCard from "../components/Card";

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Array<{ _id: string; name: string; lastName: string; age: number }>>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/posts"); // Adjust URL if needed
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        setPosts(data); // Store in state
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Header />
      <div className="bigDivPosts">
        {posts.map((post) => (
          <div key={post._id}>
            <PersonCard card={post} />
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;
