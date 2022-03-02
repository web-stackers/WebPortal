import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";

const ThirdPartyProfile = () => {
  const location = useLocation();
  console.log(location.state);
  const ID = location.state._id;
  const fName = location.state.name.fName;
  const lName = location.state.name.lName;
  const address = location.state.address;
  return (
    <div>
      <Typography variant="h4">
        {fName} {lName}
      </Typography>
    </div>
  );
};

export default ThirdPartyProfile;
