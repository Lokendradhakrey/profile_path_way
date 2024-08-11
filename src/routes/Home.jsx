import React from "react";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
// import userPost from "../assets/images/resume1.jpeg";
import userProfileImg from "../assets/images/userProfile.avif"

function Home() {
  return (
    <div style={{backgroundColor:"#c7cdd6"}}>
      <Navbar />
      <Post userProfileImg={userProfileImg} altText="Description of the image" />
    </div>
  );
}

export default Home;
