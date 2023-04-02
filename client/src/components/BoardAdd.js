import React, { useState } from "react";
import { post, put } from "axios";
import { Link } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Typography from '@mui/material/Typography';
import Button from 'react-bootstrap/Button';
import TextField from '@material-ui/core/TextField';
import { apiPrefix } from '../common/common';

function BoardAdd(props) {
  const [open, setOpen] = useState(false);
  const [board, setBoard] = useState({});
  const htmlTag1 = '<img src="이미지URL" width="100%" />';
  const htmlTag2 = ' <b>굵게</b>, <u>밑줄</u>, <i>기울게</i>, <big>크게</big>, <small>작게</small>, <center>가운데</center>, <font color="blue">파란색</font>';

  const handleClickOpen = () => {
    if (props.kind === "add") {
      setOpen(true);
    }
    else {
      callApi()
        .then(res => {
          setBoard(res[0]);
        })
        .then(() => {
          setOpen(true);
        })
        .catch(err => console.log(err));
    }
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
      document.querySelector("input[name='title']").focus();
    }
    else if (!board.contents) {
      alert("내용을 입력하세요.");
      document.querySelector("textarea[name='contents']").focus();
    }
    else {
      addBoard().then(() => {
        props.stateRefresh(); // 목록 새로고침
      });
      setOpen(false);
    }
  }

  const addBoard = () => {
    let api = apiPrefix + '/board';
    const data = { board };
    const config = {
      headers: { 'content-type': 'application/json' }
    };

    if (props.kind === "add") {
      return post(api, data, config);
    }
    else {
      api += "/" + props.board_id;
      return put(api, data, config);
    }
  }

  return (
    <div style={{ display: props.kind === "view" ? "block" : "inline-block" }}>
      {props.kind === "view" ?
        <Link style={{ display: 'block' }} onClick={handleClickOpen}>{props.title}</Link>
        :
        (<Button variant={(props.kind === "add") ? "primary" : "secondary"} size="sm" onClick={handleClickOpen}>
          {(props.kind === "add") ? "공지 등록" : "수정"}
        </Button>)
      }

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="lg"
        scroll="paper">
        <DialogTitle>
          {props.kind === "view" ?
            board.title
            :
            <TextField
              autoFocus
              fullWidth
              variant="outlined"
              size="small"
              type="text"
              name="title"
              value={board.title || ''}
              onChange={handleValueChange}
              inputProps={{ maxLength: 50 }}
              placeholder="제목을 입력하세요. (50자 이내)">
            </TextField>
          }
        </DialogTitle>
        <DialogContent dividers>
          {props.kind === "view" ?
            <Typography gutterBottom>
              {board.contents ?
                <span dangerouslySetInnerHTML={{ __html: board.contents.replace(/\n/g, '<br />') }}></span>
                : ""
              }
            </Typography>
            :
            <span>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                multiline
                minRows={20}
                type="text"
                name="contents"
                value={board.contents || ''}
                onChange={handleValueChange}
                inputProps={{ maxLength: 1000 }}
                placeholder="내용을 입력하세요. (1000자 이내)">
              </TextField>
              <DialogContentText>
                <small>
                  * 이미지 : {htmlTag1}<br />
                  * 텍스트 : {htmlTag2}
                </small>
              </DialogContentText>
            </span>
          }
        </DialogContent>
        <DialogActions>
          {props.kind === "view" ?
            <DialogContentText style={{ position: 'absolute', left: '24px' }}>
              {board.writer} | {board.make_time} 등록 | {board.update_time} 수정
            </DialogContentText>
            : ""
          }
          {props.kind === "edit" ?
            <DialogContentText style={{ position: 'absolute', left: '24px' }}>
              {board.writer} | {board.make_time} 등록
            </DialogContentText>
            : ""
          }

          {props.kind === "add" ?
            <Button variant="primary" size="sm" onClick={handleFormSubmit}>등록</Button>
            : ""
          }
          {props.kind === "edit" ?
            <Button variant="primary" size="sm" onClick={handleFormSubmit}>수정</Button>
            : ""
          }
          {props.kind === "view" ?
            <Button variant="secondary" size="sm" onClick={handleClose}>닫기</Button>
            : <Button variant="secondary" size="sm" onClick={handleClose}>취소</Button>
          }
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default BoardAdd;
