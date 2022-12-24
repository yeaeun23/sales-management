import React, { useState, useEffect } from "react";
import TGP from '../components/TGP';
import TGPAdd from '../components/TGPAdd';
import '../App.css';
import Navi from "../components/Navi";
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from 'react-bootstrap/Table';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import { useParams, useLocation, Link } from 'react-router-dom';

function TGPList() {
  const [tgp, setTGP] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const { customer_id } = useParams();
  const customer_name = useLocation().state.customer_name;

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

  const callApi = async() => {
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
      return <TGP stateRefresh={stateRefresh} key={c.tgp_id} customer_id={customer_id} tgp_id={c.tgp_id} name={c.name} customer_name={customer_name} status={c.status} status_code={c.status_code} update_time={c.update_time} />
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
        </div>
        
        <Table striped hover>
          <colgroup>
            <col width="10%" />
            <col width="30%" />
            <col width="15%" />
            <col width="25%" />
            <col width="10%" />
            <col width="10%" />
          </colgroup>
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }} >No</th>
              <th>TGP</th>
              <th style={{ textAlign: 'center' }} >진행 상태</th>
              <th style={{ textAlign: 'center' }} >수정한 시간</th>
              <th style={{ textAlign: 'right' }} colSpan="2">
                <TGPAdd stateRefresh={stateRefresh} kind="add" customer_id={customer_id} />
              </th>
            </tr>
          </thead>
          <tbody>
            { tgp ?
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
        </Table>
      </div>
    </div>
  );
}

export default TGPList;
