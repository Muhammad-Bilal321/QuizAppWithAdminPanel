import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { fbAuth } from '../Config/firebaseMethod';

export default function Protected({Screen}) {

 const [loader, setLoader]= useState(true)

 const navigate = useNavigate()

    let checkAuth = ()=>{
        setLoader(true)
        // let auth =false;
        fbAuth().then((res)=>{
            setLoader(false)
        })
        .catch((err)=>{
            setLoader(false)
            navigate('login')
        })
        // if(auth){
           
        // }
        // else{
         
        // }
    }

    useEffect(()=>{
        checkAuth()
    },[])
  return (
loader?<>
<h1>...Loading</h1>
</>:

    <div>
    <Screen/>  
    </div>
  )
}
