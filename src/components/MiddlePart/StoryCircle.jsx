import { Avatar } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";

const StoryCircle = () => {
  return (
    <div>
      <div className="flex flex-col items-center mr-4 cursor-pointer">
        <Avatar sx={{ width: "5rem", height: "5rem" }} src="https://cdn.pixabay.com/photo/2018/01/21/14/16/woman-3096664_640.jpg">
        </Avatar>
        <p>Lady..</p>
      </div>
    </div>
  );
};

export default StoryCircle;
