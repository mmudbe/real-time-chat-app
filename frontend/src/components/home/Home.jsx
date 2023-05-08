import React, { useState } from 'react'
import { fetchRoomID } from '../../service/api';
import {useNavigate} from "react-router-dom"
export default function Home() {
    let navigate= useNavigate();

let [name , setName] = useState("");
let [id ,setID] = useState("");
const handleNameChange= (e) => {
    setName(e.target.value);
}
const handleIdChange = (e) => {
    setID(e.target.value);
}
let submitBtn =() => {
if(name===""){
alert("enter name");
}
else{
    const url =  `/room?name=${name}&roomId=${id}` ;
    navigate(url);
  }
    // location.href= `/room?name=${name}&roomId=${}`;
}



  return (
    <div>
   <div className="mt-4">
     <label htmlFor="name"  className='block'>name</label>
     <input type="text" className='border-2 ml-2' id="name" onChange={handleNameChange} />
    
   <div className="mt-4">
     <label htmlFor="room-id" className="block">roomID</label>
     <input type="text" className="border-2 ml-2" id="room-id" onChange={handleIdChange}/>
   </div>
  
   <button onClick={submitBtn} type="submit" className="px-4 py-2 bg-black text-white rounded-sm mt-4" name="submit" >Submit</button>

    </div>
    </div>
  )
}
