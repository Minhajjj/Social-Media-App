import { useContext, useEffect, useState } from "react";
import { PostList_C } from "../store/posts-list-store";
import Post from "./Post";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpinner from "./LoadingSpinner";

const PostList = () => {
  const { postList, addInitialPosts } = useContext(PostList_C);
  const [fetching, setFetching] = useState(false);
  // Fetch posts from the API
  useEffect(() => {
    setFetching(true);
    const controller = new AbortController();
    const signal = controller.signal;

    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((data) => {
        const postsWithReactions = data.posts.map((post) => ({
          ...post,
          likePost: post.reactions?.likes ?? 0,
          dislikePost: post.reactions?.dislikes ?? 0,
        }));
        addInitialPosts(postsWithReactions);
        setFetching(false);
      });
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      {fetching && <LoadingSpinner />}
      {!fetching && postList.length === 0 && <WelcomeMessage />}
      {!fetching && (
        <div className="posts-grid">
          {postList.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      )}
    </>
  );
};

export default PostList;
