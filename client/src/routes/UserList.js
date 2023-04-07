import React, { useState, useEffect } from "react";
import '../App.scss';
import Navi from "../components/Navi";
import UserAdd from '../components/UserAdd';
import UserDelete from '../components/UserDelete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from 'react-bootstrap/Table';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import * as common from "../common/common";

function UserList() {
  const [user, setUser] = useState("");

  useEffect(() => {
    getUser()
      .then(res => setUser(res))
      .catch(err => console.log(err));
  }, []);

  const getUser = async () => {
    const api = common.apiPrefix + '/user-list/' + sessionStorage.getItem('user_name');
    //const api = common.apiPrefix + '/user';
    const response = await fetch(api);
    const body = await response.json();
    return body;
  }

  const stateRefresh = () => {
    setUser("");

    getUser()
      .then(res => setUser(res))
      .catch(err => console.log(err));
  }

  return (
    <div className="root">
      <Navi />

      <div className="paper">
        <div className="paper_title">
          <PlayArrowIcon />&nbsp;계정관리
        </div>

        <Table striped hover>
          <colgroup>
            <col width="5%" />
            <col width="12%" />
            <col width="61%" />
            <col width="9%" />
            <col width="13%" />
          </colgroup>
          <thead style={{ borderBottom: "3px solid #DFE2E5" }}>
            <tr>
              <th style={{ textAlign: 'center' }}>No</th>
              <th style={{ textAlign: 'center' }}>추가일</th>
              <th>아이디</th>
              <th style={{ textAlign: 'center' }}>활성상태</th>
              <th style={{ textAlign: 'right' }} colSpan="2">
                {
                  sessionStorage.getItem('user_status') === '9' ?
                    <UserAdd stateRefresh={stateRefresh} kind="add" />
                    : ""
                }
              </th>
            </tr>
          </thead>
          <tbody>
            {user ?
              (user.length === 0 ?
                <tr>
                  <td colSpan="5" align="center" className="emptyRow">
                    계정이 없습니다.
                  </td>
                </tr>
                :
                user.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td style={{ textAlign: 'center' }}>{item.user_id}</td>
                      <td style={{ textAlign: 'center' }}>{item.make_time}</td>
                      <td>
                        <UserAdd
                          stateRefresh={stateRefresh}
                          kind="view"
                          user_id={item.user_id}
                          name={item.name} />
                      </td>
                      <td style={{ textAlign: 'center' }}>{item.status}</td>
                      <td colSpan="2" style={{ textAlign: 'right' }}>
                        <UserAdd
                          stateRefresh={stateRefresh}
                          kind="edit"
                          user_id={item.user_id} />
                        &nbsp;&nbsp;
                        {
                          sessionStorage.getItem('user_status') === '9' ?
                            <UserDelete
                              stateRefresh={stateRefresh}
                              user_id={item.user_id}
                              name={item.name} />
                            : ""
                        }
                      </td>
                    </tr>
                  )
                })
              )
              :
              <tr>
                <td colSpan="5" align="center">
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

export default UserList;
