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
import * as common from "../common";

function TGPList(props) {
  const [year, setYear] = useState([]);
  const [selectedYear, setSelectedYear] = useState("all");
  const [tgp, setTGP] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [total_amount, setTotalAmount] = useState(0);
  const { customer_id } = useParams();
  const customer_name = useLocation().state.customer_name;

  useEffect(() => {
    getYear()
      .then(res => setYear(res))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (selectedYear !== "") {
      setTGP("");
      getTGP()
        .then(res => setTGP(res))
        .catch(err => console.log(err));
    }
  }, [selectedYear]);

  useEffect(() => {
    if (tgp !== "") {
      let tmp_amount = 0;

      for (let i = 0; i < tgp.length; i++) {
        tmp_amount += Number(common.uncomma(tgp[i].amount));
      }

      setTotalAmount(tmp_amount);
    }
  }, [tgp]);

  const stateRefresh = () => {
    setTGP("");

    getYear()
      .then(res => setYear(res))
      .catch(err => console.log(err));

    getTGP()
      .then(res => setTGP(res))
      .catch(err => console.log(err));
  }

  const getYear = async () => {
    const response = await fetch(common.apiPrefix+'/year/tgp/' + customer_id);
    const body = await response.json();
    return body;
  }

  const getTGP = async () => {
    const response = await fetch(common.apiPrefix+'/tgp/' + customer_id + '/makeyear/' + selectedYear);
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
      return <TGP stateRefresh={stateRefresh} key={c.tgp_id} customer_id={customer_id} tgp_id={c.tgp_id} name={c.name} customer_name={customer_name} status={c.status} status_code={c.status_code} amount={c.amount} make_time={c.make_time} />
    });
  }

  return (
    <div className="root">
      <Navi searchKeyword={searchKeyword} handleValueChange={handleValueChange} />

      <div className="paper">
        <div className="paper_title">
          <PlayArrowIcon />&nbsp;
          <Link className="title_link" to={"/account"}>거래처</Link>&nbsp;
          <PlayArrowOutlinedIcon />&nbsp;
          {customer_name}

          <div className="total_amount">
            총 수주금액 : {common.comma(total_amount)}원
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
              <th style={{ textAlign: 'center' }}>
                생성일<br />
                (<Form.Select
                  size={props.inputSize}
                  name="year"
                  onChange={handleChangeYear}
                  style={{ width: "84px", display: "inline-block", padding: "0 0 0 6px" }}>
                  <option value="all">전체</option>
                  {year.map((item) => {
                    return <option key={item.year} value={item.year}>{item.year}</option>
                  })}
                </Form.Select>)
              </th>
              <th>TGP</th>
              <th style={{ textAlign: 'center' }}>진행상태</th>
              <th style={{ textAlign: 'right' }}>금액(원)</th>
              <th style={{ textAlign: 'right' }} colSpan="2">
                <TGPAdd stateRefresh={stateRefresh} kind="add" customer_id={customer_id} />
              </th>
            </tr>
          </thead>
          <tbody>
            {tgp ?
              (tgp.length === 0 ?
                <tr>
                  <td colSpan="6" align="center" className="emptyRow">
                    TGP가 없습니다.
                  </td>
                </tr>
                :
                filteredComponents(tgp)
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
              <td colSpan="3"></td>
              <td align="center" style={{ fontWeight: "bold" }}>총 금액(원)</td>
              <td align="right">{common.comma(total_amount)}</td>
              <td colSpan="2"></td>
            </tr>
          </tfoot>
        </Table>
      </div>
    </div>
  );
}

export default TGPList;
