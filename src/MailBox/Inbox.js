import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { Accordion } from 'react-bootstrap';
//import {col} from 'react-bootstrap';


const Inbox = () => {

  const [emails,setEmail]=useState([]);

  const email=localStorage.getItem('email');

  const token=localStorage.getItem('token');

  const mail=email.replace('@','').replace('.','');

  const url='https://mail-box-87267-default-rtdb.firebaseio.com'

  useEffect(()=>{
    const fetchData=async()=>{
      try {
        const response=await axios.get(`${url}/sent/${mail}.json?auth=${token}`);

        console.log(response);

        if(response.status===200 || response.status===201){
          const emailData=await response.data;

  console.log(emailData)

          const emailArray=Object.keys(emailData).map(key=>({
            id:key,
            ...emailData[key]
          }));
          console.log(emailArray);
          setEmail(emailArray);
        }
        else{
          console.log('not able to fetch');
        }
      }
      catch(error){
        alert('error fetch ing')
        console.log(error);
      }
    }
      fetchData();
    },[mail,token])
    const readMessagehandler=async(emailId)=>{
      try{
        await axios.patch(`${url}/sent/$[mail/${emailId}.json?auth=${token}`,{read:true});

        setEmail(prevEmails=>prevEmails.map(email=>email.id===emailId ? {...email,read:true}:email));
      }catch(error){
        console.log('errormarking email',error)
      }
    }
    const unreaddCount=emails.reduce((count,email)=>count+(email.read?0:1),0);
    console.log(unreaddCount)
   

  return (
    <Accordion>
      {emails.map(email=>(
        <Accordion.Item key={email.id} eventKey={email.id}>
          <Accordion.Header onClick={()=>readMessagehandler(email.id)}>
          <span>{email.read ?'':"."}</span>
          {email.subject}
          </Accordion.Header>
          <Accordion.Body>{email.body}</Accordion.Body>
        </Accordion.Item>
      ))}
      </Accordion>
  )
}

export default Inbox;