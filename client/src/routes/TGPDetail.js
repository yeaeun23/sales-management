import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
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

  const [mode, setMode] = useState(0);
  const [formId, setFormId] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    callApi()
      .then(res => setHistory(res))
      .catch(err => console.log(err));

    document.getElementsByName("mode")[mode].checked = true;
  }, []);

  useEffect(() => {
    const target = document.getElementsByName("history")[0];

    if (mode.toString() === "0")
      target.disabled = true;
    else
      target.disabled = false;
  }, [mode]);

  const callApi = async () => {
    const response = await fetch('/tgp/' + tgp_id + '/history');
    const body = await response.json();
    return body;
  }

  const handleChangeMode = (e) => {
    setMode(e.target.value);
  };

  const handleChangeHistory = (e) => {
    setFormId(e.target.value);
  };

  return (
    <div className="root">
      <Navi search="" />

      <div className="paper">
        <div className="paper_title">
          <PlayArrowIcon />&nbsp;
          <Link className="title_link" to={"/"}>거래처</Link>&nbsp;
          <PlayArrowIcon />&nbsp;
          <Link className="title_link"
            to={"/customer/" + customer_id}
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
                        label="이어서 작성하기"
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
                        label="이전 내역 불러오기"
                        onChange={handleChangeMode}
                      />
                    </td>
                    <td>
                      <Form.Select
                        size={props.inputSize}
                        name="history"
                        onChange={handleChangeHistory}
                      >
                        <option>작업 시간 선택</option>
                        {
                          history.map((c, i) => {
                            if (i !== 0)
                              return <option key={c.form_id} value={c.form_id}>{c.update_time}</option>
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
          <Link
            to={`/customer/${customer_id}/${tgp_id}/1`}
            state={{ tgp_name: tgp_name, customer_name: customer_name, form_id: mode.toString() === "0" ? "" : formId }}>
            <Button variant="success">Start &gt;</Button>
          </Link>
        </Box>
      </div>
    </div>
  );
}

export default TGPDetail;
