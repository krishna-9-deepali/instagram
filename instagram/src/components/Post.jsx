import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import storage from "../appwrite/storage";
import dbservice from "../appwrite/database";
import { Button, Container } from "../components";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  console.log("redux user data", userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;
  // Determine if the current user is the author of the post
  console.log("post", post, "isauther", isAuthor, userData);
  // console.log("post.userId === userData.$id", post.userId === userData.$id);
  useEffect(() => {
    if (id) {
      dbservice.getPost(id).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [id, navigate]);
  //post$id is id .
  const deletePost = () => {
    dbservice.deletePost(post.$id).then((status) => {
      if (status) {
        storage.deleteFile(post.featuredImage);
        navigate("/profile");
      }
    });
  };

  return post ? (
    <div className="py-8 flex flex-col">
      <div className="capitalize  font-black">
        {isAuthor && <h2>{userData.name}:</h2>}
      </div>
      <div className="flex flex-col gap-2 flex-wrap">
        <div className="browser-css">{post.caption}</div>
        <div className="w-full flex justify-start mb-4 relative border rounded-xl p-2">
          <img
            src={storage.getFilePreview(post.featuredImage)}
            alt="image"
            className="rounded-xl"
            style={{ height: "450px", width: "450px" }}
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;
}
