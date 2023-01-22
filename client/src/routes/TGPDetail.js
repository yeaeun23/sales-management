import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import '../App.css';
import Navi from "../components/Navi";
import TGPStep from "../components/TGPStep";
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Box from '@mui/material/Box';
import Button from 'react-bootstrap/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";

function TGPDetail(props) {
  const { customer_id, tgp_id } = useParams();
  const { customer_name, tgp_name } = useLocation().state;
  const [selectedMode, setSelectedMode] = useState("0");
  const [selectedFormId, setSelectedFormId] = useState("");
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getHistory = async () => {
      const response = await fetch('/tgp/' + tgp_id + '/history');
      const body = await response.json();
      return body;
    }

    // 완료일자(select) 세팅
    getHistory()
      .then(res => setHistory(res))
      .catch(err => console.log(err));

    // 모드(radio) 세팅
    document.getElementsByName("mode")[selectedMode].checked = true;
  }, [tgp_id, selectedMode]);

  useEffect(() => {
    // 완료일자(select) 활성화 여부
    const target = document.getElementsByName("history")[0];

    if (selectedMode === "0") {
      target.disabled = true;

      setSelectedFormId("");
      document.getElementsByName("history")[0].selectedIndex = 0;
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

  const handleNext = () => {
    let api = '/tgp/' + tgp_id;

    if (selectedMode === "0") {
      api += '/continue';
    }
    else if (selectedMode === "1") {
      if (selectedFormId !== "") {
        api += '/' + selectedFormId + '/copy';
      }
      else {
        alert('완료일자를 선택하세요.');
        return;
      }
    }

    getFormId(api).then(res => {
      const returnedFormId = res[0].form_id;
      const url = `/${customer_id}/${tgp_id}/${returnedFormId}/step1`;
      const state = {
        tgp_name: tgp_name,
        customer_name: customer_name
      };

      navigate(url, { state: state }); // 페이지 이동
    }).catch(err => console.log(err));
  }

  const getFormId = async (api) => {
    const response = await fetch(api);
    const body = await response.json();
    return body;
  }

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
            <Card.Header>Getting Start</Card.Header>
            <Card.Body>
              <Table>
                <colgroup>
                  <col width="10%" />
                  <col width="40%" />
                  <col width="40%" />
                </colgroup>
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
                        {history.map((item) => {
                          return <option key={item.form_id} value={item.form_id}>{item.form_id}: {item.update_time}</option>
                        })}
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
          <Button variant="primary" onClick={handleNext}>작성 시작 &gt;</Button>
        </Box>
      </div>
    </div>
  );
}

export default TGPDetail;
