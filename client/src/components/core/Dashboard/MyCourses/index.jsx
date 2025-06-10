import React from "react";
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import { CiCirclePlus } from "react-icons/ci";
import IconBtn from "../../../common/IconBtn";
import CoursesTable from "../InstructorCourses/CoursesTable";
import { useNavigate } from "react-router-dom";

const MyCourses=()=>{

  const {token}=useSelector((state)=>state.auth);
  const navigate=useNavigate();
  const [courses,setCourses]=useState([]); 


  useEffect(()=>{
    const fetchCourses=async()=>{
      const result=await fetchInstructorCourses(token);
      if(result){
        setCourses(result);
      }
    }
    fetchCourses();
  },[])
  return (
    <div>
        <div  className='flex justify-between mb-10 text-white '>
          <h1 className="text-white font-inter font-bold text-2xl ">My Courses</h1>
          <IconBtn
          onClick={()=>navigate("/dashboard/add-course")}
          text="New"
          children={<CiCirclePlus fontSize={24}/>}
          customClasses="flex flex-row-reverse bg-yellow-50 text-black font-[600] px-6 py-3 rounded-lg items-center align-middle gap-x-1"
           />
        </div>


        {courses && <CoursesTable courses={courses} setCourses={setCourses}/>}
    </div>
  )
}

export default MyCourses;