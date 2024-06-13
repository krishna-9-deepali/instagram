import React from "react";
import storage from "../appwrite/storage";
import { Link } from "react-router-dom";

function PostCard({ $id, caption, featuredImage }) {
  // console.log(featuredImage, service.getFilePreview(featuredImage));
  return (
    <Link to={`/post/${$id}`} className=" post  ">
      <div className="w-full">
        {/* {item} */}
        <img
          src={storage.getFilePreview(featuredImage)}
          // src={`https://source.unsplash.com/random/?iskcon/300x300&${
          //   Math.random() * 100
          // }`}
          // src={`https://source.unsplash.com/random/?${item}/300x300&${
          //   Math.random() * 100
          // }`}
          className="w-full"
          style={{ height: "350px" }}
          alt=""
        />
      </div>
    </Link>
  );
}

export default PostCard;
