import Button from "@mui/material//Button";

const Sbutton = ({ text, onClick, btnWidth, marginRight }) => {
  const btnStyle = {
    width: btnWidth,
    marginRight: marginRight,
  };

  return (
    <Button
      variant="contained"
      color="primary"
      style={btnStyle}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default Sbutton;
