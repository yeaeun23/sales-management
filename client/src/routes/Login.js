import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import '../App.css';
import Button from 'react-bootstrap/Button';
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

function CustomerList(props) {
  const [id, setID] = useState("");
  const [passwd, setPW] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/');
  }

  return (
    <div>
      <div className={styles.login_top}>
        <div className={styles.top_logo}>
          <img className="top_logo" src="img/logo_sales.png" alt="Sales Master" title="Sales Master" />
        </div>

        <div className={styles.top_notice}>
          <br />▷ 공지사항입니다. 공지사항입니다. 공지사항입니다. 공지사항입니다. 공지사항입니다.
        </div>
      </div>

      <div className={styles.login_bg}>
        <div className={styles.login_contents}>
          <div className={styles.login_logo}>
            {/* <img className="top_logo" src="img/logo_gauge_kor.png" alt="더 게이지" /> */}
          </div>

          <div className={styles.login_inputs}>
            <Form.Control className={styles.login_id} size={props.inputSize} type="text" name="id" maxLength="20" placeholder="아이디" />

            <Form.Control className={styles.login_pw} size={props.inputSize} type="password" name="passwd" maxLength="20" placeholder="비밀번호" />

            <Button className={styles.login_btn} variant="primary" onClick={handleNext}>
              로그인
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerList;
