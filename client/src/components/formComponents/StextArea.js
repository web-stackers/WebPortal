import * as React from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const StextArea=()=> {
  return (
    <TextareaAutosize
      aria-label="minimum height"
      minRows={3}
      placeholder="Response"
      style={{ width: 550 }}
    />
  );
}

export default StextArea;
