import { MdDelete } from "react-icons/md";
import { useContext } from "react";
import { PostList_C } from "../store/posts-list-store";

const Post = ({ post }) => {
  const { deletePost, likePost, dislikePost } = useContext(PostList_C);

  return (
    <div className="card post-card">
      <div className="card-body">
        <h5 className="card-title">
          {post.title}
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger post_del_btn"
            onClick={() => deletePost(post.id)}
          >
            <MdDelete />
            <span className="visually-hidden">unread messages</span>
          </span>
        </h5>
        <p className="card-text">{post.body}</p>
        {post.tags.map((tag) => (
          <span key={tag} className="badge text-bg-primary hashtag">
            {tag}
          </span>
        ))}
        <div className="alert alert-warning views" role="alert">
          This post has been viewed by {post.views} people.
        </div>
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button className="btn btn-success" onClick={() => likePost(post.id)}>
            👍 Like <span className="like-count">{post.likePost}</span>
          </button>
          <button
            className="btn btn-danger"
            onClick={() => dislikePost(post.id)}
          >
            👎 Dislike <span className="dislike-count">{post.dislikePost}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
