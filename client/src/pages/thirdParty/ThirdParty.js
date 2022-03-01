import Sbutton from "../../components/Sbutton";
import { useNavigate } from "react-router-dom";
import ThirdPartyList from "../../components/thirdParty/ThirdPartyList";

const ThirdParty = () => {
  const navigate = useNavigate();
  const routeChange = () => {
    let path = "/addNewThirdParty";
    navigate(path);
  };

  return (
    <div>
      <div>
        <Sbutton text="Add New" onClick={routeChange} btnWidth="25%"></Sbutton>
        <br /> <br />
        {/* Retreiving card structure of third party created in thirdparty list */}
        <ThirdPartyList />
      </div>
    </div>
  );
};

export default ThirdParty;
