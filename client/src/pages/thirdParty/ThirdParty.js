import Sbutton from "../../components/Sbutton";
import { useNavigate } from "react-router-dom";
import SecondaryUser from "../../services/SecondaryUser";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const ThirdParty = () => {
  const navigate = useNavigate();
  const routeChange = () => {
    let path = "/addNewThirdParty";
    navigate(path);
  };

  const [thirdParties, setThirdParties] = useState([]);

  const fetchUsers = () => {
    SecondaryUser.fetchThirdParty()
      .then((response) => {
        setThirdParties(response.data);
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
      <div>
        <Sbutton text="Add New" onClick={routeChange}></Sbutton>
        <br /> <br />
        {thirdParties.map((thirdParty) => (
          <div key={thirdParty._id}>
            <br />
            <Card sx={{ maxWidth: 445 }} variant="outlined">
              <CardMedia
                component="img"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {thirdParty.name.fName} {thirdParty.name.lName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {thirdParty.contact.mobile}
                  <br />
                  {thirdParty.contact.email}
                  <br />
                  {thirdParty.address}
                  <br />
                  {thirdParty.verifyDocType}
                </Typography>
              </CardContent>
              <CardActions>
                <Sbutton text="Edit" onClick={routeChange}></Sbutton>
                <Sbutton text="Disable" onClick={routeChange}></Sbutton>
              </CardActions>
            </Card>
            <br />
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThirdParty;
