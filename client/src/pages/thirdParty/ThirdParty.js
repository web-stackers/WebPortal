import Sbutton from "../../components/Sbutton";
import ThirdPartyList from "../../components/thirdParty/ThirdPartyList";
import { Link } from "react-router-dom";
import AlertMUITemplate from "react-alert-template-mui";
import { positions, Provider } from "react-alert";

const options = {
  position: positions.MIDDLE,
};

const ThirdParty = () => {
  return (
    <div>
      <div>
        {/* Adding new third party user, it will br redirected to new page */}
        <Link to="/addNewThirdParty" className="link">
          <Sbutton text="Add New" btnWidth="25%" />
        </Link>
        <br /> <br />
        {/* Retreiving card structure of third party created in thirdparty list */}
        <Provider template={AlertMUITemplate} {...options}>
          <ThirdPartyList template={AlertMUITemplate} />
        </Provider>
      </div>
    </div>
  );
};

export default ThirdParty;
