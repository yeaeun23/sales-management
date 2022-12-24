const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});
connection.connect();

const user_id = 1;

// 거래처 조회
app.get('/customer', (req, res) => {
  let sql = "SELECT customer_id, name, (SELECT status FROM STATUS WHERE code = customer.`status`) AS `status`, `status` AS status_code, date_format(update_time, '%Y-%m-%d %H:%i:%s') AS update_time FROM CUSTOMER customer WHERE user_id = ? and delete_time IS NULL ORDER BY customer_id DESC";
  let params = [user_id];

  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// 거래처 추가
app.post('/customer', (req, res) => {
  let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, now(), now(), null)';
  let params = [user_id, req.body.name, req.body.status];

  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// 거래처 수정
app.put('/customer/:customer_id', (req, res) => {
  let sql = 'UPDATE CUSTOMER SET name = ?, status = ?, update_time = now() WHERE customer_id = ?';
  let params = [req.body.name, req.body.status, req.params.customer_id];

  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// 거래처 삭제
app.delete('/customer/:customer_id', (req, res) => {
  let sql = 'UPDATE CUSTOMER SET delete_time = now() WHERE customer_id = ?';
  let params = [req.params.customer_id];

  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// TGP 조회
app.get('/tgp/:customer_id', (req, res) => {
  let sql = "SELECT tgp_id, name, (SELECT status FROM STATUS WHERE code = tgp.`status`) AS `status`, `status` AS status_code, date_format(update_time, '%Y-%m-%d %H:%i:%s') AS update_time FROM TGP tgp WHERE customer_id = ? and delete_time IS NULL ORDER BY tgp_id DESC";
  let params = [req.params.customer_id];

  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// TGP 추가
app.post('/tgp/:customer_id', (req, res) => {
  let sql = 'INSERT INTO TGP VALUES (null, ?, ?, ?, now(), now(), null);';
  let params = [req.params.customer_id, req.body.name, req.body.status];

  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// TGP 수정
app.put('/tgp/:tgp_id', (req, res) => {
  let sql = 'UPDATE TGP SET name = ?, status = ?, update_time = now() WHERE tgp_id = ?';
  let params = [req.body.name, req.body.status, req.params.tgp_id];

  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// TGP 삭제
app.delete('/tgp/:tgp_id', (req, res) => {
  let sql = 'UPDATE TGP SET delete_time = now() WHERE tgp_id = ?';
  let params = [req.params.tgp_id];

  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// TGP 내역 조회
app.get('/tgp/history', (req, res) => {
  let sql = "SELECT tgp_id, name, (SELECT status FROM STATUS WHERE code = tgp.`status`) AS `status`, `status` AS status_code, date_format(update_time, '%Y-%m-%d %H:%i:%s') AS update_time FROM TGP tgp WHERE customer_id = ? and delete_time IS NULL ORDER BY tgp_id DESC";
  let params = [req.params.customer_id];

  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// 상태 목록 조회
app.get('/status', (req, res) => {
  let sql = "SELECT * FROM STATUS ORDER BY code ASC";

  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});

// TGP STEP1 조회
app.get('/tgp/:tgp_id/step1', (req, res) => {
  // 가장 최근 히스토리 조회
  let sql = "SELECT form_id, account, department, solution, amount, date_format(closingdate, '%Y-%m-%d') AS closingdate FROM FORM WHERE tgp_id = ? ORDER BY form_id DESC LIMIT 1";
  let params = [req.params.tgp_id];

  console.log("STEP1 조회: " + sql);
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// TGP STEP1 저장
app.post('/tgp/:tgp_id/step1', (req, res) => {
  // 히스토리가 있는지 조회
  let sql = "SELECT form_id FROM FORM WHERE tgp_id = ? ORDER BY form_id DESC LIMIT 1";
  let tgp_id = req.params.tgp_id;
  let params = [tgp_id];

  connection.query(sql, params, (err, rows, fields) => {
    let account = req.body.account;
    let department = req.body.department;
    let solution = req.body.solution;
    let amount = req.body.amount;
    let closingdate = req.body.closingdate;

    if (rows.length === 0) {
      // 히스토리 없으면 새로 인서트 - FORM
      sql = 'INSERT INTO FORM (form_id, tgp_id, account, department, solution, amount, closingdate, update_time, make_time) VALUES (null, ?, ?, ?, ?, ?, ?, now(), now());';
      params = [tgp_id, account, department, solution, amount, closingdate];

      console.log("STEP1 저장: " + sql);
      connection.query(sql, params);
    }
    else {       
      let recent_form_id = rows[0].form_id;

      // 히스토리 있으면 복사 - FORM           
      sql = "INSERT INTO FORM (`tgp_id`, `position1`, `position1_sign`, `position2`, `position2_sign`, `position3`, `position3_sign`, `competition1_name`, `competition1_name_sign`, `competition1_type`, `competition1_type_sign`, `competition2_name`, `competition2_name_sign`, `competition2_type`, `competition2_type_sign`, `make_time`) SELECT `tgp_id`, `position1`, `position1_sign`, `position2`, `position2_sign`, `position3`, `position3_sign`, `competition1_name`, `competition1_name_sign`, `competition1_type`, `competition1_type_sign`, `competition2_name`, `competition2_name_sign`, `competition2_type`, `competition2_type_sign`, `make_time` FROM FORM WHERE form_id = ?";
      params = [recent_form_id];

      console.log("STEP1 저장(복사): " + sql);
      connection.query(sql, params);

      // 방금 인서트한 form_id 구하기
      sql = "SELECT form_id FROM FORM WHERE tgp_id = ? ORDER BY form_id DESC LIMIT 1;";
      params = [tgp_id];

      connection.query(sql, params, (err, rows, fields) => {
        let new_form_id = rows[0].form_id;

        // 복사 - FORM_TDM
        sql = "INSERT INTO FORM_TDM (`form_id`, `tdm_id`, `title`, `title_sign`, `power`, `power_sign`, `barrier`, `barrier_sign`, `dynamic`, `dynamic_sign`, `score_sales`, `score_sales_sign`, `score_product`, `score_product_sign`, `score_service`, `score_service_sign`, `score_company`, `score_company_sign`, `score_opinion`) SELECT ?, `tdm_id`, `title`, `title_sign`, `power`, `power_sign`, `barrier`, `barrier_sign`, `dynamic`, `dynamic_sign`, `score_sales`, `score_sales_sign`, `score_product`, `score_product_sign`, `score_service`, `score_service_sign`, `score_company`, `score_company_sign`, `score_opinion` FROM FORM_TDM WHERE form_id = ?";
        params = [new_form_id, recent_form_id];

        console.log("STEP1 저장(복사): " + sql);
        connection.query(sql, params);

        // 복사 - FORM_STRENGTH
        sql = "INSERT INTO FORM_STRENGTH (`form_id`, `strength_id`, `strength1`, `strength1_sign`, `strength2`, `strength2_sign`) SELECT ?, `strength_id`, `strength1`, `strength1_sign`, `strength2`, `strength2_sign` FROM FORM_STRENGTH WHERE form_id = ?";
        params = [new_form_id, recent_form_id];

        console.log("STEP1 저장(복사): " + sql);
        connection.query(sql, params);

        // 복사 - FORM_WEAKNESS
        sql = "INSERT INTO FORM_WEAKNESS (`form_id`, `weakness_id`, `weakness1`, `weakness1_sign`, `weakness2`, `weakness2_sign`) SELECT ?, `weakness_id`, `weakness1`, `weakness1_sign`, `weakness2`, `weakness2_sign` FROM FORM_WEAKNESS WHERE form_id = ?";
        params = [new_form_id, recent_form_id];

        console.log("STEP1 저장(복사): " + sql);
        connection.query(sql, params);

        // 복사 - FORM_STRATEGY1
        sql = "INSERT INTO FORM_STRATEGY1 (`form_id`, `strategy1_id`, `strength`, `behavior1`) SELECT ?, `strategy1_id`, `strength`, `behavior1` FROM FORM_STRATEGY1 WHERE form_id = ?";
        params = [new_form_id, recent_form_id];

        console.log("STEP1 저장(복사): " + sql);
        connection.query(sql, params);

        // 복사 - FORM_STRATEGY2
        sql = "INSERT INTO FORM_STRATEGY2 (`form_id`, `strategy2_id`, `weakness`, `behavior2`) SELECT ?, `strategy2_id`, `weakness`, `behavior2` FROM FORM_STRATEGY2 WHERE form_id = ?";
        params = [new_form_id, recent_form_id];

        console.log("STEP1 저장(복사): " + sql);
        connection.query(sql, params);
        
        // 복사 - FORM_ACTION
        sql = "INSERT INTO FORM_ACTION (`form_id`, `action_id`, `action`, `date`, `owner`, `collaborator`) SELECT ?, `action_id`, `action`, `date`, `owner`, `collaborator` FROM FORM_ACTION WHERE form_id = ?";
        params = [new_form_id, recent_form_id];

        console.log("STEP1 저장(복사): " + sql);
        connection.query(sql, params);

        // 업데이트 - FORM
        sql = "UPDATE FORM SET account = ?, department = ?, solution = ?, amount = ?, closingdate = ?, update_time = now(), make_time = now() WHERE form_id = ?;";
        params = [account, department, solution, amount, closingdate, rows[0].form_id];

        console.log("STEP1 저장(수정): " + sql);
        connection.query(sql, params);
      });
    }
  });
});

// TGP STEP2 조회
app.get('/tgp/:tgp_id/step2', (req, res) => {
  let sql = "SELECT * FROM FORM WHERE tgp_id = ? ORDER BY form_id DESC LIMIT 1";
  let params = [req.params.tgp_id];

  console.log("STEP2 조회: " + sql);
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// TGP STEP2/3 조회
app.get('/tgp/:tgp_id/:table', (req, res) => {
  // 현재 form_id 구하기
  let sql = "SELECT form_id FROM FORM WHERE tgp_id = ? ORDER BY form_id DESC LIMIT 1";
  let params = [req.params.tgp_id];

  connection.query(sql, params, (err, rows, fields) => {
    // table 구하기
    sql = "SELECT * FROM FORM_" + req.params.table.toUpperCase() + " WHERE form_id = ? ORDER BY " + req.params.table + "_id ASC LIMIT 1";
    params = [rows[0].form_id];

    console.log("STEP2/3 조회: " + sql);
    connection.query(sql, params, (err, rows, fields) => {
      res.send(rows);
    });
  });
});

// TGP STEP2 저장
app.post('/tgp/:tgp_id/step2', (req, res) => {
  // 현재 form_id 구하기
  let sql = "SELECT form_id FROM FORM WHERE tgp_id = ? ORDER BY form_id DESC LIMIT 1";
  let tgp_id = req.params.tgp_id;
  let params = [tgp_id];

  connection.query(sql, params, (err, rows, fields) => {
    let form_id = rows[0].form_id;

    // 업데이트 - FORM
    sql = "UPDATE FORM SET position1 = ?, position1_sign = ?, position2 = ?, position2_sign = ?, position3 = ?, position3_sign = ?, competition1_name = ?, competition1_name_sign = ?, competition1_type = ?, competition1_type_sign = ?, competition2_name = ?, competition2_name_sign = ?, competition2_type = ?, competition2_type_sign = ?, update_time = now() WHERE form_id = ? AND tgp_id = ?";
    params = [
      req.body.position1, req.body.position1_sign,
      req.body.position2, req.body.position2_sign,
      req.body.position3, req.body.position3_sign,
      req.body.competition1_name, req.body.competition1_name_sign,
      req.body.competition1_type, req.body.competition1_type_sign,
      req.body.competition2_name, req.body.competition2_name_sign,
      req.body.competition2_type, req.body.competition2_type_sign,
      form_id, tgp_id
    ];

    console.log("STEP2 저장(수정): " + sql);
    connection.query(sql, params);

    // 삭제 후 인서트 - FORM_TDM
    sql = "DELETE FROM FORM_TDM WHERE form_id = " + form_id;

    console.log("STEP2 저장(삭제): " + sql);
    connection.query(sql);

    sql = "INSERT INTO FORM_TDM (`form_id`, `tdm_id`, `title`, `title_sign`, `power`, `power_sign`, `barrier`, `barrier_sign`, `dynamic`, `dynamic_sign`, `score_sales`, `score_sales_sign`, `score_product`, `score_product_sign`, `score_service`, `score_service_sign`, `score_company`, `score_company_sign`, `score_opinion`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    params = [
      form_id, 0,
      req.body.title, req.body.title_sign,
      req.body.power, req.body.power_sign,
      req.body.barrier, req.body.barrier_sign,
      req.body.dynamic, req.body.dynamic_sign,
      req.body.score_sales, req.body.score_sales_sign,
      req.body.score_product, req.body.score_product_sign,
      req.body.score_service, req.body.score_service_sign,
      req.body.score_company, req.body.score_company_sign,
      req.body.score_opinion
    ];

    console.log("STEP2 저장: " + sql);
    connection.query(sql, params);

    // 삭제 후 인서트 - FORM_STRENGTH
    sql = "DELETE FROM FORM_STRENGTH WHERE form_id = " + form_id;

    console.log("STEP2 저장(삭제): " + sql);
    connection.query(sql);

    sql = "INSERT INTO FORM_STRENGTH (`form_id`, `strength_id`, `strength1`, `strength1_sign`, `strength2`, `strength2_sign`) VALUES(?, ?, ?, ?, ?, ?)";
    params = [
      form_id, 0,
      req.body.strength1, req.body.strength1_sign,
      req.body.strength2, req.body.strength2_sign
    ];

    console.log("STEP2 저장: " + sql);
    connection.query(sql, params);

    // 삭제 후 인서트 - FORM_WEAKNESS
    sql = "DELETE FROM FORM_WEAKNESS WHERE form_id = " + form_id;

    console.log("STEP2 저장(삭제): " + sql);
    connection.query(sql);

    sql = "INSERT INTO FORM_WEAKNESS (`form_id`, `weakness_id`, `weakness1`, `weakness1_sign`, `weakness2`, `weakness2_sign`) VALUES(?, ?, ?, ?, ?, ?)";
    params = [
      form_id, 0,
      req.body.weakness1, req.body.weakness1_sign,
      req.body.weakness2, req.body.weakness2_sign
    ];

    console.log("STEP2 저장: " + sql);
    connection.query(sql, params);
  });
});

// TGP STEP3 저장
app.post('/tgp/:tgp_id/step3', (req, res) => {
  // 현재 form_id 구하기
  let sql = "SELECT form_id FROM FORM WHERE tgp_id = ? ORDER BY form_id DESC LIMIT 1";
  let tgp_id = req.params.tgp_id;
  let params = [tgp_id];

  connection.query(sql, params, (err, rows, fields) => {
    let form_id = rows[0].form_id;

    // 삭제 후 인서트 - FORM_STRATEGY1
    sql = "DELETE FROM FORM_STRATEGY1 WHERE form_id = " + form_id;

    console.log("STEP3 저장(삭제): " + sql);
    connection.query(sql);

    sql = "INSERT INTO FORM_STRATEGY1 (`form_id`, `strategy1_id`, `strength`, `behavior1`) VALUES(?, ?, ?, ?)";
    params = [
      form_id, 0,
      req.body.strength, req.body.behavior1
    ];

    console.log("STEP3 저장: " + sql);
    connection.query(sql, params);

    // 삭제 후 인서트 - FORM_STRATEGY2
    sql = "DELETE FROM FORM_STRATEGY2 WHERE form_id = " + form_id;

    console.log("STEP3 저장(삭제): " + sql);
    connection.query(sql);

    sql = "INSERT INTO FORM_STRATEGY2 (`form_id`, `strategy2_id`, `weakness`, `behavior2`) VALUES(?, ?, ?, ?)";
    params = [
      form_id, 0,
      req.body.weakness, req.body.behavior2
    ];

    console.log("STEP3 저장: " + sql);
    connection.query(sql, params);

    // 삭제 후 인서트 - FORM_ACTION
    sql = "DELETE FROM FORM_ACTION WHERE form_id = " + form_id;

    console.log("STEP3 저장(삭제): " + sql);
    connection.query(sql);

    sql = "INSERT INTO FORM_ACTION (`form_id`, `action_id`, `action`, `date`, `owner`, `collaborator`) VALUES(?, ?, ?, ?, ?, ?)";
    params = [
      form_id, 0,
      req.body.action, req.body.date, req.body.owner, req.body.collaborator
    ];

    console.log("STEP3 저장: " + sql);
    connection.query(sql, params);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
