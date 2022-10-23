import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from 'react-bootstrap/Button';
import Typography from "@material-ui/core/Typography";

function TGPDelete(props) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const deleteTGP = (id1, id2) => {
        const url = '/api/customer/' + id1 + '/' + id2;

        fetch(url, {
            method: 'DELETE'
        });
        props.stateRefresh(); // 목록 새로고침
    }

    return (
        <div>
            <Button variant="danger" size="sm" onClick={handleOpen}>삭제</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle onClose={handleClose}>삭제</DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                        선택한 TGP({props.name})를 삭제하시겠습니까?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="danger" onClick={(e) => { deleteTGP(props.customer_id, props.tgp_id) }}>삭제</Button>
                    <Button variant="secondary" onClick={handleClose}>취소</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default TGPDelete;
