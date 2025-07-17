import React, { useState } from "react";
import { HomePageExplore } from '../../../data/homepage-explore';
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard";

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
        
        <div className="text-3xl lg:text-4xl font-semibold text-center my-10">
            Unlock the
          <HighlightText text={" Power of Code"} />
          </div>
          <p className="text-center text-richblack-300 text-base lg:text-lg font-semibold mt-1">
            Learn to Build Anything You Can Imagine
          </p>

          <div className="mt-5 flex flex-row rounded-full bg-richblack-800 mb-5 border-richblack-100
          px-1 py-1">
            {
                tabsName.map((element, index) => {
                    return (
                        <div
              className={` text-[16px] flex flex-row items-center gap-2 ${currentTab === element
                ? "bg-richblack-900 text-richblack-5 font-medium"
                : "text-richblack-200"
                } px-7 py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5`}
              key={index}
              onClick={() => setMyCards(element)}
            >
              {element}
            </div>
                    )
                })
            }
          </div>
          <div className="lg:h=[150px"></div>
            {/*course card ka group*/}
            <div className="absolute flex flex-row gap-10 justify-between w-full">
                {
                    courses.map((element, index) => {
          return (
            <CourseCard
              key={index}
              cardData={element}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          )
        })
                }
          </div>


        </div>
    
  )
}

export default ExploreMore