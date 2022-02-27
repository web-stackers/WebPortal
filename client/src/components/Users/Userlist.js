import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import Consumer from "../../services/Consumer";

const useStyles = makeStyles((theme) => {
  return {
    listOutline: {
      marginTop: 5,
    },
  };
});

const Userlist = () => {
  const [consumers, setConsumers] = useState([]);
  const classes = useStyles();

  const fetchUsers = () => {
    Consumer.fetchConsumers()
      .then((response) => {
        setConsumers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className={classes.listOutline}>
      {consumers.map((consumer) => (
        <h3 key={consumer._id}>{consumer.name.fName}</h3>
      ))}
    </div>
  );
};

export default Userlist;
