import React, { useState } from "react";
import { post, put } from "axios";
import { Link } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from '@material-ui/core/DialogContent';
import Button from 'react-bootstrap/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import * as common from "../common/common";

function UserAdd(props) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState([]);
  const [user, setUser] = useState({});

  const handleClickOpen = () => {
    if (props.kind === "view") {
      getUser()
        .then(res => setUser(res[0]))
        .then(() => setOpen(true))
        .catch(err => console.log(err));
    }
    else {
      getStatus()
        .then(res => setStatus(res))
        .then(() => {
          if (props.kind === "add") {
            setUser({});
          }
          else {
            getUser().then(res => setUser(res[0]));
          }
        })
        .then(() => setOpen(true))
        .catch(err => console.log(err));
    }
  };

  const getStatus = async () => {
    const response = await fetch(common.apiPrefix + '/user-status');
    const body = await response.json();
    return body;
  }

  const getUser = async () => {
    const response = await fetch(common.apiPrefix + '/user-detail/' + props.user_id);
    const body = await response.json();
    return body;
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    common.setLogout(user.name);
    alert("로그아웃 처리되었습니다.");
    setOpen(false);
  }

  const handleValueChange = (e) => {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  const handleFormSubmit = () => {
    if (props.kind === "add") {
      if (!user.name) {
        alert("아이디를 입력하세요.");
        document.querySelector("input[name='name']").focus();
      }
      else {
        checkID().then(res => {
          if (res.length !== 0) {
            alert("사용할 수 없는 아이디입니다.");
            document.querySelector("input[name='name']").focus();
          }
          else {
            checkInputs();
          }
        })
      }
    }
    else {
      checkInputs();
    }
  }

  const checkInputs = () => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;

    if (!user.passwd) {
      alert("비밀번호를 입력하세요.");
      document.querySelector("input[name='passwd']").focus();
    }
    else if (sessionStorage.getItem("user_status") !== "9" && !passwordRegex.test(user.passwd)) {
      alert("8~20자리의 영문+숫자+특수문자(!@#$%^*+=-)를 포함하세요.");
      document.querySelector("input[name='passwd']").focus();
    }
    else if (!user.passwd_check) {
      alert("비밀번호 확인을 입력하세요.");
      document.querySelector("input[name='passwd_check']").focus();
    }
    else if (user.passwd !== user.passwd_check) {
      alert("비밀번호 확인이 일치하지 않습니다.");
      document.querySelector("input[name='passwd_check']").focus();
    }
    else {
      addUser().then(() => props.stateRefresh());
      setOpen(false);
    }
  }

  const checkID = async () => {
    const response = await fetch(common.apiPrefix + '/user-check/' + user.name);
    const body = await response.json();
    return body;
  }

  const addUser = () => {
    let api = common.apiPrefix + '/user';
    const data = { user };
    const config = {
      headers: { 'content-type': 'application/json' }
    };

    if (props.kind === "add") {
      return post(api, data, config);
    }
    else {
      api += "/" + props.user_id;
      return put(api, data, config);
    }
  }

  return (
    <div style={{ display: props.kind === "view" ? "block" : "inline-block" }}>
      {props.kind === "view" ?
        <Link style={{ display: 'block' }} onClick={handleClickOpen}>{props.name}</Link>
        :
        (<Button variant={(props.kind === "add") ? "primary" : "secondary"} size="sm" onClick={handleClickOpen}>
          {(props.kind === "add") ? "계정 추가" : "수정"}
        </Button>)
      }

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="xs">
        <DialogTitle>
          계정&nbsp;
          {(props.kind === "view") ? "보기" : (props.kind === "add") ? "추가" : "수정"}
        </DialogTitle>
        <DialogContent>
          {props.kind === "add" ?
            <TextField
              autoFocus
              fullWidth
              required
              label="아이디"
              type="text"
              name="name"
              value={user.name || ''}
              onChange={handleValueChange}
              inputProps={{ maxLength: 20 }}
              placeholder="20자 이내" />
            :
            <TextField
              InputProps={{ readOnly: true, disableUnderline: true }}
              fullWidth
              label="아이디"
              value={user.name || ''} />
          }
          <br /><br />

          {props.kind === "view" ?
            <TextField
              InputProps={{ readOnly: true, disableUnderline: true }}
              fullWidth
              label="비밀번호"
              value={user.passwd || ''} />
            :
            <TextField
              fullWidth
              required
              label="비밀번호"
              type="password"
              name="passwd"
              value={user.passwd || ''}
              onChange={handleValueChange}
              inputProps={{ maxLength: 20 }}
              placeholder="20자 이내" />
          }
          <br /><br />

          {props.kind === "view" ?
            ""
            :
            <span>
              <TextField
                fullWidth
                required
                label="비밀번호 확인"
                type="password"
                name="passwd_check"
                value={user.passwd_check || ''}
                onChange={handleValueChange}
                inputProps={{ maxLength: 20 }}
                placeholder="20자 이내" />
              <br /><br />
            </span>
          }

          {props.kind === "view" ?
            <span>
              <TextField
                InputProps={{ readOnly: true, disableUnderline: true }}
                fullWidth
                label="활성 상태"
                value={user.status || ''} />
              <br /><br />
            </span>
            :
            (sessionStorage.getItem("user_status") === "9" ?
              <span>
                <TextField
                  fullWidth
                  required
                  label="활성 상태"
                  select
                  name="status_code"
                  value={user.status_code || 0}
                  onChange={handleValueChange}>
                  {
                    status.map((c) => {
                      return <MenuItem key={c.code} value={c.code}>{c.status}</MenuItem>
                    })
                  }
                </TextField>
                <br /><br />
              </span>
              : ""
            )
          }

          {props.kind === "view" ?
            <span>
              <TextField
                InputProps={{ readOnly: true, disableUnderline: true }}
                fullWidth
                label="메모"
                value={user.memo || '-'} />
              <br /><br />
            </span>
            :
            (sessionStorage.getItem("user_status") === "9" ?
              <span>
                <TextField
                  fullWidth
                  label="메모"
                  type="text"
                  name="memo"
                  value={user.memo || ''}
                  onChange={handleValueChange}
                  inputProps={{ maxLength: 50 }}
                  placeholder="50자 이내" />
                <br /><br />
              </span>
              : ""
            )
          }

          {props.kind === "view" ?
            <span>
              <TextField
                InputProps={{ readOnly: true, disableUnderline: true }}
                fullWidth
                label="추가일"
                value={user.make_time || ''} />
              <br /><br />
            </span>
            : ""
          }

          {props.kind === "view" ?
            <span>
              <TextField
                InputProps={{ readOnly: true, disableUnderline: true }}
                fullWidth
                label="수정일"
                value={user.update_time || ''} />
              <br /><br />
            </span>
            : ""
          }

          {props.kind === "view" ?
            <TextField
              InputProps={{ readOnly: true, disableUnderline: true }}
              fullWidth
              label="로그인 IP"
              value={user.login_ip || '-'} />
            : ""
          }
        </DialogContent>
        <DialogActions>
          {props.kind === "add" ?
            <Button variant="primary" size="sm" onClick={handleFormSubmit}>추가</Button>
            : ""
          }
          {props.kind === "edit" ?
            <Button variant="primary" size="sm" onClick={handleFormSubmit}>수정</Button>
            : ""
          }
          {props.kind === "view" && sessionStorage.getItem("user_status") === "9" ?
            <Button variant="secondary" size="sm" onClick={handleLogout}>로그아웃</Button>
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

export default UserAdd;
