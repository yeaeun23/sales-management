import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Customer from '../components/Customer';
import CustomerAdd from '../components/CustomerAdd';
import '../App.css';
import Navi from "../components/Navi";
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from 'react-bootstrap/Table';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useNavigate } from "react-router-dom";
import * as common from "../common";

function CustomerList(props) {
  const userName = sessionStorage.getItem('user_name');
  const [year, setYear] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [customer, setCustomer] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [total_amount_year, setTotalAmountYear] = useState(0);
  const [total_amount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (userName) {
      getYear()
        .then(res => setYear(res))
        .catch(err => console.log(err));
    }
    else {
      navigate('/login');
      alert("로그인 정보가 없습니다.");
    }
  }, [userName]);

  useEffect(() => {
    if (year.length !== 0) {
      setSelectedYear(year[0].year.replace("년", ""));
    }
  }, [year]);

  useEffect(() => {
    setCustomer("");

    if (selectedYear !== "") {
      getCustomer()
        .then(res => setCustomer(res))
        .catch(err => console.log(err));
    }
    else {
      getCustomer2()
        .then(res => setCustomer(res))
        .catch(err => console.log(err));
    }
  }, [selectedYear]);

  useEffect(() => {
    if (customer !== "") {
      let tmp_amount_year = 0;
      let tmp_amount = 0;

      for (let i = 0; i < customer.length; i++) {
        tmp_amount_year += Number(common.uncomma(customer[i].amount_year));
        tmp_amount += Number(common.uncomma(customer[i].amount));
      }

      setTotalAmountYear(tmp_amount_year);
      setTotalAmount(tmp_amount);
    }
  }, [customer]);

  const stateRefresh = () => {
    setCustomer("");

    getYear()
      .then(res => setYear(res))
      .catch(err => console.log(err));

    if (selectedYear !== "") {
      getCustomer()
        .then(res => setCustomer(res))
        .catch(err => console.log(err));
    }
    else {
      getCustomer2()
        .then(res => setCustomer(res))
        .catch(err => console.log(err));
    }
  }

  const getYear = async () => {
    const response = await fetch(common.apiPrefix + '/year/customer/' + userName);
    const body = await response.json();
    return body;
  }

  const getCustomer = async () => {
    const response = await fetch(common.apiPrefix + '/customer/' + userName + '/makeyear/' + selectedYear);
    const body = await response.json();
    return body;
  }

  const getCustomer2 = async () => {
    const response = await fetch(common.apiPrefix + '/customer/' + userName + '/makeyear');
    const body = await response.json();
    return body;
  }

  const handleValueChange = (e) => {
    setSearchKeyword(e.target.value);
  }

  const handleChangeYear = (e) => {
    setSelectedYear(e.target.value);
  }

  const filteredComponents = (data) => {
    data = data.filter((c) => {
      return c.name.indexOf(searchKeyword) > -1;
    });
    return data.map((c) => {
      return <Customer stateRefresh={stateRefresh} key={c.customer_id} customer_id={c.customer_id} name={c.name} amount_year={common.comma(c.amount_year)} amount={common.comma(c.amount)} make_time={c.make_time} />
    });
  }

  return (
    <div className="root">
      <Navi searchKeyword={searchKeyword} handleValueChange={handleValueChange} />

      <div className="paper">
        <div className="paper_title">
          <PlayArrowIcon />&nbsp;거래처

          <div className="total_amount" style={{ textAlign: "right" }}>
            {year.length === 0 ? "----" : selectedYear}
            년 총 성공 수주금액: {common.comma(total_amount_year)}원<br />
            전체년도 총 성공 수주금액: {common.comma(total_amount)}원
          </div>
        </div>

        <Table striped hover>
          <colgroup>
            <col width="5%" />
            <col width="12%" />
            <col width="34%" />
            <col width="18%" />
            <col width="18%" />
            <col width="13%" />
          </colgroup>
          <thead style={{ borderBottom: "3px solid #DFE2E5" }}>
            <tr>
              <th style={{ textAlign: 'center' }}>No</th>
              <th style={{ textAlign: 'center' }}>생성일</th>
              <th>거래처</th>
              <th style={{ textAlign: 'right' }}>
                <Form.Select
                  size={props.inputSize}
                  name="year"
                  onChange={handleChangeYear}
                  style={{ width: "84px", display: "inline-block", padding: "0 0 0 6px" }}>
                  {
                    year.map((item) => {
                      return <option key={item.year} value={item.year}>{item.year}</option>
                    })
                  }
                </Form.Select>
                &nbsp;TGP<br />성공금액(원)</th>
              <th style={{ textAlign: 'right' }}>전체 TGP<br />성공금액(원)</th>
              <th style={{ textAlign: 'right' }} colSpan="2">
                <CustomerAdd stateRefresh={stateRefresh} kind="add" />
              </th>
            </tr>
          </thead>
          <tbody>
            {customer ?
              (customer.length === 0 ?
                <tr>
                  <td colSpan="6" align="center" className="emptyRow">
                    거래처가 없습니다.
                  </td>
                </tr>
                :
                filteredComponents(customer)
              )
              :
              <tr>
                <td colSpan="6" align="center">
                  <CircularProgress className="progress" variant="indeterminate" />
                </td>
              </tr>
            }
          </tbody>
          <tfoot style={{ borderTop: "2px solid #DFE2E5" }}>
            <tr>
              <td colSpan="3" align="right" style={{ fontWeight: "bold" }}>총 성공금액(원)</td>
              <td align="right" style={{ fontWeight: "bold" }}>{common.comma(total_amount_year)}</td>
              <td align="right" style={{ fontWeight: "bold" }}>{common.comma(total_amount)}</td>
              <td colSpan="2"></td>
            </tr>
          </tfoot>
        </Table>
      </div>
    </div>
  );
}

export default CustomerList;
