import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Typography from '@mui/material/Typography';
import Button from 'react-bootstrap/Button';
import { apiPrefix } from '../common';

function BoardAdd(props) {
  const [open, setOpen] = useState(false);
  const [board, setBoard] = useState({});

  const handleClickOpen = () => () => {
    callApi()
      .then(res => {
        if (props.kind === "add") {
          setBoard({});
        }
        else {
          setBoard(res[0]);
        }
      })
      .then(() => {
        setOpen(true);
      })
      .catch(err => console.log(err));
  };

  const callApi = async () => {
    const response = await fetch(apiPrefix + '/board/' + props.board_id);
    const body = await response.json();
    return body;
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleValueChange = (e) => {
    let { name, value } = e.target;
    setBoard({ ...board, [name]: value });
  }

  const handleFormSubmit = () => {
    if (!board.title) {
      alert("제목을 입력하세요.");
    }
    else if (!board.contents) {
      alert("내용을 입력하세요.");
    }
    else {
      addBoard().then(() => {
        props.stateRefresh(); // 목록 새로고침
      });
      setOpen(false);
    }
  }

  const addBoard = () => {
    // let api = apiPrefix+'/board/';
    // api += (props.kind === "add") ? props.customer_id : props.tgp_id;

    // const data = {
    // 	name: tgpName,
    // 	status: tgpStatus
    // };

    // const config = {
    // 	headers: { 'content-type': 'application/json' }
    // };

    // if (props.kind === "add") {
    // 	return post(api, data, config);
    // }
    // else {
    // 	return put(api, data, config);
    // }
  }

  return (
    <div style={{ display: "inline-block" }}>
      <Button variant={(props.kind === "add") ? "primary" : "secondary"} size="sm" onClick={handleClickOpen}>
				{(props.kind === "add") ? "공지사항 등록" : "수정"}
			</Button>

      <Dialog
        fullWidth={true}
        maxWidth='md'
        open={open}
        onClose={handleClose}
        scroll='paper'
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description">

        <DialogTitle>{props.title}</DialogTitle>

        <DialogContent dividers>
          <Typography gutterBottom>{board.contents}</Typography>
        </DialogContent>

        <DialogActions>
          {
            props.kind === "view" ?
              <DialogContentText style={{ position: 'absolute', left: '24px' }}>
                {props.writer} | {board.make_time} 등록
              </DialogContentText>
              : ""
          }

          <Button variant="primary" size="sm" onClick={handleFormSubmit}>
            {
              (props.kind === "add") ? "등록" :
                (props.kind === "edit") ? "수정" : ""
            }
          </Button>

          <Button variant="secondary" size="sm" onClick={handleClose}>닫기</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default BoardAdd;
