import React,{useEffect,useState} from 'react';
import './profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMapMarkerAlt, faSchool, faBirthdayCake, faUser } from '@fortawesome/free-solid-svg-icons';
import studentsdata from './dummy';
import { useParams } from 'react-router';

export default function AForm() {
    const [data,setdata]=useState([]);
    const id=useParams();
 function fetchData(){
      const dat=studentsdata.filter((ele) => ele.id === parseInt(id.id))
      setdata(dat);
    console.log(data);  
   
    }

    useEffect(()=>{
       fetchData();
    },[])
  }
  