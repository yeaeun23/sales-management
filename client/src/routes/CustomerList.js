import React, { useState, useEffect } from "react";
import Customer from '../components/Customer';
import CustomerAdd from '../components/CustomerAdd';
import '../App.css';
import Navi from "../components/Navi";
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from 'react-bootstrap/Table';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function CustomerList() {
  const [customer, setCustomer] = useState("");
  const [loading, setLoading] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");

  const stateRefresh = () => {
    setCustomer("");
    setLoading(0);
    setSearchKeyword("");

    callApi()
      .then(res => setCustomer(res))
      .catch(err => console.log(err));
  }

  const progress = () => {
    const completed = loading;
    setLoading((completed >= 100) ? 0 : completed + 1);
  }

  useEffect(() => {
    setInterval(progress, 20);
  });

  useEffect(() => {
    callApi()
      .then(res => setCustomer(res))
      .catch(err => console.log(err));
  }, []);

  const callApi = async() => {
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
      return <Customer stateRefresh={stateRefresh} key={c.customer_id} customer_id={c.customer_id} name={c.name} status={c.status} status_code={c.status_code} update_time={c.update_time} />
    });
  }

  return (
    <div className="root">
      <Navi searchKeyword={searchKeyword} handleValueChange={handleValueChange} />
      
      <div className="paper">
        <div className="paper_title">
          <PlayArrowIcon />&nbsp;거래처
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
              <th>거래처</th>
              <th style={{ textAlign: 'center' }} >진행 상태</th>
              <th style={{ textAlign: 'center' }} >수정한 시간</th>
              <th style={{ textAlign: 'right' }} colSpan="2">
                <CustomerAdd stateRefresh={stateRefresh} kind="add" />
              </th>
            </tr>
          </thead>
          <tbody>
            { customer ?
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
                  <CircularProgress className="progress" variant="indeterminate" value={loading} />
                </td>
              </tr>
            }
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default CustomerList;
