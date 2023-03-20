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

function Board() {


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
            <col width="60%" />
            <col width="15%" />
            <col width="20%" />
          </colgroup>
          <thead style={{ borderBottom: "3px solid #DFE2E5" }}>
            <tr>
              <th style={{ textAlign: 'center' }}>No</th>
              <th>제목</th>
              <th style={{ textAlign: 'center' }}>작성자</th>
              <th style={{ textAlign: 'center' }}>등록일</th>
            </tr>
          </thead>
          <tbody>
            
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Board;
