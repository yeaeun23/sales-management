import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from 'react-bootstrap/Button';
import Typography from "@material-ui/core/Typography";
import { apiPrefix } from "../common";

function BoardDelete(props) {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	}

	const handleClose = () => {
		setOpen(false);
	}

	const handleFormSubmit = () => {
		deleteBoard();
		props.stateRefresh();
	}

	const deleteBoard = () => {
		const api = apiPrefix + '/board/' + props.board_id;
		fetch(api, { method: 'DELETE' });
	}

	return (
		<div style={{ display: "inline-block" }}>
			<Button variant="danger" size="sm" onClick={handleClickOpen}>
				삭제
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				fullWidth={true}
				maxWidth="xs">
				<DialogTitle>공지 삭제</DialogTitle>
				<DialogContent>
					<Typography gutterBottom>
						'{props.title}'을(를) 삭제하시겠습니까?
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button variant="danger" size="sm" onClick={handleFormSubmit}>삭제</Button>
					<Button variant="secondary" size="sm" onClick={handleClose}>취소</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default BoardDelete;
