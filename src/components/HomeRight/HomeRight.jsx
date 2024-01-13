import React from "react";
import SearchUser from "../SearchUser/SearchUser";
import PopularUserCard from "./PopularUserCard";
import { Card } from "@mui/material";

const HomeRight = () => {
  const popularUser = [1, 1, 1, 1];
  return (
    <div className="pr-5">
      <SearchUser />

      <Card className="p-5">
        <div className="py-5 flex justify-between items-center">
          <p className="font-bold opacity-70">Suggestions For You</p>
          <p className="text-xs font-semibold opacity-95">View All</p>
        </div>

        <div className="">
          {popularUser.map((item) => <PopularUserCard />)}
        </div>
      </Card>
    </div>
  );
};

export default HomeRight;
