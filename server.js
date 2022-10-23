const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

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
const upload = multer({dest: './upload'});

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

app.use('/image', express.static('./upload'));

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

app.listen(port, () => console.log(`Listening on port ${port}`));
