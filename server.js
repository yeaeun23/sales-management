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
  let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, NOW(), NOW(), null)';
  let params = [user_id, req.body.name, req.body.status];

  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// 거래처 수정
app.put('/customer/:customer_id', (req, res) => {
  let sql = 'UPDATE CUSTOMER SET name = ?, status = ?, update_time = NOW() WHERE customer_id = ?';
  let params = [req.body.name, req.body.status, req.params.customer_id];

  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// 거래처 삭제
app.delete('/customer/:customer_id', (req, res) => {
  let sql = 'UPDATE CUSTOMER SET delete_time = NOW() WHERE customer_id = ?';
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
  let sql = 'INSERT INTO TGP VALUES (null, ?, ?, ?, NOW(), NOW(), null);';
  let params = [req.params.customer_id, req.body.name, req.body.status];

  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// TGP 수정
app.put('/tgp/:tgp_id', (req, res) => {
  let sql = 'UPDATE TGP SET name = ?, status = ?, update_time = NOW() WHERE tgp_id = ?';
  let params = [req.body.name, req.body.status, req.params.tgp_id];

  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// TGP 삭제
app.delete('/tgp/:tgp_id', (req, res) => {
  let sql = 'UPDATE TGP SET delete_time = NOW() WHERE tgp_id = ?';
  let params = [req.params.tgp_id];

  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// TGP 내역 조회
app.get('/tgp/:tgp_id/history', (req, res) => {
  let sql = "SELECT form_id, date_format(update_time, '%Y년 %m월 %d일 (%H시 %i분)') AS update_time FROM FORM WHERE tgp_id = " + req.params.tgp_id + " AND complete = 1 AND delete_time IS NULL ORDER BY update_time DESC";

  console.log("TGP 내역 조회: " + sql);
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});

// TGP 이어서 작성
app.get('/tgp/:tgp_id/continue', (req, res) => {
  let tgp_id = req.params.tgp_id;

  // 미완료된 form_id 조회
  let sql = "SELECT form_id FROM FORM WHERE tgp_id = " + tgp_id + " AND complete = 0 AND delete_time IS NULL ORDER BY form_id DESC LIMIT 1";

  console.log("TGP 미완료 조회: " + sql);
  connection.query(sql, (err, rows, fields) => {
    if (rows.length === 0) {
      // 없으면 insert
      let sql1 = "INSERT INTO FORM (`tgp_id`, `update_time`, `make_time`) VALUES(" + tgp_id + ", NOW(), NOW())";

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
app.get('/tgp/:tgp_id/:form_id/copy', (req, res) => {
  let tgp_id = req.params.tgp_id;
  let form_id = req.params.form_id;
  let new_form_id = '';

  // 복사 - FORM           
  sql = "INSERT INTO FORM (`tgp_id`, `account`, `department`, `solution`, `amount`, `closingdate`, `position1`, `position1_sign`, `position2`, `position2_sign`, `position3`, `position3_sign`, `competition1_name`, `competition1_name_sign`, `competition1_type`, `competition1_type_sign`, `competition2_name`, `competition2_name_sign`, `competition2_type`, `competition2_type_sign`, `update_time`, `make_time`) SELECT `tgp_id`, `account`, `department`, `solution`, `amount`, `closingdate`, `position1`, `position1_sign`, `position2`, `position2_sign`, `position3`, `position3_sign`, `competition1_name`, `competition1_name_sign`, `competition1_type`, `competition1_type_sign`, `competition2_name`, `competition2_name_sign`, `competition2_type`, `competition2_type_sign`, NOW(), NOW() FROM FORM WHERE form_id = " + form_id;

  console.log("STEP1 복사: " + sql);
  connection.query(sql);

  // 새로 복사된 form_id 구하기
  sql = "SELECT form_id FROM FORM WHERE tgp_id = " + tgp_id + " AND complete = 0 AND delete_time IS NULL ORDER BY make_time DESC LIMIT 1";

  connection.query(sql, (err, rows, fields) => {
    // new_form_id 리턴
    res.send(rows);

    // 복사 - FORM_TDM
    new_form_id = rows[0].form_id;

    sql = "INSERT INTO FORM_TDM (`form_id`, `tdm_id`, `title`, `role`, `title_sign`, `power`, `power_sign`, `barrier`, `barrier_sign`, `dynamic`, `dynamic_sign`, `score_sales`, `score_sales_sign`, `score_product`, `score_product_sign`, `score_service`, `score_service_sign`, `score_company`, `score_company_sign`, `score_opinion`) SELECT " + new_form_id + ", `tdm_id`, `title`, `role`, `title_sign`, `power`, `power_sign`, `barrier`, `barrier_sign`, `dynamic`, `dynamic_sign`, `score_sales`, `score_sales_sign`, `score_product`, `score_product_sign`, `score_service`, `score_service_sign`, `score_company`, `score_company_sign`, `score_opinion` FROM FORM_TDM WHERE form_id = " + form_id;

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
    sql = "INSERT INTO FORM_STRATEGY1 (`form_id`, `strategy1_id`, `strength`, `behavior1`) SELECT " + new_form_id + ", `strategy1_id`, `strength`, `behavior1` FROM FORM_STRATEGY1 WHERE form_id = " + form_id;

    console.log("STEP1 복사: " + sql);
    connection.query(sql);

    // 복사 - FORM_STRATEGY2
    sql = "INSERT INTO FORM_STRATEGY2 (`form_id`, `strategy2_id`, `weakness`, `behavior2`) SELECT " + new_form_id + ", `strategy2_id`, `weakness`, `behavior2` FROM FORM_STRATEGY2 WHERE form_id = " + form_id;

    console.log("STEP1 복사: " + sql);
    connection.query(sql);

    // 복사 - FORM_ACTION
    sql = "INSERT INTO FORM_ACTION (`form_id`, `action_id`, `action`, `date`, `owner`, `collaborator`) SELECT " + new_form_id + ", `action_id`, `action`, `date`, `owner`, `collaborator` FROM FORM_ACTION WHERE form_id = " + form_id;

    console.log("STEP1 복사: " + sql);
    connection.query(sql);
  });
});

// TGP STEP1 조회
app.get('/tgp/:tgp_id/:form_id/step1', (req, res) => {
  let tgp_id = req.params.tgp_id;
  let form_id = req.params.form_id;
  let sql = "SELECT account, department, solution, amount, date_format(closingdate, '%Y-%m-%d') AS closingdate FROM FORM WHERE tgp_id = " + tgp_id + " AND form_id = " + form_id + " AND complete = 0 AND delete_time IS NULL";

  console.log("STEP1 조회: " + sql);
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});

// TGP STEP1 저장
app.post('/tgp/:tgp_id/:form_id/step1', (req, res) => {
  let tgp_id = req.params.tgp_id;
  let form_id = req.params.form_id;

  // 업데이트 - FORM
  sql = "UPDATE FORM SET account = ?, department = ?, solution = ?, amount = ?, closingdate = ?, update_time = NOW() WHERE tgp_id = " + tgp_id + " AND form_id = " + form_id + " AND complete = 0 AND delete_time IS NULL";
  params = [req.body.inputs.account, req.body.inputs.department, req.body.inputs.solution, req.body.inputs.amount, req.body.inputs.closingdate];

  console.log("STEP1 저장: " + sql);
  connection.query(sql, params);
});

// TGP STEP2 조회
app.get('/tgp/:tgp_id/:form_id/step2', (req, res) => {
  let sql = "SELECT * FROM FORM WHERE tgp_id = " + req.params.tgp_id + " AND form_id = " + req.params.form_id + " AND complete = 0 AND delete_time IS NULL";

  console.log("STEP2 조회: " + sql);
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});

// TGP STEP2/3 조회
app.get('/tgp/:form_id/:table', (req, res) => {
  let table = req.params.table.toUpperCase();
  let sql = "SELECT * FROM FORM_" + table + " WHERE form_id = " + req.params.form_id + " ORDER BY ";

  if (table === "STRATEGY1" || table === "STRATEGY2") {
    sql += "auto_complete DESC, " + table + "_id ASC";
  }
  else {
    sql += table + "_id ASC";
  }

  console.log("STEP2/3 조회: " + sql);
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});

// TGP STEP2 저장
app.post('/tgp/:tgp_id/:form_id/step2', (req, res) => {
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
    sql = "INSERT INTO FORM_TDM (`form_id`, `tdm_id`, `title`, `role`, `title_sign`, `power`, `power_sign`, `barrier`, `barrier_sign`, `dynamic`, `dynamic_sign`, `score_sales`, `score_sales_sign`, `score_product`, `score_product_sign`, `score_service`, `score_service_sign`, `score_company`, `score_company_sign`, `score_opinion`) VALUES(" + form_id + ", ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    params = [
      i, item.title, item.role, item.title_sign,
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

  // 삭제 - FORM_STRATEGY1/2
  sql = "DELETE FROM FORM_STRATEGY1 WHERE form_id = " + form_id + " AND auto_complete = 1";

  console.log("STRATEGY1(자동) 삭제: " + sql);
  connection.query(sql);

  sql = "DELETE FROM FORM_STRATEGY2 WHERE form_id = " + form_id + " AND auto_complete = 1";

  console.log("STRATEGY2(자동) 삭제: " + sql);
  connection.query(sql);

  // 인서트 - FORM_STRATEGY1/2
  sql = "SELECT position1_sign, position2_sign, position3_sign FROM FORM WHERE tgp_id = " + req.params.tgp_id + " AND form_id = " + req.params.form_id + " AND complete = 0 AND delete_time IS NULL";

  console.log("사인 조회: " + sql);
  connection.query(sql, (err, rows, fields) => {
    if (rows[0].position1_sign === "G") {
      sql = "INSERT INTO FORM_STRATEGY2 (`form_id`, `weakness`, `auto_complete`) VALUES(" + form_id + ", '고객관점 세일즈 퍼널이 불명확', 1)";

      console.log("STRATEGY2(자동) 생성: " + sql);
      connection.query(sql);
    }

    if (rows[0].position2_sign === "G") {
      sql = "INSERT INTO FORM_STRATEGY2 (`form_id`, `weakness`, `auto_complete`) VALUES(" + form_id + ", '고객관점 경쟁대비가 불명확', 1)";

      console.log("STRATEGY2(자동) 생성: " + sql);
      connection.query(sql);
    }

    if (rows[0].position3_sign === "G") {
      sql = "INSERT INTO FORM_STRATEGY2 (`form_id`, `weakness`, `auto_complete`) VALUES(" + form_id + ", '내가 생각하는 성공 가능성이 불명확', 1)";

      console.log("STRATEGY2(자동) 생성: " + sql);
      connection.query(sql);
    }
  });
});

// TGP STEP3 저장
app.post('/tgp/:tgp_id/:form_id/step3', (req, res) => {
  let tgp_id = req.params.tgp_id;
  let form_id = req.params.form_id;

  // 업데이트 - FORM
  let sql = "UPDATE FORM SET update_time = NOW(), complete = 1 WHERE tgp_id = " + tgp_id + " AND form_id = " + form_id + " AND complete = 0 AND delete_time IS NULL";

  console.log("STEP3 저장(수정): " + sql);
  connection.query(sql, params);

  // 삭제 후 인서트 - FORM_STRATEGY1
  sql = "DELETE FROM FORM_STRATEGY1 WHERE form_id = " + form_id;

  console.log("STEP3 저장(삭제): " + sql);
  connection.query(sql);

  req.body.inputs1.map((item, i) => {
    sql = "INSERT INTO FORM_STRATEGY1 (`form_id`, `strategy1_id`, `strength`, `behavior1`) VALUES(" + form_id + ", ?, ?, ?)";
    params = [i, item.strength, item.behavior1];

    console.log("STEP3 저장: " + sql);
    connection.query(sql, params);
  });

  // 삭제 후 인서트 - FORM_STRATEGY2
  sql = "DELETE FROM FORM_STRATEGY2 WHERE form_id = " + form_id;

  console.log("STEP3 저장(삭제): " + sql);
  connection.query(sql);

  req.body.inputs2.map((item, i) => {
    sql = "INSERT INTO FORM_STRATEGY2 (`form_id`, `strategy2_id`, `weakness`, `behavior2`) VALUES(" + form_id + ", ?, ?, ?)";
    params = [i, item.weakness, item.behavior2];

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
