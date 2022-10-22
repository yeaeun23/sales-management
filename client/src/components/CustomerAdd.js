import React, { useState } from "react";
import { post } from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Button from 'react-bootstrap/Button';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    hidden: {
        display: 'none'
    }
});

function CustomerAdd(props) {
    const [tgpName, setTgpName] = useState("");
    const [open, setOpen] = useState(false);

    const handleFormSubmit = (e) => {
        e.preventDefault()

        addCustomer()
            .then((response) => {
                props.stateRefresh(); // 고객 목록만 새로고침
            })

        setTgpName("");
        setOpen(false);
    }

    const handleValueChange = (e) => {
        setTgpName(e.target.value);
    }

    const addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('name', tgpName);

        const config = { // 파일 포함 시
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        return post(url, formData, config);
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setTgpName("");
        setOpen(false);
    }

    return (
        <div>
            <Button variant="primary" size="sm" onClick={handleClickOpen}>
                추가
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>TGP 추가</DialogTitle>
                <DialogContent>
                    <TextField label="이름" type="text" name="tgpName" value={tgpName} onChange={handleValueChange} />
                </DialogContent>
                <DialogActions>
                    <Button variant="primary" size="sm" onClick={handleFormSubmit}>추가</Button>
                    <Button variant="secondary" size="sm" onClick={handleClose}>취소</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default withStyles(styles)(CustomerAdd);
