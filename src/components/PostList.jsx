import { useContext } from "react";
import { PostList_C } from "../store/posts-list-store";
import Post from "./Post";

const PostList = () => {
  const { postList } = useContext(PostList_C);

  return (
    <>
      {postList.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};

export default PostList;
