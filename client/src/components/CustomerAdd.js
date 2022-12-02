import React, { useState, useEffect } from "react";
import { post, put } from "axios";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from '@material-ui/core/DialogContent';
import Button from 'react-bootstrap/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

function CustomerAdd(props) {
	const [open, setOpen] = useState(false);
	const [status, setStatus] = useState([]);
	const [customerName, setCustomerName] = useState("");
	const [customerStatus, setCustomerStatus] = useState(0);

	useEffect(() => {
		if (props.kind === "edit") {
			setCustomerName(props.name);
			setCustomerStatus(props.status_code);
		}

		callApi()
			.then(res => setStatus(res))
			.catch(err => console.log(err));
	}, []);

	const callApi = async () => {
		const response = await fetch('/status');
		const body = await response.json();
		return body;
	}

	const handleClickOpen = () => {
		setOpen(true);
	}

	const handleClose = () => {
		setCustomerName("");
		setCustomerStatus(0);
		setOpen(false);
	}

	const handleValueChange = (e) => {
		setCustomerName(e.target.value);
	}

	const handleSelectChange = (e) => {
		setCustomerStatus(e.target.value);
	}

	const handleFormSubmit = () => {
		if (customerName !== "") {
			addCustomer().then((res) => {
				props.stateRefresh(); // 목록 새로고침
			});

			setCustomerName("");
			setCustomerStatus(0);
			setOpen(false);
		}
	}

	const addCustomer = () => {
		let url = '/customer';
		url += (props.kind === "add") ? '' : '/' + props.customer_id;

		const formData = new FormData();
		formData.append('name', customerName);
		formData.append('status', customerStatus);

		const config = {
			headers: { 'content-type': 'application/json' }
		};

		if (props.kind === "add") {
			return post(url, formData, config);
		}
		else {
			return put(url, formData, config);
		}
	}

	return (
		<div>
			<Button variant={(props.kind === "add") ? "primary" : "secondary"} size="sm" onClick={handleClickOpen}>
				{(props.kind === "add") ? "거래처 추가" : "수정"}
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				fullWidth={true}
				maxWidth="xs">
				<DialogTitle>
					거래처 {(props.kind === "add") ? "추가" : "수정"}
				</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						fullWidth
						label="거래처 이름"
						type="text"
						name="customerName"
						value={customerName}
						onChange={handleValueChange}>
					</TextField>
					<br /><br />
					<TextField
						fullWidth
						label="진행 상태"
						select
						name="customerStatus"
						value={customerStatus}
						onChange={handleSelectChange}>
						{
							status.map((c) => {
								return <MenuItem key={c.code} value={c.code}>{c.status}</MenuItem>
							})
						}
					</TextField>
				</DialogContent>
				<DialogActions>
					<Button variant="primary" size="sm" onClick={handleFormSubmit}>
						{(props.kind === "add") ? "추가" : "수정"}
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
