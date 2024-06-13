import React from "react";
import { Link } from "react-router-dom";
import storage from "../appwrite/storage";

function ReelsPostCard({ $id, content, featuredImage, userName }) {
  // console.log(featuredImage, service.getFilePreview(featuredImage));
  return (
    <Link to={`/post/${$id}`} className=" post  ">
      <div className="w-full flex flex-col items-center">
        <h2 className="capitalize font-black self-center">{userName} </h2>
        <img
          src={storage.getFilePreview(featuredImage)}
          // src={`https://source.unsplash.com/random/?${item}/300x300&${
          //   Math.random() * 100
          // }`}
          className="w-1/2 rounded-xl"
          style={{ height: "350px" }}
          alt="iskcon"
        />
      </div>
    </Link>
  );
}

export default ReelsPostCard;
