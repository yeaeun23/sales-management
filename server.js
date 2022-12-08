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

const multer = require('multer');
const upload = multer({ dest: './upload' });
const user_id = 1;

app.use('/image', express.static('./upload'));

// 거래처 조회
app.get('/customer', (req, res) => {
  let sql = "SELECT customer_id, name, (SELECT status FROM STATUS WHERE code = customer.`status`) AS `status`, `status` AS status_code, date_format(update_time, '%Y-%m-%d %H:%i:%s') AS update_time FROM CUSTOMER customer WHERE user_id = ? and delete_time IS NULL ORDER BY customer_id DESC";
  let params = [user_id];

  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// 거래처 추가
app.post('/customer', upload.single('image'), (req, res) => {
  let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, now(), now(), null)';
  let params = [user_id, req.body.name, req.body.status];

  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// 거래처 수정
app.put('/customer/:customer_id', upload.single('image'), (req, res) => {
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
app.post('/tgp/:customer_id', upload.single('image'), (req, res) => {
  let sql = 'INSERT INTO TGP VALUES (null, ?, ?, ?, now(), now(), null);';
  let params = [req.params.customer_id, req.body.name, req.body.status];

  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// TGP 수정
app.put('/tgp/:tgp_id', upload.single('image'), (req, res) => {
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

  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// TGP STEP1 저장
app.post('/tgp/:tgp_id/step1', upload.single('image'), (req, res) => {
  // 히스토리가 있는지 조회
  let sql = "SELECT form_id FROM FORM WHERE tgp_id = ? ORDER BY form_id DESC LIMIT 1";
  let params = [req.params.tgp_id];

  connection.query(sql, params, (err, rows, fields) => {
    let tgp_id = req.params.tgp_id;
    let account = req.body.account;
    let department = req.body.department;
    let solution = req.body.solution;
    let amount = req.body.amount;
    let closingdate = req.body.closingdate;

    if (rows.length === 0) {
      // 히스토리 없으면 인서트
      sql = 'INSERT INTO FORM (form_id, tgp_id, account, department, solution, amount, closingdate, update_time, make_time) VALUES (null, ?, ?, ?, ?, ?, ?, now(), now());';
      params = [tgp_id, account, department, solution, amount, closingdate];

      connection.query(sql, params);
    }
    else {
      // 히스토리 있으면 인서트(복사)               
      sql = "INSERT INTO FORM (`tgp_id`, `position1`, `position1_sign`, `position2`, `position2_sign`, `position3`, `position3_sign`, `competition1_name`, `competition1_name_sign`, `competition1_type`, `competition1_type_sign`, `competition2_name`, `competition2_name_sign`, `competition2_type`, `competition2_type_sign`, `make_time`) SELECT `tgp_id`, `position1`, `position1_sign`, `position2`, `position2_sign`, `position3`, `position3_sign`, `competition1_name`, `competition1_name_sign`, `competition1_type`, `competition1_type_sign`, `competition2_name`, `competition2_name_sign`, `competition2_type`, `competition2_type_sign`, `make_time` FROM FORM WHERE form_id = 34";
      params = [rows[0].form_id];

      connection.query(sql, params);

      // 인서트한 form_id 구해서
      sql = "SELECT form_id FROM FORM WHERE tgp_id = ? ORDER BY form_id DESC LIMIT 1;";
      params = [tgp_id];

      connection.query(sql, params, (err, rows, fields) => {
        // 그 form_id에 업데이트
        sql = "UPDATE FORM SET account = ?, department = ?, solution = ?, amount = ?, closingdate = ?, update_time = now() WHERE form_id = ?;";
        params = [account, department, solution, amount, closingdate, rows[0].form_id];

        connection.query(sql, params);
      });
    }
  });
});

// TGP STEP2 조회
app.get('/tgp/:tgp_id/step2', (req, res) => {
  let sql = "SELECT * FROM FORM WHERE tgp_id = ? ORDER BY form_id DESC LIMIT 1";
  let params = [req.params.form_id, req.params.tgp_id];

  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

app.get('/tgp/:tgp_id/:form_id/tdm', (req, res) => {
  let sql = "SELECT * FROM FORM_TDM WHERE tdm_id = 1 AND form_id = ?";
  let params = [req.params.tgp_id, req.params.form_id];

  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

app.get('/tgp/:tgp_id/:form_id/strength', (req, res) => {
  let sql = "SELECT * FROM FORM_STRENGTH WHERE strength_id = 1 AND form_id = ?";
  let params = [req.params.tgp_id, req.params.form_id];

  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

app.get('/tgp/:tgp_id/:form_id/weakness', (req, res) => {
  let sql = "SELECT * FROM FORM_WEAKNESS WHERE weakness_id = 1 AND form_id = ?";
  let params = [req.params.tgp_id, req.params.form_id];

  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// TGP STEP2 저장
app.post('/api/tgp/:tgp_id/STEP2', upload.single('image'), (req, res) => {
  let sql = 'DECLARE recent_form_id int(10); SET recent_form_id = (SELECT form_id FROM FORM WHERE tgp_id = ? ORDER BY form_id DESC LIMIT 1);'

  sql += 'UPDATE FORM SET position1 = ? AND position1_sign = ? AND position2 = ? AND position2_sign = ? position3 = ? AND position3_sign = ? AND competition1_name = ? AND competition1_name_sign = ? AND competition1_type = ? AND competition1_type_sign = ? AND competition2_name = ? AND competition2_name_sign = ? AND competition2_type = ? AND competition2_type_sign = ? WHERE tgp_id = ? AND form_id = recent_form_id;';

  sql += 'UPDATE FORM_TDM SET title = ? AND title_sign = ? AND power = ? AND power_sign = ? barrier = ? AND barrier_sign = ? AND dynamic = ? AND dynamic_sign = ? AND score_sales = ? AND score_sales_sign = ? AND score_product = ? AND score_product_sign = ? AND score_service = ? AND score_service_sign = ? AND score_company = ? AND score_company_sign = ? AND score_opinion = ? WHERE tgp_id = ? AND form_id = recent_form_id;'

  sql += 'UPDATE FORM_STRENGTH SET strength1 = ? AND strength1_sign = ? AND strength2 = ? AND strength2_sign = ? WHERE tgp_id = ? AND form_id = recent_form_id;'

  sql += 'UPDATE FORM_WEAKNESS SET weakness1 = ? AND weakness1_sign = ? AND weakness2 = ? AND weakness2_sign = ? WHERE tgp_id = ? AND form_id = recent_form_id;'

  let position1 = req.body.position1;
  let position1_sign = req.body.position1_sign;
  let position2 = req.body.position2;
  let position2_sign = req.body.position2_sign;
  let position3 = req.body.position3;
  let position3_sign = req.body.position3_sign;
  let competition1_name = req.body.competition1_name;
  let competition1_name_sign = req.body.competition1_name_sign;
  let competition1_type = req.body.competition1_type;
  let competition1_type_sign = req.body.competition1_type_sign;
  let competition2_name = req.body.competition2_name;
  let competition2_name_sign = req.body.competition2_name_sign;
  let competition2_type = req.body.competition2_type;
  let competition2_type_sign = req.body.competition2_type_sign;

  let title = req.body.title;
  let title_sign = req.body.title_sign;
  let power = req.body.power;
  let power_sign = req.body.power_sign;
  let barrier = req.body.barrier;
  let barrier_sign = req.body.barrier_sign;
  let dynamic = req.body.dynamic;
  let dynamic_sign = req.body.dynamic_sign;
  let score_sales = req.body.score_sales;
  let score_sales_sign = req.body.score_sales_sign;
  let score_product = req.body.score_product;
  let score_product_sign = req.body.score_product_sign;
  let score_service = req.body.score_service;
  let score_service_sign = req.body.score_service_sign;
  let score_company = req.body.score_company;
  let score_company_sign = req.body.score_company_sign;
  let score_opinion = req.body.score_opinion;

  let strength1 = req.body.strength1;
  let strength1_sign = req.body.strength1_sign;
  let strength2 = req.body.strength2;
  let strength2_sign = req.body.strength2_sign;

  let weakness1 = req.body.weakness1;
  let weakness1_sign = req.body.weakness1_sign;
  let weakness2 = req.body.weakness2;
  let weakness2_sign = req.body.weakness2_sign;

  let params = [
    position1, position1_sign, position2, position2_sign, position3, position3_sign,
    competition1_name, competition1_name_sign, competition1_type, competition1_type_sign, competition2_name, competition2_name_sign, competition2_type, competition2_type_sign, req.params.tgp_id,
    title, title_sign, power, power_sign, barrier, barrier_sign, dynamic, dynamic_sign,
    score_sales, score_sales_sign, score_product, score_product_sign, score_service, score_service_sign, score_company, score_company_sign, score_opinion, req.params.tgp_id,
    strength1, strength1_sign, strength2, strength2_sign, req.params.tgp_id,
    weakness1, weakness1_sign, weakness2, weakness2_sign, req.params.tgp_id
  ];

  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});


app.listen(port, () => console.log(`Listening on port ${port}`));
