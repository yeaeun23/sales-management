import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Customer from '../components/Customer';
import CustomerAdd from '../components/CustomerAdd';
import '../App.css';
import Navi from "../components/Navi";
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from 'react-bootstrap/Table';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function CustomerList(props) {
  const [customer, setCustomer] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [total_amount, setTotalAmount] = useState(0);

  const stateRefresh = () => {
    setCustomer("");
    setSearchKeyword("");

    callApi()
      .then(res => setCustomer(res))
      .catch(err => console.log(err));
  }

  useEffect(() => {
    callApi()
      .then(res => setCustomer(res))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    let tmp_amount = 0;
    const uncomma = (str) => {
      str = String(str);
      return str.replace(/[^\d]+/g, "");
    };

    for (let i = 0; i < customer.length; i++) {
      tmp_amount += Number(uncomma(customer[i].amount));
    }
    setTotalAmount(tmp_amount);
  }, [customer]);

  const comma = (str) => {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
  };

  const callApi = async () => {
    const response = await fetch('/customer');
    const body = await response.json();
    return body;
  }

  const handleValueChange = (e) => {
    setSearchKeyword(e.target.value);
  }

  const filteredComponents = (data) => {
    data = data.filter((c) => {
      return c.name.indexOf(searchKeyword) > -1;
    });
    return data.map((c) => {
      return <Customer stateRefresh={stateRefresh} key={c.customer_id} customer_id={c.customer_id} name={c.name} status={c.status} status_code={c.status_code} amount={comma(c.amount)} make_time={c.make_time} />
    });
  }

  return (
    <div className="root">
      <Navi searchKeyword={searchKeyword} handleValueChange={handleValueChange} />

      <div className="paper">
        <div className="paper_title">
          <PlayArrowIcon />&nbsp;거래처

          <div className="total_amount">
            {/* 총 성공 수주 금액: {comma(total_amount)}원 */}
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
                  title="연도 선택"
                  style={{ width: "84px", display: "inline-block", padding: "0 0 0 6px" }}>
                  {
                    ["2023년", "2022년"].map((option) => (
                      <option
                        key={option}
                        value={option}>
                        {option}
                      </option>
                    ))
                  }
                </Form.Select>
                &nbsp;TGP<br />총 성공금액(원)</th>
              <th style={{ textAlign: 'right' }}>전체 TGP<br />총 성공금액(원)</th>
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
              <td align="right" style={{ fontWeight: "bold" }}>{comma(total_amount)}</td>
              <td align="right" style={{ fontWeight: "bold" }}>{comma(total_amount)}</td>
              <td colSpan="2"></td>
            </tr>
          </tfoot>
        </Table>
      </div>
    </div>
  );
}

export default CustomerList;
