import React, { useState, useEffect } from "react";
import TGP from '../components/TGP';
import TGPAdd from '../components/TGPAdd';
import '../App.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Table from 'react-bootstrap/Table';
import { BsCaretRightFill } from "react-icons/bs";
import { useParams, useLocation } from 'react-router-dom';

function TGPList(props) {
  const [tgp, setTGP] = useState("");
  const [loading, setLoading] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const { customer_id } = useParams();
  const customer_name = useLocation().state.customer_name;

  const stateRefresh = () => {
    setTGP("");
    setLoading(0);
    setSearchKeyword("");

    callApi()
      .then(res => setTGP(res))
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
      return <TGP stateRefresh={stateRefresh} key={c.tgp_id} customer_id={customer_id} tgp_id={c.tgp_id} name={c.name} status={c.status} status_code={c.status_code} update_time={c.update_time} />
    });
  }

  return (
    <div className="root">
      <AppBar position="fixed">
        <Toolbar>
          <IconButton className="menuButton" color="inherit" aria-label="Open drawer">
            <MenuIcon />
          </IconButton>
          <Typography className="title" variant="h6" color="inherit" noWrap>
            Sales Master
          </Typography>
          <div className="grow" />
          <div className="search">
            <div className="searchIcon">
              <SearchIcon />
            </div>
            <InputBase
              placeholder="검색하기"
              className="inputRoot"
              name="searchKeyword"
              value={searchKeyword}
              onChange={handleValueChange} />
          </div>
        </Toolbar>
      </AppBar>

      <div className="paper">
        <div className="paper_title">
          거래처 <BsCaretRightFill /> {customer_name}
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
              <th style={{ textAlign: 'center' }} >상태</th>
              <th style={{ textAlign: 'center' }} >수정한 시간</th>
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

export default TGPList;
