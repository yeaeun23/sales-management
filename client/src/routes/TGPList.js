import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import TGP from '../components/TGP';
import TGPAdd from '../components/TGPAdd';
import '../App.css';
import Navi from "../components/Navi";
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from 'react-bootstrap/Table';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import { useParams, useLocation, Link } from 'react-router-dom';

function TGPList(props) {
  const [tgp, setTGP] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const { customer_id } = useParams();
  const customer_name = useLocation().state.customer_name;
  const [total_amount, setTotalAmount] = useState(0);

  const stateRefresh = () => {
    setTGP("");
    setSearchKeyword("");

    callApi()
      .then(res => setTGP(res))
      .catch(err => console.log(err));
  }

  useEffect(() => {
    callApi()
      .then(res => setTGP(res))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    let tmp_amount = 0;
    const uncomma = (str) => {
      str = String(str);
      return str.replace(/[^\d]+/g, "");
    };

    for (let i = 0; i < tgp.length; i++) {
      tmp_amount += Number(uncomma(tgp[i].amount));
    }
    setTotalAmount(tmp_amount);
  }, [tgp]);

  const comma = (str) => {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
  };

  const callApi = async () => {
    const response = await fetch('/tgp/' + customer_id);
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
      return <TGP stateRefresh={stateRefresh} key={c.tgp_id} customer_id={customer_id} tgp_id={c.tgp_id} name={c.name} customer_name={customer_name} status={c.status} status_code={c.status_code} amount={c.amount} make_time={c.make_time} />
    });
  }

  return (
    <div className="root">
      <Navi searchKeyword={searchKeyword} handleValueChange={handleValueChange} />

      <div className="paper">
        <div className="paper_title">
          <PlayArrowIcon />&nbsp;
          <Link className="title_link" to={"/"}>거래처</Link>&nbsp;
          <PlayArrowOutlinedIcon />&nbsp;
          {customer_name}

          <div className="total_amount">
            총 금액: {comma(total_amount)}원
            &nbsp;&nbsp;&nbsp;
            <Form.Select
              size={props.inputSize}
              title="연도 선택"
              style={{ width: "90px", display: "inline-block" }}>
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
          </div>
        </div>

        <Table striped hover>
          <colgroup>
            <col width="6%" />
            <col width="12%" />
            <col width="40%" />
            <col width="10%" />
            <col width="18%" />
            <col width="7%" />
            <col width="7%" />
          </colgroup>
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>No</th>
              <th style={{ textAlign: 'center' }}>추가일</th>
              <th>TGP</th>
              <th style={{ textAlign: 'center' }}>진행상태</th>
              <th style={{ textAlign: 'center' }}>금액(원)</th>
              <th style={{ textAlign: 'right' }} colSpan="2">
                <TGPAdd stateRefresh={stateRefresh} kind="add" customer_id={customer_id} />
              </th>
            </tr>
          </thead>
          <tbody>
            {tgp ?
              (tgp.length === 0 ?
                <tr>
                  <td colSpan="7" align="center" className="emptyRow">
                    TGP가 없습니다.
                  </td>
                </tr>
                :
                filteredComponents(tgp)
              )
              :
              <tr>
                <td colSpan="7" align="center">
                  <CircularProgress className="progress" variant="indeterminate" />
                </td>
              </tr>
            }
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default TGPList;
