import React from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Footer } from "./index";
import dbservice from "../appwrite/database";
import storage from "../appwrite/storage";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Createpost({ post }) {
  // import dbservice from "../../appwrite/config";

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      caption: post?.caption || "",
    },
  });
  // const { errors } = formState;

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  // console.log(userData.$id, "is user id ");
  const submit = async (data) => {
    console.log(data);
    if (post) {
      const file = data.image[0]
        ? await storage.uploadFile(data.image[0])
        : null;

      if (file) {
        storage.deleteFile(post.featuredImage);
      }

      const dbPost = await dbservice.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
        userId: userData.$id,
        userName: userData.name,
      });

      if (dbPost) {
        // navigate(`/post/${dbPost.$id}`);
        navigate("/profile");
      }
    } else {
      const file = await storage.uploadFile(data.image[0]);

      if (file) {
        console.log(file, "file uploaded");
        const fileId = file.$id;
        data.featuredImage = fileId;
        console.log(data);
        const dbPost = await dbservice.createPost({
          ...data,
          userId: userData.$id,
          userName: userData.name,
        });
        console.log("dbost", dbPost, userData.name);
        if (dbPost) {
          // navigate(`/post/${dbPost.$id}`);
          navigate("/profile");
        }
      }
    }
  };

  return (
    <>
      <div className="flex flex-col w-full my-16 minheigth">
        <div className="capitalize  font-black">
          <h2>{userData.name}:</h2>
        </div>
        <center>
          <h1 className="my-8 font-bold">
            {/* {post ? "Edit post:" : "Create Post"} */}
          </h1>
        </center>
        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-wrap  w-full mx-auto border"
        >
          <div className="w-full sm-w-full px-2 flex flex-col  ">
            <div>
              <textarea
                name=""
                id="myTextarea"
                placeholder="Write a caption :"
                className="mb-4"
                {...register("caption", {
                  required: true,
                  message: "caption is required",
                })}
              ></textarea>
              {/* {errors.caption && <p>{errors.caption.message}</p>} */}
            </div>

            {/* <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        /> */}
            <div className="w-1/3 sm-w-full px-2 flex flex-col">
              {post ? (
                <Input
                  label=" Select photos and videos here "
                  type="file"
                  className="mb-4 inputfile"
                  classNamelable="bg-blue-300 rounded"
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                  {...register("image", { required: !post })}
                />
              ) : (
                <Button>
                  <Input
                    label=" Select photos and videos here "
                    type="file"
                    className="mb-4 inputfile"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", {
                      required: !post,
                      message: "image is required",
                    })}
                  />
                  {/* {errors.image && <p>{errors.image.message}</p>} */}
                </Button>
              )}
              {post && (
                <div className="w-full mb-4">
                  <img
                    src={storage.getFilePreview(post.featuredImage)}
                    alt=""
                    className="rounded-lg"
                  />
                </div>
              )}

              <Button
                type="submit"
                bgColor={post ? "bg-green-500" : undefined}
                className="w-full "
              >
                {post ? "Update" : "Create new Post"}
              </Button>
            </div>
          </div>
        </form>
      </div>
      {!post && <Footer></Footer>}
    </>
  );
}
export default Createpost;
