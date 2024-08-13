import React, { useEffect } from "react";
import "../assets/css/post.css";
import axios from "axios";
import { format } from "date-fns";
import { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

function Post({ altText, userProfileImg }) {
  const [likes, setLikes] = useState(27);
  const [comments, setComments] = useState(13);
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let liked = true;

  const handleLike = () => {
    if(liked){
      liked = false;
    }else{
      liked = true;
    }
    setLikes(likes + 1);
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {postData.map((post) => {
        const rawDate = post.date;
        const formattedDate = format(new Date(rawDate), "dd-MM-yyyy");
        return (
          <div className="bg-gray flex flex-1 items-center justify-center px-4">
            <div className="pt-6">
              <div className="user-post mb-6 shadow-gray-500 shadow-lg rounded-lg">
                <div className="post-header flex justify-between align-center p-2 bg-[#f8fafc] border border-neutral-950 rounded-t-lg">
                  <div className="user-profile-img-box w-12 h-12 flex align-center">
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="inline-block h-10 w-10 rounded-full ring-2"
                    />
                    <div className="ps-2">
                      <div className="username text-lg">
                        {post.user.username}
                      </div>
                      <p className="font-light">{formattedDate}</p>
                    </div>
                  </div>
                  <div className="dropdown">
                    <button
                      className="btn"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="bi bi-three-dots"></i>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item text-danger" href="">
                          Delete
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="post-content pb-2 italic px-2 bg-[#f8fafc]">
                  {post.content}
                </div>
                <img
                  alt={altText}
                  src={post.fileUrl}
                  className="h-full w-full object-cover object-center"
                />
                <div className="flex justify-between p-3">
                  <button onClick={handleLike}>
                    {liked?<i class="bi bi-hand-thumbs-up hover:text-green-200"></i>:<i className="bi bi-hand-thumbs-up-fill me-1 hover:text-green-200"></i>}
                    {likes}
                  </button>
                  <button onClick={handleComment}>
                    <i className="bi bi-chat me-1 hover:text-green-200"></i>
                    {comments}
                  </button>
                  <button>
                    <i className="bi bi-arrow-down hover:text-green-200"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Post;
