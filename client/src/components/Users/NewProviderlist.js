import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import NewProvider from "../../services/NewProvider";

const useStyles = makeStyles((theme) => {
  return { listOutline: { marginTop: 5 } };
});

const NewProviderlist = () => {
  const [newProviders, setNewProviders] = useState([]);
  const classes = useStyles();

  const fetchUsers = () => {
    NewProvider.fetchNewProviders()
      .then((response) => {
        setNewProviders(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      {newProviders.map((newProvider) => (
        <h3>{newProvider.name.fName}</h3>
      ))}
    </div>
  );
};

export default NewProviderlist;