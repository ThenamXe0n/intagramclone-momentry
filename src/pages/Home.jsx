import React from "react";

const StoryTile = ({ story, mystory=false }) => {
  return (
    <div className="flex size-24 flex-col items-center relative ">
      <div className="size-20 flex items-center overflow-visible justify-center rounded-full  border-3 border-gray-500/30">
        <img
          src={(story && story?.image) || "/assets/noprofile.avif"}
          alt="story"
          className="size-20 rounded-full object-cover"
        />
      </div>
       {mystory &&  <div className="size-4 bg-white flex items-center justify-center absolute rounded-full bottom-6 right-2 border-3 border-gray-500/30">+</div>}
      <p className="truncate max-w-24 text-xs ">
        {story?.user || "nameet mandwal"}
      </p>
    </div>
  );
};

const Home = () => {
  return (
    <div className="w-full overflow-x-scroll">
      <div className="px-2 flex items-center gap-2 w-fit py-2">
        <StoryTile />
        <StoryTile />
        <StoryTile />
        <StoryTile />
        <StoryTile />
        <StoryTile />
        <StoryTile />
        <StoryTile />
        <StoryTile />
      </div>
    </div>
  );
};

export default Home;
