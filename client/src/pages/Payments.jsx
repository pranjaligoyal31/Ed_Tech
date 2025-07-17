import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { buyCourse } from '../services/operations/studentFeaturesAPI'
import { useSelector, useDispatch } from 'react-redux'

const DummyPayment = () => {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const courseId = location.state?.courseId

  const handleBuy = () => {
    buyCourse(token, courseId, user, navigate, dispatch)
  }

  return (
    <div className="text-white flex flex-col items-center justify-center h-[80vh] gap-4">
      <h1 className="text-3xl font-bold">Dummy Payment Page</h1>
      <p className="text-lg">Click below to simulate payment and enroll in the course.</p>
      <button
        className="bg-yellow-500 text-black px-6 py-2 rounded hover:bg-yellow-400 transition"
        onClick={handleBuy}
      >
        Buy Now
      </button>
    </div>
  )
}

export default DummyPayment
