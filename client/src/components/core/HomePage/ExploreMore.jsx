import React, { useState } from "react";
import { HomePageExplore } from "../../../../data/homepage-explore";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
    const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div>
        <div>
        <div className="text-3xl lg:text-4xl font-semibold text-center my-10">
            Unlock the
          <HighlightText text={"Power of Code"} />
          <p className="text-center text-richblack-300 text-base lg:text-lg font-semibold mt-1">
            Learn to Build Anything You Can Imagine
          </p>
        </div>
    </div>
    </div>
  )
}

export default ExploreMore