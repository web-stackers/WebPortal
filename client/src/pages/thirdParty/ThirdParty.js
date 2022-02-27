import Sbutton from "../../components/Sbutton";
import { useNavigate } from "react-router-dom";
import SecondaryUser from "../../services/SecondaryUser";
import { useEffect, useState } from "react";

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
        {thirdParties.map((thirdParty) => (
          <div key={thirdParty._id}>
            <h3>
              {thirdParty.name.fName} {thirdParty.name.lName}
            </h3>
            {thirdParty.contact.mobile}
            <br />
            {thirdParty.contact.email}
            <br />
            {thirdParty.address}
            <br />
            {thirdParty.verifyDocType}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThirdParty;
