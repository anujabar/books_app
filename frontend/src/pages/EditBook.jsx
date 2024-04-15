import React,{useState,useEffect} from 'react'
import BackButton from '../componenets/BackButton'
import Spinner from '../componenets/Spinner'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'

const EditBook = () => {
  const [title,setTitle]=useState("")
  const [author,setAuthor]=useState("")
  const [publishYear,setPublishYear]=useState("")
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()
  const {id}=useParams() //destructure

  useEffect(()=>{
    setLoading(true)
    axios
    .get(`http://localhost:3000/books/${id}`)
    .then((response)=>{
      setTitle(response.data.title)
      setAuthor(response.data.author)
      setPublishYear(response.data.publishYear)
      setLoading(false)
    })
    .catch((error)=>{
      alert("An error occured")
      console.log(error)
      setLoading(false)
    })
  },[])//Occurs only on initial render

  const handleEditBook=()=>{
    console.log(title)
    const data={
      title:title,
      author:author,
      publishYear:publishYear
    }
    setLoading(true)
    axios
    .put(`http://localhost:3000/books/${id}`,data)
    .then(()=>{
      setLoading(false)
      navigate("/")
    })
    .catch((error)=>{
      setLoading(false)
      alert("An error occured. Check console.")
      console.log(error)
    })
  }
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {
        loading?
        (<Spinner/>)
        :(
          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Title</label>
              <input 
              type='text' 
              value={title} 
              onChange={(event)=>{setTitle(event.target.value)}}
              className='border-2 border-gray-500 px-4 py-2 w-full'/>
            </div>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Author</label>
              <input 
              type='text' 
              value={author} 
              onChange={(event)=>{setAuthor(event.target.value)}}
              className='border-2 border-gray-500 px-4 py-2 w-full'/>
            </div>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
              <input 
              type='text' 
              value={publishYear} 
              onChange={(event)=>{setPublishYear(event.target.value)}}
              className='border-2 border-gray-500 px-4 py-2 w-full'/>
            </div>
            <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
              Save
            </button>
          </div>
        )
      }
    </div>
  )
}

export default EditBook
