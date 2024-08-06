import React, { useState } from "react";
import "../assets/css/post.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Post({ userPostSrc, altText, userProfileImg }) {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleComment = () => {
    setComments(comments + 1);
  };

  return (
    <>
      <div className="d-flex justify-content-center mt-lg-4 mt-md-2 fira-sans-style-medium">
        <div className="card border-0 mb-3 user-post">
          <div className="post-header d-flex justify-content-between align-items-center">
            <div className="user-profile-img-box d-flex align-items-center border-1 rounded" style={{width:"60px",height:"60px"}} >
              <img src={userProfileImg} alt="userProfileImage" style={{width:"100%",height:"100%"}} />
              <div className="username">Lokendra</div>
            </div>
            <div class="dropdown">
              <button
                class="btn"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="bi bi-three-dots"></i>
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item text-danger" href="#">
                    Delete
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <img src={userPostSrc} className="card-img-top" alt={altText} />
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <button onClick={handleLike} className="btn">
                <i class="bi bi-hand-thumbs-up me-1"></i>
                {likes}
                {/* <i class="bi bi-hand-thumbs-up-fill"></i> */}
              </button>
              <button onClick={handleComment} className="btn">
                <i class="bi bi-chat me-1"></i>
                {comments}
              </button>
              <button className="btn">
                <i class="bi bi-arrow-down"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
