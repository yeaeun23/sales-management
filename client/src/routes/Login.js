import React, { useState, useEffect } from "react";
import { post } from "axios";
import Form from 'react-bootstrap/Form';
import '../App.css';
import Button from 'react-bootstrap/Button';
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { apiPrefix } from "../common";

function Login() {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.removeItem('user_name');
  }, []);

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
      alert("아이디를 입력해 주세요.");
      document.querySelector("input[name='id']").focus();
    }
    else if (!inputs.pw) {
      alert("비밀번호를 입력해 주세요.");
      document.querySelector("input[name='pw']").focus();
    }
    else {
      const api = apiPrefix + '/login';
      const data = { inputs };
      const config = {
        headers: { 'content-type': 'application/json' }
      };

      post(api, data, config).then(res => {
        if (res.data.code === 9) {
          sessionStorage.setItem('user_name', inputs.id);

          if (sessionStorage.getItem('user_name')) {
            navigate('/');
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

  return (
    <div>
      <div className={styles.login_top}>
        <div className={styles.top_logo}>
          <img className="top_logo" src="img/logo_sales.png" alt="Sales Master" title="Sales Master" />
        </div>
        {/* <div className={styles.top_notice}>
          <br />▷ 공지사항입니다. 공지사항입니다. 공지사항입니다. 공지사항입니다. 공지사항입니다.
        </div> */}
      </div>

      <div className={styles.login_bg}>
        <div className={styles.login_contents}>
          <div className={styles.login_logo}>
            {/* <img className="top_logo" src="img/logo_gauge_kor.png" alt="더 게이지" /> */}
          </div>

          <div className={styles.login_inputs}>
            <Form.Control className={styles.login_id} type="text" name="id" value={inputs.id || ''} onChange={handleValueChange} onKeyUp={handleKeyUp} maxLength="20" placeholder="아이디" required />
            <Form.Control className={styles.login_pw} type="password" name="pw" value={inputs.pw || ''} onChange={handleValueChange} onKeyUp={handleKeyUp} maxLength="20" placeholder="비밀번호" required />
            <Button className={styles.login_btn} type="button" variant="primary" onClick={handleSubmit}>
              로그인
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
