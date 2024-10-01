import React from "react";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import userProfileImg from "../assets/images/userProfile.avif"
import ClaudePost from "../components/ClaudePost";

function Home() {
  return (
    <div style={{backgroundColor:"#c7cdd6"}}>
      <Navbar />
      <Post userProfileImg={userProfileImg} altText="Description of the image" />
    </div>
  );
}

export default Home;
