const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const apiPrefix = '/api';
const fs = require('fs');
const dbConfig = fs.readFileSync('./database.json');
const conf = JSON.parse(dbConfig);
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});

connection.connect(function (err) {
  if (err) throw err;
  console.log('DB Connected!');
});


// 로그인 체크
app.post(apiPrefix + '/login', (req, res) => {
  const id = req.body.inputs.id;
  const pw = req.body.inputs.pw;
  const sql1 = "SELECT * FROM USER WHERE `name` = '" + id + "'";
  const sql2 = "SELECT * FROM USER WHERE `name` = '" + id + "' AND passwd = '" + pw + "'";

  console.log("로그인 ID 조회: " + sql1);
  connection.query(sql1, (err, rows, fields) => {
    if (rows.length === 0) {
      res.send({ 'code': 0, 'msg': '존재하지 않는 아이디입니다.' });
      console.log("로그인 실패(0): " + id);
    }
    else {
      if (rows[0].status === 0) {
        res.send({ 'code': 1, 'msg': '사용이 중지된 아이디입니다.' });
        console.log("로그인 실패(1): " + id);
      }
      else if (rows[0].delete_time !== null) {
        res.send({ 'code': 2, 'msg': '존재하지 않는 아이디입니다.' });
        console.log("로그인 실패(2): " + id);
      }
      else {
        console.log("로그인 PW 조회: " + sql2);
        connection.query(sql2, (err, rows, fields) => {
          if (rows.length === 0) {
            res.send({ 'code': 3, 'msg': '비밀번호가 일치하지 않습니다.' });
            console.log("로그인 실패(3): " + id);
          }
          else {
            res.send({ 'code': 9, 'status': rows[0].status });
            console.log("로그인 성공(9): " + id);
          }
        });
      }
    }
  });
});

// 공지 조회
app.get(apiPrefix + '/board', (req, res) => {
  let sql = "SELECT board_id, title, writer, DATE_FORMAT(make_time, '%Y-%m-%d') AS make_time FROM BOARD WHERE delete_time IS NULL ORDER BY board_id DESC";

  console.log("공지 조회: " + sql);
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});

// 공지 상세
app.get(apiPrefix + '/board/:board_id', (req, res) => {
  let sql = "SELECT title, contents, writer, DATE_FORMAT(update_time, '%Y-%m-%d %H:%i') AS update_time, DATE_FORMAT(make_time, '%Y-%m-%d %H:%i') AS make_time FROM BOARD WHERE board_id = " + req.params.board_id;

  console.log("공지 상세: " + sql);
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});

