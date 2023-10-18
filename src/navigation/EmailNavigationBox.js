//import { Dropdown } from "react-bootstrap";
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { ButtonGroup } from 'react-bootstrap';
import { useState } from 'react';
import ComposeEmailForm from '../MailBox/ComposeEmailForm';
import Stack from 'react-bootstrap/Stack';
import {Container} from 'react-bootstrap';
import Inbox from '../MailBox/Inbox';

const EmailNavigation=()=>{

  const [showInbox,setShowInbox]=useState(false);

  const [showModal,setShowModal]=useState(false);

  const handleClose=()=>{
    setShowModal(false);
    console.log('show modal clicked butnot working')
  }

  const handleOpen=()=>{
    setShowModal(true);
    console.log('show modal clicked but not working')
  }

  const inboxhandler=()=>{
    setShowInbox(true);
  }

    return(
     <Container>
        <Stack>
            <ButtonGroup vertical>
            <Button onClick={inboxhandler}>Inbox</Button>
            <Button onClick={handleOpen}>Compose</Button>
            <Button as={Link} to="sent">Sent</Button>
            <Button>Starred</Button>
            </ButtonGroup>
            {showModal && (<ComposeEmailForm show={showModal} handleClose={handleClose}/>)}
        </Stack>
        {showInbox && (<Inbox/>)}
     </Container>
    )
}
export default EmailNavigation;