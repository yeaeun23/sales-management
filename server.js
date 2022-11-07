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

app.use('/image', express.static('./upload'));

// 고객사 조회
app.get('/api/customer', (req, res) => {
  connection.query(
    "SELECT customer_id, name, (SELECT status FROM STATUS WHERE CODE = customer.`status`) AS status, date_format(update_time, '%Y-%m-%d %H:%i') AS update_time FROM CUSTOMER customer WHERE delete_time IS NULL ORDER BY customer_id DESC",

    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

// TGP 조회
app.get('/api/customer/:customer_id', (req, res) => {
  let sql = "SELECT tgp_id, name, (SELECT status FROM STATUS WHERE CODE = tgp.`status`) AS status, date_format(update_time, '%Y-%m-%d %H:%i') AS update_time FROM TGP tgp WHERE customer_id = ? and delete_time IS NULL ORDER BY tgp_id DESC";
  let params = [req.params.customer_id];

  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

// 고객사 추가
app.post('/api/customer', upload.single('image'), (req, res) => {
  let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, now(), now(), null)';
  let name = req.body.name;
  let params = [name, '0'];

  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

// TGP 추가
app.post('/api/customer/:customer_id', upload.single('image'), (req, res) => {
  let sql = 'INSERT INTO TGP VALUES (null, ?, ?, ?, now(), now(), null)';
  let name = req.body.name;
  let params = [req.params.customer_id, name, '0'];

  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

// 고객사 삭제
app.delete('/api/customer/:customer_id', (req, res) => {
  let sql = 'UPDATE CUSTOMER SET delete_time = now() WHERE customer_id = ?';
  let params = [req.params.customer_id];

  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

// TGP 삭제
app.delete('/api/customer/:customer_id/:tgp_id', (req, res) => {
  let sql = 'UPDATE TGP SET delete_time = now() WHERE customer_id = ? and tgp_id = ?';
  let params = [req.params.customer_id, req.params.tgp_id];

  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

// TGP Step 1 조회
app.get('/api/tgp/:tgp_id', (req, res) => {
  let sql = "SELECT account, department, solution, amount, date_format(closingdate, '%Y-%m-%d') AS closingdate FROM FORM WHERE tgp_id = ? ORDER BY form_id DESC LIMIT 1";
  let params = [req.params.tgp_id, req.params.form_id];

  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

// TGP Step 1 저장
app.post('/api/tgp/:tgp_id', upload.single('image'), (req, res) => {
  let sql = 'INSERT INTO FORM VALUES (null, ?, ?, ?, ?, ?, ?, now(), now(), null)';
  let account = req.body.account;
  let department = req.body.department;
  let solution = req.body.solution;
  let amount = req.body.amount;
  let closingdate = req.body.closingdate;
  let params = [req.params.tgp_id, account, department, solution, amount, closingdate];
  
  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);    
    }
  );
});

// TGP Step 2 조회
app.get('/api/tgp/:tgp_id/:form_id', (req, res) => {
  let sql = "SELECT position1, position1_sign, position2, position2_sign, position3, position3_sign FROM FORM WHERE tgp_id = ? AND form_id = 31";
  let params = [req.params.tgp_id, req.params.form_id];

  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

// TGP Step 2 저장
app.post('/api/tgp/:tgp_id/:form_id', upload.single('image'), (req, res) => {
  let sql = 'UPDATE FORM SET position1 = ? AND position1_sign = ? AND position2 = ? AND position2_sign = ? position3 = ? AND position3_sign = ? WHERE tgp_id = ? AND form_id = ?';
  let position1 = req.body.position1;
  let position1_sign = req.body.position1_sign;
  let position2 = req.body.position2;
  let position2_sign = req.body.position2_sign;
  let position3 = req.body.position3;
  let position3_sign = req.body.position3_sign;
  let params = [position1, position1_sign, position2, position2_sign, position3, position3_sign, req.params.tgp_id, req.params.form_id];
  
  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);    
    }
  );
});


app.listen(port, () => console.log(`Listening on port ${port}`));
