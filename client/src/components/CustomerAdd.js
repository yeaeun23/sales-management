import React, { useState } from "react";
import { post, put } from "axios";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from '@material-ui/core/DialogContent';
import Button from 'react-bootstrap/Button';
import TextField from '@material-ui/core/TextField';
import { apiPrefix } from "../common";

function CustomerAdd(props) {
	const [open, setOpen] = useState(false);
	const [customerName, setCustomerName] = useState("");

	const handleClickOpen = () => {
		if (props.kind === "edit") {
			setCustomerName(props.name);
		}
		else {
			setCustomerName("");
		}
		setOpen(true);
	}

	const handleClose = () => {
		setOpen(false);
	}

	const handleValueChange = (e) => {
		setCustomerName(e.target.value);
	}

	const handleFormSubmit = () => {
		if (customerName === "" || customerName === undefined) {
			alert("거래처 이름을 입력하세요.");
		}
		else {
			addCustomer().then(() => {
				props.stateRefresh(); // 목록 새로고침
			});
			setOpen(false);
		}
	}

	const addCustomer = () => {
		let api = apiPrefix+'/customer/1';
		api += (props.kind === "add") ? '' : '/' + props.customer_id;

		const data = {
			name: customerName,
			status: 0
		};

		const config = {
			headers: { 'content-type': 'application/json' }
		};

		if (props.kind === "add") {
			return post(api, data, config);
		}
		else {
			return put(api, data, config);
		}
	}

	return (
		<div style={{ display: "inline-block" }}>
			<Button variant={(props.kind === "add") ? "primary" : "secondary"} size="sm" onClick={handleClickOpen}>
				{(props.kind === "add") ? "거래처 생성" : "수정"}
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				fullWidth={true}
				maxWidth="xs">
				<DialogTitle>
					거래처 {(props.kind === "add") ? "생성" : "수정"}
				</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						fullWidth
						required
						label="거래처 이름"
						type="text"
						name="customerName"
						value={customerName || ''}
						onChange={handleValueChange}
						inputProps={{ maxLength: 20 }}
						placeholder="20자 이내">
					</TextField>
					<br /><br />
				</DialogContent>
				<DialogActions>
					<Button variant="primary" size="sm" onClick={handleFormSubmit}>
						{(props.kind === "add") ? "생성" : "수정"}
					</Button>
					<Button variant="secondary" size="sm" onClick={handleClose}>
						취소
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default CustomerAdd;
