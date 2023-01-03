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
import { useParams, useLocation, Link } from 'react-router-dom';
import LineAdd from '../components/LineAdd';
import LineDelete from '../components/LineDelete';

function TGPDetail3(props) {
  const { customer_id, tgp_id, form_id } = useParams();
  //const customer_name = useLocation().state.customer_name;
  //const tgp_name = useLocation().state.tgp_name;
  const customer_name = "";
  const tgp_name = "";

  const [inputs1, setInputs1] = useState({
    flag: false,
    strength: "",
    behavior1: ""
  });

  const [inputs2, setInputs2] = useState({
    flag: false,
    weakness: "",
    behavior2: ""
  });

  const [inputs3, setInputs3] = useState({
    flag: false,
    action: "",
    date: "",
    owner: "",
    collaborator: ""
  });

  useEffect(() => {
    const setInputData1 = async () => {
      const response = await fetch('/tgp/' + form_id + '/strategy1');
      const body = await response.json();
      return body;
    }

    setInputData1().then(res => setInputs1({
      ...inputs1,
      flag: true,
      strength: res[0].strength,
      behavior1: res[0].behavior1
    })).catch(err => console.log(err));
  }, [tgp_id]);

  useEffect(() => {
    const setInputData2 = async () => {
      const response = await fetch('/tgp/' + form_id + '/strategy2');
      const body = await response.json();
      return body;
    }

    setInputData2().then(res => setInputs2({
      ...inputs2,
      flag: true,
      weakness: res[0].weakness,
      behavior2: res[0].behavior2
    })).catch(err => console.log(err));
  }, [tgp_id]);

  useEffect(() => {
    const setInputData3 = async () => {
      const response = await fetch('/tgp/' + form_id + '/action');
      const body = await response.json();
      return body;
    }

    setInputData3().then(res => setInputs3({
      ...inputs3,
      flag: true,
      action: res[0].action,
      date: res[0].date,
      owner: res[0].owner,
      collaborator: res[0].collaborator
    })).catch(err => console.log(err));
  }, [tgp_id]);

  const handleValueChange1 = (e) => {
    const { name, value } = e.target;
    setInputs1({ ...inputs1, [name]: value });
  };

  const handleValueChange2 = (e) => {
    const { name, value } = e.target;
    setInputs2({ ...inputs2, [name]: value });
  };

  const handleValueChange3 = (e) => {
    const { name, value } = e.target;
    setInputs3({ ...inputs3, [name]: value });
  };

  const handleBack = () => {
    saveInputData();
  };

  const handleNext = () => {
    saveInputData();
  };

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

        <TGPStep step={3} />

        <div sx={{ mt: 2, mb: 1 }}>
          <Card>
            <Card.Header>전략 분석</Card.Header>
            {(inputs1.flag && inputs2.flag) ?
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
                    <tr>
                      <td>
                        <Form.Control size={props.inputSize} type="text" name="strength" value={inputs1.strength || ''} onChange={handleValueChange1} />
                      </td>
                      <td>
                        <Form.Control size={props.inputSize} type="text" name="behavior1" value={inputs1.behavior1 || ''} onChange={handleValueChange1} />
                      </td>
                      <td>
                        <LineAdd size={props.inputSize} />
                        <LineDelete size={props.inputSize} />
                      </td>
                    </tr>
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
                    <tr>
                      <td>
                        <Form.Control size={props.inputSize} type="text" name="weakness" value={inputs2.weakness || ''} onChange={handleValueChange2} />
                      </td>
                      <td>
                        <Form.Control size={props.inputSize} type="text" name="behavior2" value={inputs2.behavior2 || ''} onChange={handleValueChange2} />
                      </td>
                      <td>
                        <LineAdd size={props.inputSize} />
                        <LineDelete size={props.inputSize} />
                      </td>
                    </tr>
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
            <Card.Header>Action Plan (중요하고 시급한 액션)</Card.Header>
            <Card.Body>
              <Table id="TBActionPlan">
                <colgroup className="col_form3_2">
                  <col /><col /><col /><col />
                </colgroup>
                {inputs3.flag ?
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
                    <tr>
                      <td>
                        <Form.Control size={props.inputSize} type="text" name="action" value={inputs3.action || ''} onChange={handleValueChange3} />
                      </td>
                      <td>
                        <Form.Control size={props.inputSize} type="date" name="date" value={inputs3.date || ''} onChange={handleValueChange3} max="2999-12-31" />
                      </td>
                      <td>
                        <Form.Control size={props.inputSize} type="text" name="owner" value={inputs3.owner || ''} onChange={handleValueChange3} />
                      </td>
                      <td>
                        <Form.Control size={props.inputSize} type="text" name="collaborator" value={inputs3.collaborator || ''} onChange={handleValueChange3} />
                      </td>
                      <td>
                        <LineAdd size={props.inputSize} />
                        <LineDelete size={props.inputSize} />
                      </td>
                    </tr>
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
            <Button variant="secondary" onClick={handleBack}>&lt; 저장 후 이전</Button>
          </Link>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button variant="secondary">미리보기</Button>
          &nbsp;&nbsp;
          <Link
            to={`/${customer_id}`}
            state={{ tgp_name: tgp_name, customer_name: customer_name }}>
            <Button variant="success" onClick={handleNext}>저장 완료</Button>
          </Link>
        </Box>
      </div>
    </div>
  );
}

export default TGPDetail3;
