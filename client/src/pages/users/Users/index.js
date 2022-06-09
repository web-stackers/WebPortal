import React from 'react';
import { useState } from 'react';
import AlertBox from '../../../components/AlertBox';

import Topbar from "../../../components/Users/Topbar";
import Userlist from "../../../components/Users/Userlist";

import Consumer from "../../../services/Consumer";
import Provider from "../../../services/Provider";

const Users = () => {
    const [user, setUser] = useState('Consumers');
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");
    const [alert, setAlert] = useState("");

    // Fetch all users based on user type
    // Need to be merged
    const fetchUsers = () => {
        setLoading(true);
        if(user==='Consumers'){
          Consumer.fetchConsumers()
            .then((response) => {
              setUsers(response.data);
              setLoading(false);
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          Provider.fetchProviders()
            .then((response) => {
              setUsers(response.data);
              setLoading(false);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      };

    return ( 
        <>
            <Topbar 
              type={user}  
              setType={setUser} 
              setUsers={setUsers} 
              fetchUsers={fetchUsers}
              setAlertTitle={setAlertTitle}
              setAlert={setAlert} 
              setAlertOpen={setOpen}
              setLoading={setLoading} 
            />

            <Userlist 
              type={user} 
              users={users} 
              fetchUsers={fetchUsers} 
              loading={loading}
            />

            <AlertBox 
              open={open}  
              alert={alert} 
              setOpen={setOpen} 
              alertTitle={alertTitle}
            />
        </>
     );
}
 
export default Users;