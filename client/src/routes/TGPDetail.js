import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
//import CircularProgress from '@material-ui/core/CircularProgress';
import '../App.css';
import Navi from "../components/Navi";
import TGPStep from "../components/TGPStep";
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Box from '@mui/material/Box';
import Button from 'react-bootstrap/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import { useParams, useLocation, Link } from "react-router-dom";

function TGPDetail(props) {
  const { customer_id, tgp_id } = useParams();
  const customer_name = useLocation().state.customer_name;
  const tgp_name = useLocation().state.tgp_name;

  const [selectedMode, setSelectedMode] = useState(0);
  const [selectedFormId, setSelectedFormId] = useState("");
  const [returnedFormId, setReturnedFormId] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // 완료일자(select) 세팅
    getHistory()
      .then(res => setHistory(res))
      .catch(err => console.log(err));

    // 모드(radio) 세팅
    document.getElementsByName("mode")[selectedMode].checked = true;
  }, []);

  const getHistory = async () => {
    const response = await fetch('/tgp/' + tgp_id + '/history');
    const body = await response.json();
    return body;
  }

  useEffect(() => {
    const target = document.getElementsByName("history")[0];

    if (selectedMode.toString() === "0") {
      target.disabled = true;

      setSelectedFormId("");
      document.getElementsByName("history")[0].selectedIndex=0;
    }      
    else {
      target.disabled = false;
    }      
  }, [selectedMode]);

  const handleChangeMode = (e) => {
    setSelectedMode(e.target.value);
  };

  const handleChangeHistory = (e) => {
    setSelectedFormId(e.target.value);
  };

  const onClickNext = (e) => {
    let api = '/tgp/' + tgp_id;

    if (selectedMode.toString() === "0") {
      api += '/continue';
    }
    else if (selectedMode.toString() === "1") {
      if (selectedFormId !== "") {
        api += '/' + selectedFormId + '/copy';
      }
      else {
        alert('완료일자를 선택하세요.');
        return;
      }
    }

    getFormId(api)
      .then(res => setReturnedFormId(res[0].form_id.toString()))
      .catch(err => console.log(err));
  }

  const getFormId = async (api) => {
    const response = await fetch(api);
    const body = await response.json();
    return body;
  }

  useEffect(() => {
    if (returnedFormId !== "") {
      const url = `/${customer_id}/${tgp_id}/${returnedFormId}/step1`;
      console.log(url);

      window.location.href = url;
    }
  }, [returnedFormId]);

  return (
    <div className="root">
      <Navi search="" />

      <div className="paper">
        <div className="paper_title">
          <PlayArrowIcon />&nbsp;
          <Link className="title_link" to={"/"}>거래처</Link>&nbsp;
          <PlayArrowIcon />&nbsp;
          <Link className="title_link"
            to={"/" + customer_id}
            state={{ customer_name: customer_name }}>
            {customer_name}
          </Link>&nbsp;
          <PlayArrowOutlinedIcon />&nbsp;
          {tgp_name}
        </div>

        <TGPStep step={0} />

        <div sx={{ mt: 2, mb: 1 }}>
          <Card>
            <Card.Header>Get Started</Card.Header>
            <Card.Body>
              <Table>
                <tbody>
                  <tr>
                    <th rowSpan={2}>
                      <Form.Label column={props.inputSize}>작업 선택</Form.Label>
                    </th>
                    <td>
                      <Form.Check
                        type="radio"
                        name="mode"
                        id="mode1"
                        value={0}
                        label="이어서(새로) 작성하기"
                        onChange={handleChangeMode}
                      />
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <Form.Check
                        type="radio"
                        name="mode"
                        id="mode2"
                        value={1}
                        label="완료된 시트 복사 후 불러오기"
                        onChange={handleChangeMode}
                      />
                    </td>
                    <td>
                      <Form.Select
                        size={props.inputSize}
                        name="history"
                        onChange={handleChangeHistory}
                      >
                        <option value="">완료일자 선택</option>
                        {
                          history.map((c, i) => {
                            return <option key={c.form_id} value={c.form_id}>{c.form_id}: {c.update_time}</option>
                          })
                        }
                      </Form.Select>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>

        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button variant="secondary">미리보기</Button>
          &nbsp;&nbsp;
          {/* <Link
          id="goNext"
            to=""
            state={{ tgp_name: tgp_name, customer_name: customer_name }}
            > */}
          <Button variant="success" onClick={onClickNext}>Start &gt;</Button>
          {/* </Link>           */}

          {/* <Button variant="success"
          state={{ tgp_name: tgp_name, customer_name: customer_name }}
          onClick={onClickNext}
          >Start &gt;</Button> */}
        </Box>
      </div>
    </div>
  );
}

export default TGPDetail;
