import React from "react";
import useStyles from "./styles";
import Card from "@mui/material//Card";
import CardContent from "@mui/material//CardContent";
import { Typography } from "@mui/material";
import StextArea from "../../../../components/formComponents/StextArea";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const Email = () => {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.root}>
        {/* <CardContent>
          <div alignItems='center'>
            <Typography className={classes.content}>
              Mention your queries below
            </Typography>
          </div>
          <div className={classes.div}>
            <TextareaAutosize
              className={classes.div}
              aria-label="minimum height"
              minRows={3}
              placeholder="Enter your queries"
              style={{
                margin: "auto",
                color: "white",
                // width: "400%",
                backgroundColor: "black",
                alignSelf: "center",
                alignItems: "center",
              }}
            />
          </div>
        </CardContent> */}
        <Typography>Email</Typography>
      </Card>
    </div>
  );
};

export default Email;
