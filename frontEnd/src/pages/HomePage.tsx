import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import PersonCard from "../components/Card";

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Array<{ id: number; name: string; lastName: string; age: number }>>([]);

  useEffect(() => {
    const savedPosts = localStorage.getItem("posts"); // Get the item from localStorage
    const parsedPosts = savedPosts ? JSON.parse(savedPosts) : []; // Parse only if it's not null
    setPosts(parsedPosts);
  }, []);

  return (
    <>
      <Header />
      <div className="bigDivPosts">
        {posts.map((post, index) => (
          <div key={`${post.id}-${index}`}>
            <PersonCard card={post} />
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;
