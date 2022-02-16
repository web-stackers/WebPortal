import Button from "@mui/material//Button";

const Sbutton = ({ text, onClick, btnWidth }) => {
  const btnStyle = {
    width: btnWidth,
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
