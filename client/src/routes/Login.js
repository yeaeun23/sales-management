import React, { useState, useEffect } from "react";
import { post, put } from "axios";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import * as common from "../common/common";

function Login() {
  const [inputs, setInputs] = useState({});
  const [ip, setIP] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getIP().then(res => setIP(res.ip === "" ? "모바일" : res.ip));

    if (sessionStorage.getItem('user_name')) {
      common.setLogout(sessionStorage.getItem('user_name'));
      sessionStorage.removeItem('user_name');
      sessionStorage.removeItem('user_status');
    }
  }, []);

  const getIP = async () => {
    const response = await fetch("https://api.ipify.org/?format=json");
    const body = await response.json();
    return body;
  };

  const handleValueChange = (e) => {
    let { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  }

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  }

  const handleSubmit = () => {
    if (!inputs.id) {
      alert("아이디를 입력하세요.");
      document.querySelector("input[name='id']").focus();
    }
    else if (!inputs.pw) {
      alert("비밀번호를 입력하세요.");
      document.querySelector("input[name='pw']").focus();
    }
    else {
      const api = common.apiPrefix + '/login';
      const data = { inputs, ip };
      const config = {
        headers: { 'content-type': 'application/json' }
      };

      post(api, data, config).then(res => {
        if (res.data.code === 9) {
          sessionStorage.setItem('user_name', inputs.id);
          sessionStorage.setItem('user_status', res.data.status);

          if (sessionStorage.getItem('user_name') && sessionStorage.getItem('user_status')) {
            setLogin().then(() => navigate('/account'));
          }
          else {
            alert("로그인 에러!");
          }
        }
        else if (res.data.code === 3) {
          alert(res.data.msg);
          document.querySelector("input[name='pw']").focus();
        }
        else {
          alert(res.data.msg);
          document.querySelector("input[name='id']").focus();
        }
      }).catch(err => console.log(err.response.data));
    }
  }

  const setLogin = () => {
    const api = common.apiPrefix + '/login';
    const data = { inputs, ip };
    const config = {
      headers: { 'content-type': 'application/json' }
    };
    return put(api, data, config);
  }

  return (
    <div className={styles.login_container}>
      <div className={styles.login_right}>
        <div className={styles.login_right_contents}>
          <div className={styles.login_inputs}>
            <img src={process.env.PUBLIC_URL + "/img/logo_sales.png"} alt="Sales Master" />

            <Form.Control className={styles.login_id} type="text" name="id" value={inputs.id || ''} onChange={handleValueChange} onKeyUp={handleKeyUp} maxLength="20" placeholder="아이디를 입력하세요." required />

            <Form.Control className={styles.login_pw} type="password" name="pw" value={inputs.pw || ''} onChange={handleValueChange} onKeyUp={handleKeyUp} maxLength="20" placeholder="비밀번호를 입력하세요." required />

            <Button className={styles.login_btn} type="button" variant="primary" onClick={handleSubmit}>
              로그인
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.login_left}></div>
    </div>
  );
}

export default Login;
