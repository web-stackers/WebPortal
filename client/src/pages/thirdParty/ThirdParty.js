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
        <Sbutton text="Add New" onClick={routeChange}></Sbutton>
        <br /> <br />
        <ThirdPartyList></ThirdPartyList>
      </div>
    </div>
  );
};

export default ThirdParty;
