import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import StextField from "../../components/formComponents/StextField";
import Sbutton from "../../components/Sbutton";
import SecondaryUser from "../../services/SecondaryUser";

const ThirdPartyProfile = () => {
  const location = useLocation();
  console.log(location.state);
  const ID = location.state._id;
  const fName = location.state.name.fName;
  const lName = location.state.name.lName;
  const address = location.state.address;

  // const [inputs, setInputs] = useState({});

  // const handleChange = (event) => {
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   setInputs((values) => ({ ...values, [name]: value }));
  // };

  const onSubmit = (e) => {
    e.preventDefault();
    // SecondaryUser.addNew(inputs);
  };

  return (
    <div>
      <Typography variant="h4">
        {fName} {lName}
      </Typography>
      <br />
      <form>
        <StextField
          label="Address"
          name="address"
          // value={inputs.address || ""}
          // onChange={handleChange}
        />
        <Sbutton text="Update" type="submit" onClick={onSubmit} />
      </form>
    </div>
  );
};

export default ThirdPartyProfile;
