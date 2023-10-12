import { Dropdown } from "react-bootstrap";
import {Link} from 'react-router-dom';

const EmailNavigation=()=>{

    return(
     <div>
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">Inbox</Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item as={Link} to='/inbox'>Inbox</Dropdown.Item>
                <Dropdown.Item as={Link} to='/composeemail'>Compose</Dropdown.Item>
                <Dropdown.Item as={Link} to='sent'>Sent</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
     </div>
    )
}
export default EmailNavigation