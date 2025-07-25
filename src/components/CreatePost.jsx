import { useContext, useRef } from "react";
import { PostList_C } from "../store/posts-list-store";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { addPost } = useContext(PostList_C);
  const navigate = useNavigate();

  const userIDElement = useRef();
  const postTitleElement = useRef();
  const postBodyElement = useRef();
  const viewsElement = useRef();
  const tagsElement = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const userID = userIDElement.current.value;
    const postTitle = postTitleElement.current.value;
    const postBody = postBodyElement.current.value;
    const views = viewsElement.current.value;
    const tags = tagsElement.current.value.split(" ");

    addPost(userID, postTitle, postBody, views, tags);

    userIDElement.current.value = "";
    postTitleElement.current.value = "";
    postBodyElement.current.value = "";
    viewsElement.current.value = "";
    tagsElement.current.value = "";
    navigate("/");
  };

  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="user-id" className="form-label">
          User-ID
        </label>
        <input
          type="text"
          ref={userIDElement}
          className="form-control"
          id="user-id"
          placeholder="Enter your User-ID"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Post Title
        </label>
        <input
          type="text"
          ref={postTitleElement}
          className="form-control"
          id="title"
          placeholder="Enter title"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="body" className="form-label">
          Description
        </label>
        <textarea
          type="text"
          rows="4"
          ref={postBodyElement}
          className="form-control"
          id="body"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="views" className="form-label">
          Number of views
        </label>
        <input
          type="text"
          className="form-control"
          id="views"
          ref={viewsElement}
          placeholder="How many people reacted to this post"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="tags" className="form-label">
          Enter your hashtags here
        </label>
        <input
          type="text"
          ref={tagsElement}
          className="form-control"
          id="tags"
          placeholder="Please enter your tags using space"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Post
      </button>
    </form>
  );
};

export default CreatePost;
