import React,{useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const[title,setTitle]=useState('');
  const[author,setAuthor]=useState('');
  const[desc,setDesc]=useState('');
  const [id,setId] =useState('');
  const [idToDelete,setIdToDelete]=useState('');
  const handleSubmit =() =>{
    let data = {
      name:title,
      author:author,
      description:desc,
    };
axios.post('http://localhost:5000/create-blog',data).then(response=>
{
  console.log(response);
  setTitle("");
}).catch(err=>{
  console.log(err);
  
})
  };

  const getAllBlogs=()=>{
    axios
    .get('http://localhost:5000/get-blogs')
    .then(response =>{
      console.log(response);
    })
    .catch(err=>{
      console.log(err);
    })
  };

const handleUpdate=()=>{
  let data ={
    name:title,
  }
  axios
  .patch(`http://localhost:5000/update-blog/${id}`,data)
  .then(response =>{
    console.log(response);
  })
  .catch(err=>{
    console.log(err);
  })
}
const handleDelete=()=>{
  axios
  .delete(`http://localhost:5000/delete-blog/${idToDelete}`)
  .then(response =>{
    console.log(response);
  })
  .catch(err=>{
    console.log(err);
  })
}

  return (
    <div className="App">
      <h1>Blogs</h1>
      <input type="text" value={title} placeholder="Title" onChange={e=>setTitle(e.target.value)}/>
      <input type="text" value={author} placeholder="Author" onChange={e=>setAuthor(e.target.value)}/>
      <input type="text" value={desc} placeholder="Desc" onChange={e=>setDesc(e.target.value)}/>
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={getAllBlogs}>Get All Blogs</button>
    <h1>Update</h1>
    <input type="text" value={id} onChange={(e)=>{setId(e.target.value)}}/>
    <button onClick={handleUpdate}>update</button>

    <h1>Delete</h1>
    <input type="text" value={idToDelete} onChange={(e)=>{setIdToDelete(e.target.value)}}/>
    <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default App;
