import React from "react";
import PropTypes from "prop-types";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";

const DeleteConfirmationModal = ({ open, handleClose, handleDelete }) => {
	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Delete Confirmation</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Are you sure you want to delete this item?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color='primary'>
					Cancel
				</Button>
				<Button onClick={handleDelete} color='error' autoFocus>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
};

DeleteConfirmationModal.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	handleDelete: PropTypes.func.isRequired,
};

export default DeleteConfirmationModal;
