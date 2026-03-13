import { useEffect, useState } from "react";
import StoryTile from "../component/StoryTile";
import { fetchUserPostAPI } from "../services/apiCollections";
import PostDisplayCard from "../component/PostDisplayCard";

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

export default function Profile({setStoryIndex,setStoryOpen}) {
  const [post, setPost] = useState([]);
  const [view,setView]=useState("tile")
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  console.log("user details", loggedInUser.email);

  let userStats = [
    {
      title: "post",
      count: 0,
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

  function handleLogout() {
    let ask = confirm("are your sure to logout?");
    if (ask) {
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("loginStatus");
      window.location.reload();
    }
  }

  async function loadUserPost() {
    try {
      const response = await fetchUserPostAPI(loggedInUser.id);
      setPost(response);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    loadUserPost();
  }, []);

  console.log("my posts", post);

  return (
    <section>
      <div className="p-4 w-full">
        <div className="flex gap-2">
          <StoryTile
          onOpenstory={()=>{
            setStoryIndex(1);
            setStoryOpen(true)
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
              {loggedInUser?.fullName || "no name"}
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
        <p>{loggedInUser.bio || "no bio"} </p>
        <button
          onClick={handleLogout}
          className="text-white bg-red-600 rounded-md px-2 py-1"
        >
          logout
        </button>
      </div>
      {/* //post section  */}
     {view==="tile" && <div className="grid grid-cols-3 grid-rows-3">
        {post.map((post, postidx) => (
          <PostTile setView={setView} key={postidx} post={post} />
        ))}
      </div>}
     {view==="fullView" && <div className="grid grid-cols-1 grid-rows-3">
        {post.map((post, postidx) => (
          <PostDisplayCard key={postidx} post={post} />
        ))}
      </div>}
    </section>
  );
}

function PostTile({ post,setView }) {
  return (
    <div onClick={()=>setView("fullView")} className="h-full min-h-44 w-full">
      <img
        className="object-cover h-full w-full object-center"
        src={post?.image}
        alt={post?.caption}
      />
    </div>
  );
}
