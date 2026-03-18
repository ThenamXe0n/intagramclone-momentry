import { useEffect, useState } from "react";
import StoryTile from "../component/StoryTile";
import {
  fetchUserDetailsByIdAPI,
  fetchUserPostAPI,
} from "../services/apiCollections";
import PostDisplayCard from "../component/PostDisplayCard";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  resetViewUserDetails,
  setViewUserDetails,
} from "../features/commonSlice";

let samplepost = [
  {
    id: "uuid",
    userId: "uuid",
    image: "image-url",
    caption: "Hello world",
    likes: [],
    createdAt: "date",
  },
  {
    image:
      "https://i.pinimg.com/736x/a7/6d/f6/a76df6737297efe9aadf7f9843c4c5ec.jpg",
    caption: "mountains over beaches",
    likes: [],
    createdAt: "3/6/2026",
    userId: "XXbMcho",
    id: "kEiPk3v",
  },
  {
    image:
      "https://i.pinimg.com/1200x/95/56/6b/95566b30ff6750fbc820bb26fcca9410.jpg",
    caption: "sunset 🫡🔱",
    likes: [],
    createdAt: "3/6/2026",
    userId: "XXbMcho",
    id: "Mw-7_HO",
  },
  {
    image:
      "https://i.pinimg.com/736x/b2/1b/bc/b21bbcab330b6a43d53fdc98359e983b.jpg",
    caption: "",
    likes: [],
    createdAt: "3/6/2026",
    userId: "de0qFLY",
    id: "oIh8dEW",
  },
  {
    image:
      "https://i.pinimg.com/736x/de/5a/3e/de5a3eee399dd05d443048b3b3c44d1d.jpg",
    caption: "",
    likes: [],
    createdAt: "3/6/2026",
    userId: "de0qFLY",
    id: "hWVyBXv",
  },
];

export default function UserProfile({ setStoryIndex, setStoryOpen }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const userdetails = useSelector((state) => state.common.viewUser);
  const [view, setView] = useState("tile");
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  console.log("user details", loggedInUser.email);

  let userStats = [
    {
      title: "post",
      count: post?.length || 0,
    },
    {
      title: "followers",
      count: 0,
    },
    {
      title: "followings",
      count: 0,
    },
  ];

  async function loadUserPost() {
    try {
      const response = await fetchUserPostAPI(id);
      const details = await fetchUserDetailsByIdAPI(id);
      dispatch(setViewUserDetails(details));
      // console.log("user details", userDetails);
      setPost(response);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    loadUserPost();

    return () => {
      dispatch(resetViewUserDetails());
    };
  }, []);

  console.log("my posts", userdetails);

  return (
    <section className="border-4 border-red-300">
      <div className="p-4 w-full">
        <div className="flex gap-2">
          <StoryTile
            onOpenstory={() => {
              setStoryIndex(1);
              setStoryOpen(true);
            }}
            story={{
              user: {
                name: "nameet mandwal",
                avatar: "/assets/noprofile.avif",
              },
            }}
            mystory={true}
            showName={false}
          />
          <div className="flex-1 space-y-2">
            <p className="capitalize font-medium text-lg">
              {userdetails?.fullName || "no name"}
            </p>
            <div className="grid grid-cols-3 w-full">
              {userStats.map((stats, idx) => (
                <div key={idx} className="flex flex-col ">
                  <span className="font-bold">{stats?.count}</span>
                  <span className="font-bold text-sm capitalize">
                    {stats?.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p>{userdetails.bio || "no bio"} </p>
      </div>
      <div className="flex gap-1 w-11/12 mx-auto my-4">
      <button className="text-black bg-neutral-400 rounded-md flex-1 px-2 py-1">message</button>
      <button className="text-white bg-blue-400 rounded-md flex-1 px-2 py-1">follow</button>

      </div>
      {/* //post section  */}
      {view === "tile" && (
        <div className="grid grid-cols-3 grid-rows-3">
          {post.map((post, postidx) => (
            <PostTile setView={setView} key={postidx} post={post} />
          ))}
        </div>
      )}
      {view === "fullView" && (
        <div className="grid grid-cols-1 grid-rows-3">
          {post.map((post, postidx) => (
            <PostDisplayCard key={postidx} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}

function PostTile({ post, setView }) {
  return (
    <div onClick={() => setView("fullView")} className="h-full min-h-44 w-full">
      <img
        className="object-cover h-full w-full object-center"
        src={post?.image}
        alt={post?.caption}
      />
    </div>
  );
}
