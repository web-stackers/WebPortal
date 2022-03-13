import React from 'react';
import { useState } from 'react';

import Topbar from "../../components/Users/Topbar";
import Userlist from "../../components/Users/Userlist";

import Consumer from "../../services/Consumer";
import Provider from "../../services/Provider";

const Users = () => {
    const [user, setUser] = useState('Consumers');
    const [users, setUsers] = useState([]);

    const fetchUsers = () => {
        if(user=='Consumers'){
          Consumer.fetchConsumers()
            .then((response) => {
              setUsers(response.data);
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          Provider.fetchProviders()
            .then((response) => {
              setUsers(response.data);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      };

    return ( 
        <>
            <Topbar type={user} setType={setUser} setUsers={setUsers} fetchUsers={fetchUsers}/>
            <Userlist type={user} users={users} setUsers={setUsers}  fetchUsers={fetchUsers}/>
        </>
     );
}
 
export default Users;