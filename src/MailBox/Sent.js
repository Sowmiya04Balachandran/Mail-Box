import React,{useEffect,useState} from 'react';
import { Accordion,Container } from 'react-bootstrap';
import axios from 'axios';


const Sent=()=>{
    const [emails,setemails]=useState([]);

    const url='https://mail-box-87267-default-rtdb.firebaseio.com';

    const email=localStorage.getItem('email').replace('@','').replace('.','');

    useEffect(()=>{
        const getsentdata=async()=>{
            try{
                const response=await axios.get(`${url}/sent/${email}.json`);
                console.log(response);

                if(response.status===200 || response.status===201){
                    const sentData=response.data;
                    console.log(sentData);

                    const sentdataArray=Object.keys(sentData).map(key=>(
                        {
                            id:key,
                            ...sentData[key]
                        }
                    ))
                    setemails(sentdataArray)
                    console.log(sentdataArray);
                }

            }
            catch(error){
                console.log(error)
            }
        }
        getsentdata()
    })

    return (

       <Container>
        {emails.map((data=>(
            <Accordion key={data.id}>
                <Accordion.Header>
                    {data.subject}
                </Accordion.Header>
                <Accordion.Body>{data.body}</Accordion.Body>
                <Accordion.Body>{data.time}</Accordion.Body>
                <Accordion.Body>{data.to}</Accordion.Body>
            </Accordion>
        )))}
       </Container>
    )
}
export default Sent;