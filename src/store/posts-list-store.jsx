import { useReducer } from "react";
import { createContext } from "react";

export const PostList_C = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
  likePost: () => {},
  dislikePost: () => {},
  addInitialPosts: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postID
    );
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  } else if (action.type === "LIKE_POST") {
    newPostList = currPostList.map((post) =>
      post.id === action.payload.postID
        ? { ...post, likePost: post.likePost + 1 }
        : post
    );
  } else if (action.type === "DISLIKE_POST") {
    newPostList = currPostList.map((post) =>
      post.id === action.payload.postID && post.views > 0
        ? { ...post, dislikePost: post.dislikePost - 1 }
        : post
    );
  } else if (action.type === "ADD_INITIAL_POSTS") {
    newPostList = action.payload.posts;
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);

  const addPost = (userID, postTitle, postBody, views, tags) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        title: postTitle,
        body: postBody,
        views: views,
        userID: userID,
        tags: tags,
      },
    });
  };

  const addInitialPosts = (posts) => {
    dispatchPostList({
      type: "ADD_INITIAL_POSTS",
      payload: {
        posts,
      },
    });
  };

  const deletePost = (postID) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postID,
      },
    });
  };

  const likePost = (postID) => {
    dispatchPostList({
      type: "LIKE_POST",
      payload: { postID },
    });
  };

  const dislikePost = (postID) => {
    dispatchPostList({
      type: "DISLIKE_POST",
      payload: { postID },
    });
  };

  return (
    <PostList_C.Provider
      value={{
        postList,
        addPost,
        deletePost,
        likePost,
        dislikePost,
        addInitialPosts,
      }}
    >
      {children}
    </PostList_C.Provider>
  );
};

export default PostListProvider;
