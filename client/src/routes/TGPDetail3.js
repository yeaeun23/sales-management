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
import { post } from "axios";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import LineAdd from '../components/LineAdd';
import LineDelete from '../components/LineDelete';

function TGPDetail3(props) {
  const { customer_id, tgp_id, form_id } = useParams();
  const { customer_name, tgp_name } = useLocation().state;
  const [inputs1, setInputs1] = useState([]);
  const [inputs2, setInputs2] = useState([]);
  const [inputs3, setInputs3] = useState([]);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const setInputData1 = async () => {
      const response = await fetch('/tgp/' + form_id + '/strategy1');
      const body = await response.json();
      return body;
    }

    setInputData1().then(res => {
      setInputs1(res);
      setLoading1(false);
    }).catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const setInputData2 = async () => {
      const response = await fetch('/tgp/' + form_id + '/strategy2');
      const body = await response.json();
      return body;
    }

    setInputData2().then(res => {
      setInputs2(res);
      setLoading2(false);
    }).catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const setInputData3 = async () => {
      const response = await fetch('/tgp/' + form_id + '/action');
      const body = await response.json();
      return body;
    }

    setInputData3().then(res => {
      setInputs3(res);
      setLoading3(false);
    }).catch(err => console.log(err));
  }, []);

  const handleValueChange1 = (index) => (e) => {
    const newArray = inputs1.map((item, i) => {
      if (index === i) {
        return { ...item, [e.target.name]: e.target.value };
      } else {
        return item;
      }
    });
    setInputs1(newArray);
  };

  const handleValueChange2 = (index) => (e) => {
    const newArray = inputs2.map((item, i) => {
      if (index === i) {
        return { ...item, [e.target.name]: e.target.value };
      } else {
        return item;
      }
    });
    setInputs2(newArray);
  };

  const handleValueChange3 = (index) => (e) => {
    const newArray = inputs3.map((item, i) => {
      if (index === i) {
        return { ...item, [e.target.name]: e.target.value };
      } else {
        return item;
      }
    });
    setInputs3(newArray);
  };

  const handleMove = (e) => {
    if (e.target.innerHTML === "작성 완료") {
      if (window.confirm("작성 완료하시겠습니까?")) {
        // 저장
        saveInputData();

        // 이동
        const url = `/${customer_id}`;
        const state = {
          tgp_name: tgp_name,
          customer_name: customer_name
        };

        navigate(url, { state: state });
        alert("작성 완료되었습니다.");
      }
    }
    else {
      if (window.confirm("저장하시겠습니까?"))
        saveInputData();
    }

    return;
  }

  const handleSave = () => {
    saveInputData();
    alert("저장되었습니다.");
  }

  const saveInputData = () => {
    const api = '/tgp/' + tgp_id + '/' + form_id + '/step3';

    const data = {
      strength: inputs1.strength,
      behavior1: inputs1.behavior1,

      weakness: inputs2.weakness,
      behavior2: inputs2.behavior2,

      action: inputs3.action,
      date: inputs3.date,
      owner: inputs3.owner,
      collaborator: inputs3.collaborator
    };

    const config = {
      headers: { 'content-type': 'application/json' }
    };

    return post(api, data, config);
  }

  return (
    <div className="root">
      <Navi />

      <div className="paper">
        <div className="paper_title">
          <PlayArrowIcon />&nbsp;
          <Link className="title_link"
            to={"/"}
            onClick={handleMove}>
            거래처
          </Link>&nbsp;
          <PlayArrowIcon />&nbsp;
          <Link className="title_link"
            to={"/" + customer_id}
            state={{ customer_name: customer_name }}
            onClick={handleMove}>
            {customer_name}
          </Link>&nbsp;
          <PlayArrowOutlinedIcon />&nbsp;
          {tgp_name}
        </div>

        <TGPStep step={3} />

        <div sx={{ mt: 2, mb: 1 }}>
          <Card>
            <Card.Header>
              전략 분석
              <Button size="sm" variant="success" style={{ float: "right" }} onClick={handleSave}>중간 저장</Button>
            </Card.Header>
            {(!loading1 && !loading2) ?
              <Card.Body>
                <Table>
                  <colgroup className="col_form3_1">
                    <col /><col /><col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>
                        <Form.Label column={props.inputSize}>강점/기회 요인 (Blue Sign)</Form.Label>
                      </th>
                      <th>
                        <Form.Label column={props.inputSize}>강점/기회를 강화하거나 활용할 수 있는 방안</Form.Label>
                      </th>
                      <th></th>
                    </tr>
                    {
                      inputs1.map((item, i) => {
                        return (
                          <tr key={item.strategy1_id}>
                      <td>
                        <Form.Control size={props.inputSize} type="text" name="strength" value={item.strength || ''} onChange={handleValueChange1(i)} />
                      </td>
                      <td>
                        <Form.Control size={props.inputSize} type="text" name="behavior1" value={item.behavior1 || ''} onChange={handleValueChange1(i)} />
                      </td>
                      <td>
                        <LineAdd size={props.inputSize} />
                        <LineDelete size={props.inputSize} />
                      </td>
                    </tr>
                    )
                  })
                }
                  </tbody>
                </Table>
                <Table>
                  <colgroup className="col_form3_1">
                    <col /><col /><col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>
                        <Form.Label column={props.inputSize}>약점/위협 요인 (Red/Gray Sign)</Form.Label>
                      </th>
                      <th>
                        <Form.Label column={props.inputSize}>약점/위협을 최소화하거나 제거할 수 있는 방안</Form.Label>
                      </th>
                      <th></th>
                    </tr>
                    {
                      inputs2.map((item, i) => {
                        return (
                          <tr key={item.strategy2_id}>
                      <td>
                        <Form.Control size={props.inputSize} type="text" name="weakness" value={item.weakness || ''} onChange={handleValueChange2(i)} />
                      </td>
                      <td>
                        <Form.Control size={props.inputSize} type="text" name="behavior2" value={item.behavior2 || ''} onChange={handleValueChange2(i)} />
                      </td>
                      <td>
                        <LineAdd size={props.inputSize} />
                        <LineDelete size={props.inputSize} />
                      </td>
                    </tr>
                    )
                  })
                }
                  </tbody>
                </Table>
              </Card.Body>
              :
              <Card.Body>
                <Table style={{ marginBottom: 0 }}>
                  <tbody>
                    <tr>
                      <td align="center">
                        <CircularProgress className="progress" variant="indeterminate" />
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            }
          </Card>

          <Card>
            <Card.Header>
              Action Plan (중요하고 시급한 액션)
              <Button size="sm" variant="success" style={{ float: "right" }} onClick={handleSave}>중간 저장</Button>
            </Card.Header>
            <Card.Body>
              <Table id="TBActionPlan">
                <colgroup className="col_form3_2">
                  <col /><col /><col /><col />
                </colgroup>
                {!loading3 ?
                  <tbody>
                    <tr>
                      <th>
                        <Form.Label column={props.inputSize}>실행액션</Form.Label>
                      </th>
                      <th>
                        <Form.Label column={props.inputSize}>실행일시</Form.Label>
                      </th>
                      <th>
                        <Form.Label column={props.inputSize}>실행자</Form.Label>
                      </th>
                      <th>
                        <Form.Label column={props.inputSize}>협조자 (부서)</Form.Label>
                      </th>
                      <th></th>
                    </tr>
                    {
                      inputs3.map((item, i) => {
                        return (
                          <tr key={item.action_id}>
                      <td>
                        <Form.Control size={props.inputSize} type="text" name="action" value={item.action || ''} onChange={handleValueChange3(i)} />
                      </td>
                      <td>
                        <Form.Control size={props.inputSize} type="date" name="date" value={item.date || ''} onChange={handleValueChange3(i)} max="2999-12-31" />
                      </td>
                      <td>
                        <Form.Control size={props.inputSize} type="text" name="owner" value={item.owner || ''} onChange={handleValueChange3(i)} />
                      </td>
                      <td>
                        <Form.Control size={props.inputSize} type="text" name="collaborator" value={item.collaborator || ''} onChange={handleValueChange3(i)} />
                      </td>
                      <td>
                        <LineAdd size={props.inputSize} />
                        <LineDelete size={props.inputSize} />
                      </td>
                    </tr>
                    )
                  })
                }
                  </tbody>
                  :
                  <tbody>
                    <tr>
                      <td colSpan="5" align="center">
                        <CircularProgress className="progress" variant="indeterminate" />
                      </td>
                    </tr>
                  </tbody>
                }
              </Table>
            </Card.Body>
          </Card>
        </div>

        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Link
            to={`/${customer_id}/${tgp_id}/${form_id}/step2`}
            state={{ tgp_name: tgp_name, customer_name: customer_name }}>
            <Button variant="secondary" onClick={handleMove}>&lt; 이전 단계</Button>
          </Link>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button variant="secondary">미리보기</Button>
          &nbsp;&nbsp;
          <Button variant="primary" onClick={handleMove}>작성 완료</Button>
        </Box>
      </div>
    </div>
  );
}

export default TGPDetail3;
