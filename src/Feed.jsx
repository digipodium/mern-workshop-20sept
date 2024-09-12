import axios from "axios";
import { useEffect, useState } from "react";
import { IconThumbUp } from "@tabler/icons-react";
import { IconShare3 } from "@tabler/icons-react";
import { IconMessageCircle } from "@tabler/icons-react";
import { IconCirclePlus } from "@tabler/icons-react";
import AddPost from "./AddPost";
import { IconPlus } from "@tabler/icons-react";
import { IconHeart } from "@tabler/icons-react";

const Feed = () => {
  const [postData, setPostData] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  const fetchPostData = async () => {
    const res = await axios.get(
      "https://mern-workshop-api.onrender.com/post/getall"
    );
    console.log(res.data);
    setPostData(res.data);
  };

  useEffect(() => {
    fetchPostData();
  }, []);

  return (
    <>
      <button
        onClick={() => setShowAdd(true)}
        className="z-10 p-3 bg-blue-500 text-white fixed right-2 bottom-14 rounded-full"
      >
        <IconPlus />
      </button>
      <nav className="py-3">
        <div className="flex justify-center">
          <h1 className="text-center text-3xl font-bold">Feed</h1>
        </div>
      </nav>
      {showAdd && (
        <AddPost
          close={() => {
            setShowAdd(false);
          }}
          refresh={fetchPostData}
        />
      )}
      <div className="bg-blue-200 pt-5">
        <div className="grid grid-cols-12">
          <div className="md:col-span-3 col-span-1"></div>
          <div className="md:col-span-6 col-span-10">
            {postData.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-lg border-2 shadow-lg mb-10"
              >
                <img
                  className="rounded-lg object-cover w-full"
                  src={post.image}
                  alt=""
                />
                <div className="p-5">
                  <p className="text-3xl font-bold">{post.title}</p>
                  <p text-md font-bold>
                    {post.description}
                  </p>

                  <div className="flex gap-2 mt-4">
                    <button className="">
                      <IconHeart color="red" />
                    </button>
                    <button className="">
                      <IconMessageCircle color="blue" />
                    </button>
                    <button className="">
                      <IconShare3 color="black" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="md:col-span-3 col-span-1"></div>
        </div>
      </div>
    </>
  );
};

export default Feed;
