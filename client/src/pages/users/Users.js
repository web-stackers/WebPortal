import React from 'react';
import { useState } from 'react';

import Topbar from "../../components/Users/Topbar";
import Userlist from "../../components/Users/Userlist";

const Users = () => {
    const [user, setUser] = useState('Consumers');

    return ( 
        <>
            <Topbar type={user} setType={setUser}/>
            <Userlist type={user}/>
        </>
     );
}
 
export default Users;