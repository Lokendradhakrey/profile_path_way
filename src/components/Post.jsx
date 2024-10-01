import React, { useEffect } from "react";
import "../assets/css/post.css";
import axios from "axios";
import { format } from "date-fns";
import { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";

function Post({ altText, userProfileImg }) {
  const [likes, setLikes] = useState(27);
  const [comments, setComments] = useState(13);
  const [isSaved, setIsSaved] = useState(false);
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLiked(!isLiked);
      setLikes(likes - 1);
    } else {
      setLiked(!isLiked);
      setLikes(likes + 1);
    }
  };
  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleComment = () => {
    setComments(comments + 1);
  };

  useEffect(() => {
    // Fetch data from API
    axios
      .get("http://localhost:8080/profile-path-way/v1/post/all-posts")
      .then((response) => {
        setPostData(response.data); // Set data state with the fetched data
        setLoading(false); // Set loading to false
      })
      .catch((error) => {
        setError(error.message); // Set error state with the error message
        setLoading(false); // Set loading to false
      });
  }, []);

  if (loading) {
    return (
      <div class="d-flex justify-content-center align-items-center vh-100">
        <div class="spinner-grow" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center">Error: {error}</div>;
  }

  return (
    <>
      {postData.map((post) => {
        const rawDate = post.date;
        const formattedDate = format(new Date(rawDate), "dd-MM-yyyy");
        return (
          <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md overflow-hidden my-8">
            {/* User Info */}
            <div className="flex items-center p-4">
              <img
                src={userProfileImg}
                alt={altText}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <h2 className="font-semibold text-lg">{post.user.username}</h2>
                <p className="text-gray-500 text-sm">{formattedDate}</p>
              </div>
            </div>

            {/* Post Content */}
            <p className="px-4 py-2 text-gray-800">{post.content}</p>

            {/* Post Image */}
            {post.file && (
              <img
                src={post.fileUrl}
                alt="Post content"
                className="w-full h-auto object-cover"
              />
            )}

            {/* Interaction Buttons */}
            <div className="flex justify-between items-center px-4 py-3 border-t border-gray-200">
              <div className="flex space-x-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-1 ${
                    isLiked ? "text-red-500" : "text-gray-500"
                  }`}
                >
                  <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                  <span>{likes}</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-500">
                  <MessageCircle size={20} />
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-500">
                  <Share2 size={20} />
                </button>
              </div>
              <button
                onClick={handleSave}
                className={`${isSaved ? "text-blue-500" : "text-gray-500"}`}
              >
                <Bookmark size={20} fill={isSaved ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Post;
