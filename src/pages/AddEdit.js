import React,{useState,useEffect} from 'react'
import { useNavigate ,useLocation, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import './AddEdit.css';
const State ={
    name:"",
    email:"",
    contact:"",
};
const AddEdit = () =>{
    const [state,setState] =useState(State);
    const {name ,email,contact} = State;
    const {id} = useParams();
    useEffect(()=>{
        if(id){
            getSingleUser(id);
        }
    },[id])
const getSingleUser =async(id) =>{
   
        const response = await axios.get(`http://localhost:5000/user/${id}`);
        if(response.status === 200){
            setState({...response.data[0]});
            }}
    const navigate =useNavigate ();

    const addUser = async (data) =>{
        const response =await axios.post("http://localhost:5000/user",data);
        toast.success(response.data);
    }
    const updateUser = async (data,id) =>{
        const response =await axios.put(`http://localhost:5000/user/${id}`,data);
        toast.success(response.data);
    }

const handleSubmit =(e) =>{
    e.preventDefault();
    if(!id){ 
        addUser(state);
    }else{
        updateUser(state,id);
    }
   
    navigate("/");
    
}
const handleInputChange =(e) =>{
    let {name,value} = e.target;
    setState({...state,[name]:value})
}

    return(
        <div style={{marginTop: "100px"}}>
            <form
            style={{
                margin:"auto",
                padding:"15px",
                maxWidth: "400px",
                alignContent:"center",
                
            }}onSubmit={handleSubmit}>
                <label htmlFor='name'>Name</label>
                <input type="text" id="name" name="name" placeholder="Enter Name..." onChange={handleInputChange} value={state.name}/>
                <label htmlFor='email'>email</label>
                <input type="text" id="email" name="email" placeholder="Enter email..." onChange={handleInputChange} value={state.email}/>
                <label htmlFor='contact'>contact</label>
                <input type="number" id="contact" name="contact" placeholder="Enter contact..." onChange={handleInputChange} value={state.contact}/>
                <input type="submit" value={id ? "Update":"Add"}/>
            </form>
        </div>
    )
}
export default AddEdit;