// 공지 생성
app.post(apiPrefix + '/board', (req, res) => {
  let sql = "INSERT INTO BOARD VALUES (NULL, ?, ?, '관리자', NOW(), NOW(), NULL)";
  let params = [req.body.board.title, req.body.board.contents];

  console.log("공지 생성: " + sql);
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// 공지 수정
app.put(apiPrefix + '/board/:board_id', (req, res) => {
  let sql = "UPDATE BOARD SET title = ?, contents = ?, update_time = NOW() WHERE board_id = ?";
  let params = [req.body.board.title, req.body.board.contents, req.params.board_id];

  console.log("공지 수정: " + sql);
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// 공지 삭제
app.delete(apiPrefix + '/board/:board_id', (req, res) => {
  let sql = "UPDATE BOARD SET delete_time = NOW() WHERE board_id = " + req.params.board_id;

  console.log("공지 삭제: " + sql);
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});

// 활성상태 목록 조회
app.get(apiPrefix + '/user-status', (req, res) => {
  let sql = "SELECT * FROM USER_STATUS ORDER BY code ASC";

  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});

// 아이디 중복 조회
app.get(apiPrefix + '/user-check/:user_name', (req, res) => {
  let sql = "SELECT name FROM USER WHERE name = '" + req.params.user_name + "'";

  console.log("아이디 중복 조회: " + sql);
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});

// 계정 조회
app.get(apiPrefix + '/user', (req, res) => {
  let sql = "SELECT user_id, `name`, (SELECT `status` FROM `USER_STATUS` WHERE `code` = user.`status`) AS `status`, DATE_FORMAT(make_time, '%Y-%m-%d') AS make_time FROM USER user WHERE delete_time IS NULL ORDER BY user_id DESC";

  console.log("계정 조회: " + sql);
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});

// 계정 상세
app.get(apiPrefix + '/user/:user_id', (req, res) => {
  let sql = "SELECT `name`, passwd, (SELECT `status` FROM `USER_STATUS` WHERE `code` = user.`status`) AS `status`, `status` AS status_code, memo, DATE_FORMAT(update_time, '%Y-%m-%d %H:%i') AS update_time, DATE_FORMAT(make_time, '%Y-%m-%d %H:%i') AS make_time FROM USER user WHERE user_id = " + req.params.user_id;

  console.log("계정 상세: " + sql);
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});

// 계정 생성
app.post(apiPrefix + '/user', (req, res) => {
  let sql = "INSERT INTO USER VALUES (NULL, '" + req.body.user.name + "', '" + req.body.user.passwd + "', ?, ?, NOW(), NOW(), NULL)";
  let params = [
    req.body.user.status_code ? req.body.user.status_code : 0,
    req.body.user.memo ? req.body.user.memo : ''
  ];

  console.log("계정 생성: " + sql);
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// 계정 수정
app.put(apiPrefix + '/user/:user_id', (req, res) => {
  let sql = "UPDATE USER SET name = ?, passwd = ?, `status` = ?, memo = ?, update_time = NOW() WHERE user_id = ?";
  let params = [req.body.user.name, req.body.user.passwd, req.body.user.status_code, req.body.user.memo, req.params.user_id];

  console.log("계정 수정: " + sql);
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// 계정 삭제
app.delete(apiPrefix + '/user/:user_id', (req, res) => {
  let sql = "UPDATE USER SET delete_time = NOW() WHERE user_id = " + req.params.user_id;

  console.log("계정 삭제: " + sql);
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});

// 거래처 연도조회
app.get(apiPrefix + '/year/customer/:user_name', (req, res) => {
  let sql = "SELECT DISTINCT(CONCAT(YEAR(make_time), '년')) AS year FROM TGP WHERE delete_time IS NULL AND customer_id IN (SELECT customer_id FROM CUSTOMER WHERE user_id = (SELECT user_id FROM USER WHERE `name` = '" + req.params.user_name + "') AND delete_time IS NULL) ORDER BY YEAR DESC";

  console.log("거래처 연도조회: " + sql);
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});

// 거래처 조회 1
app.get(apiPrefix + '/customer/:user_name/makeyear/:year', (req, res) => {
  console.log(req.params.year)
  let year = req.params.year.replace("년", "");
  let sql = "SELECT customer_id, DATE_FORMAT(make_time, '%Y-%m-%d') AS make_time, `name`, (SELECT SUM(CONVERT(REPLACE((SELECT amount FROM FORM WHERE tgp_id = tgp.tgp_id ORDER BY update_time DESC LIMIT 1), ',', ''), SIGNED)) FROM TGP tgp WHERE customer_id = customer.customer_id AND delete_time IS NULL AND `status` = 1 AND YEAR(make_time) = " + year + ") AS amount_year, (SELECT SUM(CONVERT(REPLACE((SELECT amount FROM FORM WHERE tgp_id = tgp.tgp_id ORDER BY update_time DESC LIMIT 1), ',', ''), SIGNED)) FROM TGP tgp WHERE customer_id = customer.customer_id AND delete_time IS NULL AND `status` = 1) AS amount FROM CUSTOMER customer WHERE user_id = (SELECT user_id FROM USER WHERE `name` = '" + req.params.user_name + "') AND delete_time IS NULL ORDER BY customer_id DESC";

  console.log("거래처 조회: " + sql);
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});

// 거래처 조회 2
app.get(apiPrefix + '/customer/:user_name/makeyear', (req, res) => {
  let sql = "SELECT customer_id, DATE_FORMAT(make_time, '%Y-%m-%d') AS make_time, `name`, '-' AS amount_year, (SELECT SUM(CONVERT(REPLACE((SELECT amount FROM FORM WHERE tgp_id = tgp.tgp_id ORDER BY update_time DESC LIMIT 1), ',', ''), SIGNED)) FROM TGP tgp WHERE customer_id = customer.customer_id AND delete_time IS NULL AND `status` = 1) AS amount FROM CUSTOMER customer WHERE user_id = (SELECT user_id FROM USER WHERE `name` = '" + req.params.user_name + "') AND delete_time IS NULL ORDER BY customer_id DESC";

  console.log("거래처 조회: " + sql);
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});

// 거래처 생성
app.post(apiPrefix + '/customer/:user_name', (req, res) => {
  let sql = "INSERT INTO CUSTOMER VALUES (NULL, (SELECT user_id FROM USER WHERE `name` = '" + req.params.user_name + "'), ?, ?, NOW(), NOW(), NULL)";
  let params = [req.body.name, req.body.status];

  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// 거래처 수정
app.put(apiPrefix + '/customer/:customer_id', (req, res) => {
  let sql = "UPDATE CUSTOMER SET name = ?, status = ?, update_time = NOW() WHERE customer_id = ?";
  let params = [req.body.name, req.body.status, req.params.customer_id];

  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// 거래처 삭제
app.delete(apiPrefix + '/customer/:customer_id', (req, res) => {
  let sql = "UPDATE CUSTOMER SET delete_time = NOW() WHERE customer_id = ?";
  let params = [req.params.customer_id];

  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// 진행상태 목록 조회
app.get(apiPrefix + '/status', (req, res) => {
  let sql = "SELECT * FROM STATUS ORDER BY code ASC";

  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});

// TGP 연도조회
app.get(apiPrefix + '/year/tgp/:customer_id', (req, res) => {
  let sql = "SELECT DISTINCT(CONCAT(YEAR(make_time), '년')) AS year FROM TGP WHERE customer_id = " + req.params.customer_id + " AND delete_time IS NULL ORDER BY make_time DESC";

  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});

// TGP 조회
app.get(apiPrefix + '/tgp/:customer_id/makeyear/:year', (req, res) => {
  let year = req.params.year.replace("년", "");
  let sql = "SELECT tgp_id, DATE_FORMAT(make_time, '%Y-%m-%d') AS make_time, `name`, (SELECT `status` FROM `STATUS` WHERE `code` = tgp.`status`) AS `status`, `status` AS status_code, (SELECT amount FROM FORM WHERE tgp_id = tgp.tgp_id ORDER BY update_time DESC LIMIT 1) AS amount FROM TGP tgp WHERE customer_id = " + req.params.customer_id + " AND delete_time IS NULL" + (year === "all" ? "" : " AND YEAR(make_time) = " + year) + " ORDER BY tgp_id DESC";

  console.log("TGP 조회: " + sql);
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});

// TGP 생성
app.post(apiPrefix + '/tgp/:customer_id', (req, res) => {
  let sql = 'INSERT INTO TGP VALUES (NULL, ?, ?, ?, NOW(), NOW(), NULL);';
  let params = [req.params.customer_id, req.body.name, req.body.status];

  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// TGP 수정
app.put(apiPrefix + '/tgp/:tgp_id', (req, res) => {
  let sql = 'UPDATE TGP SET name = ?, status = ?, update_time = NOW() WHERE tgp_id = ?';
  let params = [req.body.name, req.body.status, req.params.tgp_id];

  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// TGP 삭제
app.delete(apiPrefix + '/tgp/:tgp_id', (req, res) => {
  let sql = 'UPDATE TGP SET delete_time = NOW() WHERE tgp_id = ?';
  let params = [req.params.tgp_id];

  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// TGP 내역 조회
app.get(apiPrefix + '/tgp/:tgp_id/history', (req, res) => {
  let sql = "SELECT form_id, DATE_FORMAT(update_time, '%Y년 %m월 %d일 (%H시 %i분)') AS update_time FROM FORM WHERE tgp_id = " + req.params.tgp_id + " AND complete = 1 AND delete_time IS NULL ORDER BY update_time DESC";

  console.log("TGP 내역 조회: " + sql);
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});

// TGP 이어서 작성
app.get(apiPrefix + '/tgp/:tgp_id/continue', (req, res) => {
  let tgp_id = req.params.tgp_id;

  // 미완료된 form_id 조회
  let sql = "SELECT form_id FROM FORM WHERE tgp_id = " + tgp_id + " AND complete = 0 AND delete_time IS NULL ORDER BY form_id DESC LIMIT 1";

  console.log("TGP 미완료 조회: " + sql);
  connection.query(sql, (err, rows, fields) => {
    if (rows.length === 0) {
      // 없으면 insert
      let sql1 = "INSERT INTO FORM (`tgp_id`, `update_time`, `make_time`, `account`) VALUES(" + tgp_id + ", NOW(), NOW(), (SELECT name FROM CUSTOMER WHERE customer_id = (SELECT customer_id FROM TGP WHERE tgp_id = " + tgp_id + ")))";

      console.log("TGP 생성: " + sql1);
      connection.query(sql1);

      // 다시 조회
      console.log("" + sql);
      connection.query(sql, (err, rows1, fields) => {
        res.send(rows1);
      });
    }
    else {
      // 있으면 form_id 리턴
      res.send(rows);
    }
  });
});

// TGP 복사 
app.get(apiPrefix + '/tgp/:tgp_id/:form_id/copy', (req, res) => {
  let tgp_id = req.params.tgp_id;
  let form_id = req.params.form_id;
  let new_form_id = '';

  // 복사 - FORM           
  sql = "INSERT INTO FORM (`tgp_id`, `update_time`, `make_time`, `account`, `department`, `solution`, `amount`, `closingdate`, `position1`, `position1_sign`, `position2`, `position2_sign`, `position3`, `position3_sign`, `competition1_name`, `competition1_name_sign`, `competition1_type`, `competition1_type_sign`, `competition2_name`, `competition2_name_sign`, `competition2_type`, `competition2_type_sign`, `strategy1_behavior`, `strategy2_behavior`) SELECT `tgp_id`, NOW(), NOW(), `account`, `department`, `solution`, `amount`, `closingdate`, `position1`, `position1_sign`, `position2`, `position2_sign`, `position3`, `position3_sign`, `competition1_name`, `competition1_name_sign`, `competition1_type`, `competition1_type_sign`, `competition2_name`, `competition2_name_sign`, `competition2_type`, `competition2_type_sign`, `strategy1_behavior`, `strategy2_behavior` FROM FORM WHERE form_id = " + form_id;

  console.log("STEP1 복사: " + sql);
  connection.query(sql);

  // 새로 복사된 form_id 구하기
  sql = "SELECT form_id FROM FORM WHERE tgp_id = " + tgp_id + " AND complete = 0 AND delete_time IS NULL ORDER BY make_time DESC LIMIT 1";

  connection.query(sql, (err, rows, fields) => {
    // new_form_id 리턴
    res.send(rows);

    // 복사 - FORM_TDM
    new_form_id = rows[0].form_id;

    sql = "INSERT INTO FORM_TDM (`form_id`, `tdm_id`, `title`, `role`, `role_sign`, `power`, `power_sign`, `barrier`, `barrier_sign`, `dynamic`, `dynamic_sign`, `score_sales`, `score_sales_sign`, `score_product`, `score_product_sign`, `score_service`, `score_service_sign`, `score_company`, `score_company_sign`, `score_opinion`) SELECT " + new_form_id + ", `tdm_id`, `title`, `role`, `role_sign`, `power`, `power_sign`, `barrier`, `barrier_sign`, `dynamic`, `dynamic_sign`, `score_sales`, `score_sales_sign`, `score_product`, `score_product_sign`, `score_service`, `score_service_sign`, `score_company`, `score_company_sign`, `score_opinion` FROM FORM_TDM WHERE form_id = " + form_id;

    console.log("STEP1 복사: " + sql);
    connection.query(sql);

    // 복사 - FORM_STRENGTH
    sql = "INSERT INTO FORM_STRENGTH (`form_id`, `strength_id`, `strength1`, `strength1_sign`, `strength2`, `strength2_sign`) SELECT " + new_form_id + ", `strength_id`, `strength1`, `strength1_sign`, `strength2`, `strength2_sign` FROM FORM_STRENGTH WHERE form_id = " + form_id;

    console.log("STEP1 복사: " + sql);
    connection.query(sql);

    // 복사 - FORM_WEAKNESS
    sql = "INSERT INTO FORM_WEAKNESS (`form_id`, `weakness_id`, `weakness1`, `weakness1_sign`, `weakness2`, `weakness2_sign`) SELECT " + new_form_id + ", `weakness_id`, `weakness1`, `weakness1_sign`, `weakness2`, `weakness2_sign` FROM FORM_WEAKNESS WHERE form_id = " + form_id;

    console.log("STEP1 복사: " + sql);
    connection.query(sql);

    // 복사 - FORM_STRATEGY1
    sql = "INSERT INTO FORM_STRATEGY1 (`form_id`, `strategy1_id`, `strength`, `auto_complete`) SELECT " + new_form_id + ", `strategy1_id`, `strength`, `auto_complete` FROM FORM_STRATEGY1 WHERE form_id = " + form_id;

    console.log("STEP1 복사: " + sql);
    connection.query(sql);

    // 복사 - FORM_STRATEGY2
    sql = "INSERT INTO FORM_STRATEGY2 (`form_id`, `strategy2_id`, `weakness`, `auto_complete`) SELECT " + new_form_id + ", `strategy2_id`, `weakness`, `auto_complete` FROM FORM_STRATEGY2 WHERE form_id = " + form_id;

    console.log("STEP1 복사: " + sql);
    connection.query(sql);

    // 복사 - FORM_ACTION
    sql = "INSERT INTO FORM_ACTION (`form_id`, `action_id`, `action`, `date`, `owner`, `collaborator`) SELECT " + new_form_id + ", `action_id`, `action`, `date`, `owner`, `collaborator` FROM FORM_ACTION WHERE form_id = " + form_id;

    console.log("STEP1 복사: " + sql);
    connection.query(sql);
  });
});

// TGP STEP1 조회
app.get(apiPrefix + '/tgp/:tgp_id/:form_id/step1', (req, res) => {
  let tgp_id = req.params.tgp_id;
  let form_id = req.params.form_id;
  let sql = "SELECT account, department, solution, amount, DATE_FORMAT(closingdate, '%Y-%m-%d') AS closingdate FROM FORM WHERE tgp_id = " + tgp_id + " AND form_id = " + form_id + " AND delete_time IS NULL";

  console.log("STEP1 조회: " + sql);
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});

// TGP STEP1 저장
app.post(apiPrefix + '/tgp/:tgp_id/:form_id/step1', (req, res) => {
  let tgp_id = req.params.tgp_id;
  let form_id = req.params.form_id;

  // 업데이트 - FORM
  sql = "UPDATE FORM SET department = ?, solution = ?, amount = ?, closingdate = ?, update_time = NOW() WHERE tgp_id = " + tgp_id + " AND form_id = " + form_id + " AND complete = 0 AND delete_time IS NULL";
  params = [req.body.inputs.department, req.body.inputs.solution, req.body.inputs.amount, req.body.inputs.closingdate];

  console.log("STEP1 저장: " + sql);
  connection.query(sql, params);
});

// TGP STEP2 조회
app.get(apiPrefix + '/tgp/:tgp_id/:form_id/step2', (req, res) => {
  let sql = "SELECT * FROM FORM WHERE tgp_id = " + req.params.tgp_id + " AND form_id = " + req.params.form_id + " AND delete_time IS NULL";

  console.log("STEP2 조회: " + sql);
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});

// TGP STEP2/3 조회
app.get(apiPrefix + '/tgp/:form_id/:table', (req, res) => {
  let form_id = req.params.form_id;
  let table = req.params.table.toUpperCase();
  let sql = "";

  if (table === "STRATEGY2") {
    sql = "SELECT * FROM FORM_STRATEGY2 WHERE form_id = " + form_id + " ORDER BY auto_complete DESC, strategy2_id ASC";
    console.log("STEP3 조회: " + sql);
  }
  else {
    sql = "SELECT * FROM FORM_" + table + " WHERE form_id = " + form_id + " ORDER BY " + table + "_id ASC";

    if (table === "ACTION") {
      console.log("STEP3 조회: " + sql);
    }
    else {
      console.log("STEP2 조회: " + sql);
    }
  }

  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});

// TGP STEP2 저장
app.post(apiPrefix + '/tgp/:tgp_id/:form_id/step2', (req, res) => {
  let tgp_id = req.params.tgp_id;
  let form_id = req.params.form_id;

  // 업데이트 - FORM
  let sql = "UPDATE FORM SET position1 = ?, position1_sign = ?, position2 = ?, position2_sign = ?, position3 = ?, position3_sign = ?, competition1_name = ?, competition1_name_sign = ?, competition1_type = ?, competition1_type_sign = ?, competition2_name = ?, competition2_name_sign = ?, competition2_type = ?, competition2_type_sign = ?, update_time = NOW() WHERE tgp_id = " + tgp_id + " AND form_id = " + form_id + " AND complete = 0 AND delete_time IS NULL";
  params = [
    req.body.inputs1.position1, req.body.inputs1.position1_sign,
    req.body.inputs1.position2, req.body.inputs1.position2_sign,
    req.body.inputs1.position3, req.body.inputs1.position3_sign,
    req.body.inputs1.competition1_name, req.body.inputs1.competition1_name_sign,
    req.body.inputs1.competition1_type, req.body.inputs1.competition1_type_sign,
    req.body.inputs1.competition2_name, req.body.inputs1.competition2_name_sign,
    req.body.inputs1.competition2_type, req.body.inputs1.competition2_type_sign
  ];

  console.log("STEP2 저장(수정): " + sql);
  connection.query(sql, params);

  // 삭제 후 인서트 - FORM_TDM
  sql = "DELETE FROM FORM_TDM WHERE form_id = " + form_id;

  console.log("STEP2 저장(삭제): " + sql);
  connection.query(sql);

  req.body.inputs2.map((item, i) => {
    sql = "INSERT INTO FORM_TDM (`form_id`, `tdm_id`, `title`, `role`, `role_sign`, `power`, `power_sign`, `barrier`, `barrier_sign`, `dynamic`, `dynamic_sign`, `score_sales`, `score_sales_sign`, `score_product`, `score_product_sign`, `score_service`, `score_service_sign`, `score_company`, `score_company_sign`, `score_opinion`) VALUES(" + form_id + ", ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    params = [
      i, item.title, item.role, item.role_sign,
      item.power, item.power_sign,
      item.barrier, item.barrier_sign,
      item.dynamic, item.dynamic_sign,
      item.score_sales, item.score_sales_sign,
      item.score_product, item.score_product_sign,
      item.score_service, item.score_service_sign,
      item.score_company, item.score_company_sign,
      item.score_opinion
    ];

    console.log("STEP2 저장: " + sql);
    connection.query(sql, params);
  });

  // 삭제 후 인서트 - FORM_STRENGTH
  sql = "DELETE FROM FORM_STRENGTH WHERE form_id = " + form_id;

  console.log("STEP2 저장(삭제): " + sql);
  connection.query(sql);

  req.body.inputs3.map((item, i) => {
    sql = "INSERT INTO FORM_STRENGTH (`form_id`, `strength_id`, `strength1`, `strength1_sign`, `strength2`, `strength2_sign`) VALUES(" + form_id + ", ?, ?, ?, ?, ?)";
    params = [
      i, item.strength1, item.strength1_sign,
      item.strength2, item.strength2_sign
    ];

    console.log("STEP2 저장: " + sql);
    connection.query(sql, params);
  });

  // 삭제 후 인서트 - FORM_WEAKNESS
  sql = "DELETE FROM FORM_WEAKNESS WHERE form_id = " + form_id;

  console.log("STEP2 저장(삭제): " + sql);
  connection.query(sql);

  req.body.inputs4.map((item, i) => {
    sql = "INSERT INTO FORM_WEAKNESS (`form_id`, `weakness_id`, `weakness1`, `weakness1_sign`, `weakness2`, `weakness2_sign`) VALUES(" + form_id + ", ?, ?, ?, ?, ?)";
    params = [
      i, item.weakness1, item.weakness1_sign,
      item.weakness2, item.weakness2_sign
    ];

    console.log("STEP2 저장: " + sql);
    connection.query(sql, params);
  });
});

// TGP STEP3 조회
app.get(apiPrefix + '/tgp/:tgp_id/:form_id/step3', (req, res) => {
  let tgp_id = req.params.tgp_id;
  let form_id = req.params.form_id;
  let sql = "SELECT strategy1_behavior, strategy2_behavior FROM FORM WHERE tgp_id = " + tgp_id + " AND form_id = " + form_id + " AND delete_time IS NULL";

  console.log("STEP3 조회: " + sql);
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});

app.get(apiPrefix + '/tgp/:tgp_id/:form_id/strategy1/:init', (req, res) => {
  let tgp_id = req.params.tgp_id;
  let form_id = req.params.form_id;
  let sql = "";

  if (req.params.init === "true") {
    // 삭제
    sql = "DELETE FROM FORM_STRATEGY1 WHERE form_id = " + form_id + " AND auto_complete = 1;";

    console.log("STRATEGY1(자동) 삭제: " + sql);
    connection.query(sql);

    sql = "DELETE FROM FORM_STRATEGY2 WHERE form_id = " + form_id + " AND auto_complete = 1;";

    console.log("STRATEGY2(자동) 삭제: " + sql);
    connection.query(sql);

    // 문장 생성
    sql = "SELECT position1_sign, position2_sign, position3_sign FROM FORM WHERE tgp_id = " + tgp_id + " AND form_id = " + form_id + " AND complete = 0 AND delete_time IS NULL";

    console.log("SIGN 조회: " + sql);
    connection.query(sql, (err, rows, fields) => {
      if (rows[0].position1_sign === "G") {
        InsertStrategy2(form_id, "고객관점 세일즈 퍼널이 불명확");
      }

      if (rows[0].position2_sign === "G") {
        InsertStrategy2(form_id, "고객관점 경쟁 위치가 불명확");
      }

      if (rows[0].position3_sign === "G") {
        InsertStrategy2(form_id, "내가 생각하는 성공 가능성이 불명확");
      }

      // 조회 - FORM_TDM
      sql = "SELECT title, role, role_sign, power_sign, barrier_sign, dynamic_sign, score_sales_sign, score_product_sign, score_service_sign, score_company_sign FROM FORM_TDM WHERE form_id = " + form_id + " ORDER BY tdm_id ASC";

      console.log("SIGN 조회: " + sql);
      connection.query(sql, (err, rows, fields) => {
        rows.map((item) => {
          if (item.role_sign === "G") {
            InsertStrategy2(form_id, item.title + "의 역할이 불명확");
          }

          if (item.power_sign === "G") {
            InsertStrategy2(form_id, item.title + "의 파워가 불명확");
          }
          else if (item.power_sign === "R" && item.role === "HELPER") {
            InsertStrategy2(form_id, item.title + "은(는) 약한 HELPER");
          }
          else if (item.power_sign === "B" && item.role === "HELPER") {
            InsertStrategy1(form_id, item.title + "은(는) 강력한 HELPER");
          }

          if (item.barrier_sign === "G") {
            InsertStrategy2(form_id, item.title + "의 장벽이 불명확");
          }

          if (item.dynamic_sign === "G") {
            InsertStrategy2(form_id, item.title + "의 원동력이 불명확");
          }

          if (item.score_sales_sign === "G") {
            InsertStrategy2(form_id, item.title + "의 영업사원 평가가 불명확");
          }
          else if (item.score_sales_sign === "R") {
            InsertStrategy2(form_id, item.title + "은(는) 영업사원에 대하여 부정적 평가");
          }
          else if (item.score_sales_sign === "B") {
            InsertStrategy1(form_id, item.title + "은(는) 영업사원에 대하여 긍정적 평가");
          }

          if (item.score_product_sign === "G") {
            InsertStrategy2(form_id, item.title + "의 자사 제품 평가가 불명확");
          }
          else if (item.score_product_sign === "R") {
            InsertStrategy2(form_id, item.title + "은(는) 자사 제품에 대하여 부정적 평가");
          }
          else if (item.score_product_sign === "B") {
            InsertStrategy1(form_id, item.title + "은(는) 자사 제품에 대하여 긍정적 평가");
          }

          if (item.score_service_sign === "G") {
            InsertStrategy2(form_id, item.title + "의 자사 서비스 평가가 불명확");
          }
          else if (item.score_service_sign === "R") {
            InsertStrategy2(form_id, item.title + "은(는) 자사 서비스에 대하여 부정적 평가");
          }
          else if (item.score_service_sign === "B") {
            InsertStrategy1(form_id, item.title + "은(는) 자사 서비스에 대하여 긍정적 평가");
          }

          if (item.score_company_sign === "G") {
            InsertStrategy2(form_id, item.title + "의 우리 회사 평가가 불명확");
          }
          else if (item.score_company_sign === "R") {
            InsertStrategy2(form_id, item.title + "은(는) 우리 회사에 대하여 부정적 평가");
          }
          else if (item.score_company_sign === "B") {
            InsertStrategy1(form_id, item.title + "은(는) 우리 회사에 대하여 긍정적 평가");
          }
        });

        // 조회 - FORM
        sql = "SELECT competition1_name_sign, competition2_name_sign, competition1_type_sign, competition2_type_sign FROM FORM WHERE tgp_id = " + tgp_id + " AND form_id = " + form_id + " AND complete = 0 AND delete_time IS NULL";

        console.log("SIGN 조회: " + sql);
        connection.query(sql, (err, rows, fields) => {
          if (rows[0].competition1_name_sign === "G") {
            InsertStrategy2(form_id, "경쟁분석 시 선정고객1이 불명확");
          }

          if (rows[0].competition2_name_sign === "G") {
            InsertStrategy2(form_id, "경쟁분석 시 선정고객2가 불명확");
          }

          if (rows[0].competition1_type_sign === "G") {
            InsertStrategy2(form_id, "경쟁분석 시 선정고객1의 대체안이 불명확");
          }

          if (rows[0].competition2_type_sign === "G") {
            InsertStrategy2(form_id, "경쟁분석 시 선정고객2의 대체안이 불명확");
          }

          // 조회 - FORM_STRENGTH
          sql = "SELECT strength1_sign, strength2_sign FROM FORM_STRENGTH WHERE form_id = " + form_id;

          console.log("SIGN 조회: " + sql);
          connection.query(sql, (err, rows, fields) => {
            rows.map((item, i) => {
              if (item.strength1_sign === "G") {
                InsertStrategy2(form_id, "경쟁분석 시 선정고객1의 " + (i + 1) + "번째 강점/기회가 불명확");
              }

              if (item.strength1_sign === "G") {
                InsertStrategy2(form_id, "경쟁분석 시 선정고객2의 " + (i + 1) + "번째 강점/기회가 불명확");
              }
            });

            // 조회 - FORM_WEAKNESS
            sql = "SELECT weakness1_sign, weakness2_sign FROM FORM_WEAKNESS WHERE form_id = " + form_id;

            console.log("SIGN 조회: " + sql);
            connection.query(sql, (err, rows, fields) => {
              rows.map((item, i) => {
                if (item.weakness1_sign === "G") {
                  InsertStrategy2(form_id, "경쟁분석 시 선정고객1의 " + (i + 1) + "번째 약점/위협이 불명확");
                }

                if (item.weakness2_sign === "G") {
                  InsertStrategy2(form_id, "경쟁분석 시 선정고객2의 " + (i + 1) + "번째 약점/위협이 불명확");
                }
              });

              // 조회
              sql = "SELECT * FROM FORM_STRATEGY1 WHERE form_id = " + form_id + " ORDER BY auto_complete DESC, strategy1_id ASC";

              console.log("STEP3 조회: " + sql);
              connection.query(sql, (err, rows, fields) => {
                res.send(rows);
              });
            });
          });
        });
      });
    });
  }
  else {
    sql = "SELECT * FROM FORM_STRATEGY1 WHERE form_id = " + form_id + " ORDER BY auto_complete DESC, strategy1_id ASC";

    console.log("STEP3 조회: " + sql);
    connection.query(sql, (err, rows, fields) => {
      res.send(rows);
    });
  }
});

function InsertStrategy1(form_id, sentence) {
  const sql = "INSERT INTO FORM_STRATEGY1 (`form_id`, `strength`, `auto_complete`) VALUES(" + form_id + ", '" + sentence + "', 1)";

  console.log("STRATEGY1(자동) 생성: " + sql);
  connection.query(sql);
}

function InsertStrategy2(form_id, sentence) {
  const sql = "INSERT INTO FORM_STRATEGY2 (`form_id`, `weakness`, `auto_complete`) VALUES(" + form_id + ", '" + sentence + "', 1)";

  console.log("STRATEGY2(자동) 생성: " + sql);
  connection.query(sql);
}

// TGP STEP3 저장
app.post(apiPrefix + '/tgp/:tgp_id/:form_id/step3/:complete', (req, res) => {
  let tgp_id = req.params.tgp_id;
  let form_id = req.params.form_id;
  let complete = req.params.complete;

  // 업데이트 - FORM
  let sql = "UPDATE FORM SET strategy1_behavior = ?, strategy2_behavior = ?, update_time = NOW(), complete = " + complete + " WHERE tgp_id = " + tgp_id + " AND form_id = " + form_id + " AND complete = 0 AND delete_time IS NULL";
  params = [req.body.inputs4.strategy1_behavior, req.body.inputs4.strategy2_behavior];

  console.log("STEP3 저장(수정): " + sql);
  connection.query(sql, params);

  // 삭제 후 인서트 - FORM_STRATEGY1
  if (complete === "1") {
    sql = "DELETE FROM FORM_STRATEGY1 WHERE form_id = " + form_id;
  }
  else {
    sql = "DELETE FROM FORM_STRATEGY1 WHERE form_id = " + form_id + " AND auto_complete = 0";
  }

  console.log("STEP3 저장(삭제): " + sql);
  connection.query(sql);

  req.body.inputs1.map((item, i) => {
    if (item.auto_complete === undefined || item.auto_complete === 0) {
      sql = "INSERT INTO FORM_STRATEGY1 (`form_id`, `strategy1_id`, `strength`) VALUES(" + form_id + ", ?, ?)";
    }
    else {
      if (complete === "1") {
        sql = "INSERT INTO FORM_STRATEGY1 (`form_id`, `strategy1_id`, `strength`, `auto_complete`) VALUES(" + form_id + ", ?, ?, 1)";
      }
    }

    params = [i, item.strength];

    console.log("STEP3 저장: " + sql);
    connection.query(sql, params);
  });

  // 삭제 후 인서트 - FORM_STRATEGY2
  if (complete === "1") {
    sql = "DELETE FROM FORM_STRATEGY2 WHERE form_id = " + form_id;
  }
  else {
    sql = "DELETE FROM FORM_STRATEGY2 WHERE form_id = " + form_id + " AND auto_complete = 0";
  }

  console.log("STEP3 저장(삭제): " + sql);
  connection.query(sql);

  req.body.inputs2.map((item, i) => {
    if (item.auto_complete === undefined || item.auto_complete === 0) {
      sql = "INSERT INTO FORM_STRATEGY2 (`form_id`, `strategy2_id`, `weakness`) VALUES(" + form_id + ", ?, ?)";
    }
    else {
      if (complete === "1") {
        sql = "INSERT INTO FORM_STRATEGY2 (`form_id`, `strategy2_id`, `weakness`, `auto_complete`) VALUES(" + form_id + ", ?, ?, 1)";
      }
    }

    params = [i, item.weakness];

    console.log("STEP3 저장: " + sql);
    connection.query(sql, params);
  });

  // 삭제 후 인서트 - FORM_ACTION
  sql = "DELETE FROM FORM_ACTION WHERE form_id = " + form_id;

  console.log("STEP3 저장(삭제): " + sql);
  connection.query(sql);

  req.body.inputs3.map((item, i) => {
    sql = "INSERT INTO FORM_ACTION (`form_id`, `action_id`, `action`, `date`, `owner`, `collaborator`) VALUES(" + form_id + ", ?, ?, ?, ?, ?)";
    params = [i, item.action, item.date, item.owner, item.collaborator];

    console.log("STEP3 저장: " + sql);
    connection.query(sql, params);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
