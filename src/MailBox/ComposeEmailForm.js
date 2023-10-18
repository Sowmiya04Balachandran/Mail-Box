import React ,{useEffect,useState}from 'react';
import { Editor } from "react-draft-wysiwyg";
import { useDispatch, useSelector } from 'react-redux';
import { emailActions } from '../store/emailslice';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
//import styles from './ComposeEmailForm.module.css'; // Import the CSS module
import axios from 'axios';
//import EmailNavigation from '../navigation/EmailNavigationBox';
//import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
//import { convertToRaw } from 'draft-js';
import Modal from 'react-bootstrap/Modal';
//import { ContactSupportOutlined } from '@mui/icons-material';


const ComposeEmailForm = (props) => {
    console.log(props);
    const dispatch = useDispatch();
    const [mailBody,setMailBody]=useState('');

    const { subject, body,email } = useSelector(state => state.email);

   
    const senderEmail=localStorage.getItem('email');

    //getting token which we need to send data intothe server

    const token =useSelector(state=>state.auth.token);

    console.log(token);

    const handleEmailChange=(event)=>{
        dispatch(emailActions.setEmail(event.target.value))
    }

    const handleSubjectChange = (event) => {
        dispatch(emailActions.setEmailSubject(event.target.value));
    }

    const handleEditorStateChange = (editorState) => {
        dispatch(emailActions.setEmailBody(editorState));
    }

    useEffect(()=>{
        setMailBody(body.getCurrentContent().getPlainText());
    },[body]);

    const sendEmail =async() => {

     const receiveMail=email.replace('@','').replace('.','');

     const url='https://mail-box-87267-default-rtdb.firebaseio.com';

     const formData=(date)=>{
        const year=date.getFullYear();

        const month=String(date.getMonth()+1).padStart(2,'0');

        const day=String(date.getDate()).padStart(2,'0');

        const hours=String(date.getHours()).padStart(2,'0');

        const minutes=String(date.getMinutes()).padStart(2,'0');

        const seconds=String(date.getSeconds()).padStart(2,'0');

        return `${day}/${month}/${year}/${hours}:${minutes}:${seconds}`

     };

     const formattedDate=formData(new Date());

     const sentEmailData={
        to:email,
        subject:subject,
        body:mailBody,
        time:formattedDate,
        read:false,
        recieve:false,
        send:true,
        sender:senderEmail,
     }
     try{
        const response=await axios.post(`${url}/sent/${receiveMail}.json`,sentEmailData,{
            headers:{
                'Content-Type':'application/json'
            }
        });

        if(response.status===200 || response.status===201){
            console.log(response.data);
            dispatch(emailActions.resetEmailComposition);
        }else{
            console.log('error in post');
            throw new Error('something Went Wrong');
        }
     }
     catch(error){
        alert(error)
      console.log('error');
        
     }

        // console.log(subject, body);
        // dispatch(emailActions.resetEmailComposition());
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closebutton>
                <Modal.Title>Compose email</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label>To</label>
                <input type='email'
                value={email} 
                
                placeHolder='email'
                onChange={handleEmailChange}
                style={{width:'100%',padding:'10px'}}     />
                <br/>
                <input  type='text'
                value={subject}
                onChange={handleSubjectChange}
                placeholder='subject'
                style={{width:'100%', padding:'10%'}} />
                

                <Editor editorState={body}
                onEditorStateChange={handleEditorStateChange}
                placeholder='write your body Here' 
                wrapperStyle={{width:'100%',border:'1px solid #ccc',padding:'5px'}}/>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={sendEmail}>Send Email</Button>
            </Modal.Footer>
    
          
        </Modal>
    )
}

export default ComposeEmailForm;


// <input
//                 type='text'
//                 value={subject}
//                 onChange={handleSubjectChange}
//                 className={styles.subjectInput} 
//                 placeholder='Subject'
//             />
//             <div className={styles.editor}> 
//                 <Editor
//                     editorState={body}
//                     onEditorStateChange={handleEditorStateChange}
//                 />
//             </div>
//             <button onClick={sendEmail} className={styles.button}>Send Email</button> {/* Apply the CSS class */}
//         </div>