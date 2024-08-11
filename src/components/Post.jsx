import React, { useState, useEffect } from "react";
import "../assets/css/post.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import { format } from "date-fns";

function Post({ altText, userProfileImg }) {
  const [likes, setLikes] = useState(27);
  const [comments, setComments] = useState(13);
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLike = () => {
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
          <div className="d-flex justify-content-center mt-lg-4 mt-md-2 fira-sans-style-medium">
            <div className="card border-0 mb-3 user-post">
              <div className="post-header d-flex justify-content-between align-items-center">
                <div
                  className="user-profile-img-box d-flex align-items-center border-1 rounded"
                  style={{ width: "60px", height: "60px" }}
                >
                  <img
                    src={userProfileImg}
                    alt="userProfileImage"
                    style={{ width: "100%", height: "100%" }}
                  />
                  <div className="pt-4">
                    <div className="username">{post.user.username}</div>
                    <p className="fw-normal fst-italic">{formattedDate}</p>
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
              <div className="post-content mb-2 mx-3">{post.content}</div>
              <img src={post.fileUrl} className="card-img-top" alt={altText} />
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <button onClick={handleLike} className="btn">
                    <i className="bi bi-hand-thumbs-up me-1"></i>
                    {likes}
                    {/* <i className="bi bi-hand-thumbs-up-fill"></i> */}
                  </button>
                  <button onClick={handleComment} className="btn">
                    <i className="bi bi-chat me-1"></i>
                    {comments}
                  </button>
                  <button className="btn">
                    <i className="bi bi-arrow-down"></i>
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
