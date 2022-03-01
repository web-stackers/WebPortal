import Sbutton from "../../components/Sbutton";
import ThirdPartyList from "../../components/thirdParty/ThirdPartyList";
import { Link } from "react-router-dom";

const ThirdParty = () => {
  return (
    <div>
      <div>
        <Link to="/addNewThirdParty" className="link">
          <Sbutton text="Add New" btnWidth="25%" />
        </Link>
        <br /> <br />
        {/* Retreiving card structure of third party created in thirdparty list */}
        <ThirdPartyList />
      </div>
    </div>
  );
};

export default ThirdParty;
