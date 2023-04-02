import React, { useState, useEffect } from "react";
import '../App.scss';
import Navi from "../components/Navi";
import BoardAdd from '../components/BoardAdd';
import BoardDelete from '../components/BoardDelete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from 'react-bootstrap/Table';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import * as common from "../common/common";

function BoardList() {
  const [board, setBoard] = useState("");

  useEffect(() => {
    getBoard()
      .then(res => setBoard(res))
      .catch(err => console.log(err));
  }, []);

  const getBoard = async () => {
    const response = await fetch(common.apiPrefix + '/board');
    const body = await response.json();
    return body;
  }

  const stateRefresh = () => {
    setBoard("");

    getBoard()
      .then(res => setBoard(res))
      .catch(err => console.log(err));
  }

  return (
    <div className="root">
      <Navi />

      <div className="paper">
        <div className="paper_title">
          <PlayArrowIcon />&nbsp;공지사항
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
              <th style={{ textAlign: 'center' }}>등록일</th>
              <th>제목</th>
              <th style={{ textAlign: 'center' }}>등록자</th>
              <th style={{ textAlign: 'right' }} colSpan="2">
                {sessionStorage.getItem('user_status') === '9' ?
                  <BoardAdd stateRefresh={stateRefresh} kind="add" />
                  : ""
                }
              </th>
            </tr>
          </thead>
          <tbody>
            {board ?
              (board.length === 0 ?
                <tr>
                  <td colSpan="5" align="center" className="emptyRow">
                    공지사항이 없습니다.
                  </td>
                </tr>
                :
                board.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td style={{ textAlign: 'center' }}>{item.board_id}</td>
                      <td style={{ textAlign: 'center' }}>{item.make_time}</td>
                      <td>
                        <BoardAdd
                          stateRefresh={stateRefresh}
                          kind="view"
                          board_id={item.board_id}
                          title={item.title} />
                      </td>
                      <td style={{ textAlign: 'center' }}>{item.writer}</td>
                      <td colSpan="2" style={{ textAlign: 'right' }}>
                        {sessionStorage.getItem('user_status') === '9' ?
                          <span>
                            <BoardAdd
                              stateRefresh={stateRefresh}
                              kind="edit"
                              board_id={item.board_id} />
                            &nbsp;&nbsp;
                            <BoardDelete
                              stateRefresh={stateRefresh}
                              board_id={item.board_id}
                              title={item.title} />
                          </span>
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

export default BoardList;
