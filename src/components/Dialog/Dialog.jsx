import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: "100%",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
    width: "100%",
  },
}));

export default function DialogModel(props) {
  return (
    <React.Fragment>
      <BootstrapDialog
        fullWidth={true}
        maxWidth={"xl"}
        onClose={props.handleDialogClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {props.title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={props.handleDialogClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>{props.description}</DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={props.handleFormSubmit}>
            Save changes
          </Button>
        </DialogActions> */}
      </BootstrapDialog>
    </React.Fragment>
  );
}

DialogModel.propTypes = {
  title: PropTypes.string.isRequired,
  handleDialogClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  description: PropTypes.object.isRequired,
};
