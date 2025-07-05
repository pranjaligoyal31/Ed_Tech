import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { fetchCourseDetails } from "../../../services/operations/courseDetailsAPI"
import { useDispatch, useSelector } from "react-redux"
import { buyCourse } from "../../../services/operations/studentFeaturesAPI"

const CourseDetails = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)

  const [course, setCourse] = useState(null)
  useEffect(() => {
  const getDetails = async () => {
    const response = await fetchCourseDetails(courseId)
    console.log("RESPONSE IN COMPONENT", response)

    // ✅ Correctly access the nested course data
    setCourse(response?.data?.data?.course)
  }
  getDetails()
}, [courseId])


  const handleBuyNow = () => {
    if (!token) return navigate("/login")
    buyCourse(token, courseId, user, navigate, dispatch)
  }

  if (!course) return <div className="text-white p-8">Loading course details...</div>

  return (
    <div className="text-white p-8">
      <h1 className="text-3xl font-bold mb-4">{course.courseName}</h1>
      <img src={course.thumbnail} alt="Course Thumbnail" className="w-full max-w-sm rounded mb-4" />
      <p className="mb-4">{course.courseDescription}</p>
      <p className="mb-4 font-semibold text-lg">Price: ₹{course.price}</p>
      <button
        onClick={handleBuyNow}
        className="bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-300 transition"
      >
        Buy Now
      </button>
    </div>
  )
}

export default CourseDetails
