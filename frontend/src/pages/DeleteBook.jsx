import React,{useState} from 'react'
import Spinner from '../componenets/Spinner'
import BackButton from '../componenets/BackButton'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'

const DeleteBook = () => {
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()
  const {id}=useParams()
  const handleDeleteBook=()=>{
    setLoading(true)
    axios
    .delete(`http://localhost:3000/${id}`)
    .then(()=>{
      setLoading(false)
      navigate("/")
    })
    .catch((error)=>{
      console.log(error)
      setLoading(false)
      alert("Error Occured")
    })
  }

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading?
      (<Spinner/>)
    :(<div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete this book?</h3>
        <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteBook}>Yes, Delete it</button>
      </div>)}
    </div>
  )
}

export default DeleteBook
