import Button from "@mui/material//Button";

const Sbutton = ({ text, onClick, btnWidth, marginRight, marginLeft }) => {
  const btnStyle = {
    width: btnWidth,
    marginRight: marginRight,
    marginLeft: marginLeft,
    outline: 'none'
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      style={btnStyle}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default Sbutton;
