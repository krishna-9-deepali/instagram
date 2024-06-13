import React, { useEffect, useState } from "react";
import { Container } from "../components";
import dbservice from "../appwrite/database";
import { useNavigate, useParams } from "react-router-dom";
import { Createpost } from "./index";

function EditPost() {
  const [post, setPosts] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dbservice.getPost(id).then((post) => {
        if (post) {
          setPosts(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [id, navigate]);
  return post ? (
    <div className="py-8 ">
      <Container>
        <Createpost post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
