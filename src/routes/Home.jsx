import React from "react";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import userPost from "../assets/images/post1.webp";
import userProfileImg from "../assets/images/userProfile.avif"

function Home() {
  return (
    <>
      <Navbar />
      <Post userPostSrc={userPost} userProfileImg={userProfileImg} altText="Description of the image" />
    </>
  );
}

export default Home;
