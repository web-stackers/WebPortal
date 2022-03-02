import TextareaAutosize from "@mui/material/TextareaAutosize";

const StextArea = () => {
  return (
    <div>
      <TextareaAutosize
        aria-label="empty textarea"
        minRows={3}
        style={{ width: 500, marginTop: 30, marginBottom: 30 }}
      />
    </div>
  );
};

export default StextArea;
