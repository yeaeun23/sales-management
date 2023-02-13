import React, { useState, useEffect } from "react";
import { post, put } from "axios";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from '@material-ui/core/DialogContent';
import Button from 'react-bootstrap/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

function TGPAdd(props) {
	const [open, setOpen] = useState(false);
	const [status, setStatus] = useState([]);
	const [tgpName, setTgpName] = useState("");
	const [tgpStatus, setTgpStatus] = useState(0);

	useEffect(() => {
		if (props.kind === "edit") {
			setTgpName(props.name);
			setTgpStatus(props.status_code);
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

	const handleClose = (e) => {
		setTgpName("");
		setTgpStatus(0);
		setOpen(false);
	}

	const handleValueChange = (e) => {
		setTgpName(e.target.value);
	}

	const handleSelectChange = (e) => {
		setTgpStatus(e.target.value);
	}

	const handleFormSubmit = () => {
		if (tgpName !== "") {
			addTgp().then((res) => {
				props.stateRefresh(); // 목록 새로고침
			});

			setTgpName("");
			setTgpStatus(0);
      setOpen(false);
		}
	}

	const addTgp = () => {
		let url = '/tgp/';
		url += (props.kind === "add") ? props.customer_id : props.tgp_id;

		const data = {
			name: tgpName,
			status: tgpStatus
		};

		const config = {
			headers: { 'content-type': 'application/json' }
		};

		if (props.kind === "add") {
			return post(url, data, config);
		}
		else {
			return put(url, data, config);
		}
	}

	return (
		<div>
			<Button variant={(props.kind === "add") ? "primary" : "secondary"} size="sm" onClick={handleClickOpen}>
				{(props.kind === "add") ? "TGP 추가" : "수정"}
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				fullWidth={true}
				maxWidth="xs">
				<DialogTitle>
					TGP {(props.kind === "add") ? "추가" : "수정"}
				</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						fullWidth
						label="TGP 이름"
						type="text"
						name="tgpName"
						value={tgpName}
						onChange={handleValueChange}
						inputProps={{ maxLength: 20 }}
						placeholder="20자 이내">
					</TextField>
					<br /><br />
					<TextField
						fullWidth
						label="진행 상태"
						select
						name="tgpStatus"
						value={tgpStatus}
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

export default TGPAdd;
