import Sbutton from "../../../components/Sbutton";
import ThirdPartyList from "../../../components/thirdParty/ThirdPartyList";
import { Link } from "react-router-dom";
import { Provider } from "react-alert";

const ThirdParty = () => {
  return (
    <div>
      <div>
        {/* Adding new third party user, it will br redirected to new page */}
        <Link to="/admin/thirdParty/addNewThirdParty" className="link">
          <Sbutton text="Add New" btnWidth="25%" />
        </Link>
        <br /> <br />
        {/* Provider is the container for all React Spectrum applications. It
        defines the theme, locale, and other application level settings, and can
        also be used to provide common properties to a group of components. */}
        {/* Retreiving card structure of third party created in thirdparty list */}
        <Provider>
          <ThirdPartyList />
        </Provider>
      </div>
    </div>
  );
};

export default ThirdParty;
