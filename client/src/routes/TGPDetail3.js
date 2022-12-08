import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Typography from '@material-ui/core/Typography';
import '../App.css';
import Navi from "../components/Navi";
import TGPStep from "../components/TGPStep";
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import LineAdd from '../components/LineAdd';
import LineDelete from '../components/LineDelete';
import Box from '@mui/material/Box';
import Button from 'react-bootstrap/Button';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { post } from "axios";

function TGPDetail3(props) {
  const id = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState("");
  const [department, setDepartment] = useState("");
  const [solution, setSolution] = useState("");
  const [amount, setAmount] = useState("");
  const [targetdate, setTargetdate] = useState("");
  const steps = ['Target Goal Plan', 'In The Funnel', 'Getting Action'];
  const [activeStep, setActiveStep] = React.useState(2);

  useEffect(() => {
    // callApi()
    //   .then(res => setCustomer(res.map((c) => {
    //     return c.customer
    //   })))
    //   .catch(err => console.log(err));
  }, []);

  // const callApi = async () => {
  //   const response = await fetch('/api/tgp/' + id.tgp_id + '/1');
  //   const body = await response.json();
  //   console.log(body);
  //   return body;
  // }

  const handleNext = () => {
    if (activeStep == 0) {
      saveForm1()
        .then((response) => {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        })
    }
    else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const saveForm1 = () => {
    const url = '/api/tgp/' + id.tgp_id + '/1';
    const formData = new FormData();
    formData.append('customer', customer);
    formData.append('department', department);
    formData.append('solution', solution);
    formData.append('amount', amount);
    formData.append('targetdate', targetdate);

    const config = { // 파일 포함 시
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    return post(url, formData, config);
  }

  const handleValueChange = (e) => {
    setCustomer(e.target.value);
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    navigate(`/`);
  };

  return (
    <div className="root">
      <Navi />
      
      <div className="paper">
      <TGPStep step={2} />

        <div className="form">
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                <Card>
                  <Card.Header>
                    TGP 저장
                  </Card.Header>
                  <Card.Body>
                    TGP 저장이 완료되었습니다.
                  </Card.Body>
                </Card>
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>미리보기</Button>
                &nbsp;&nbsp;
                <Button onClick={handleReset}>목록으로</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div sx={{ mt: 2, mb: 1 }}>
                  <Card>
                  <Card.Header>전략 분석</Card.Header>
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
                            <Form.Control size={props.inputSize} type="text" />
                          </td>
                          <td>
                            <Form.Control size={props.inputSize} type="text" />
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
                            <Form.Control size={props.inputSize} type="text" />
                          </td>
                          <td>
                            <Form.Control size={props.inputSize} type="text" />
                          </td>
                          <td>
                            <LineAdd size={props.inputSize} />
                            <LineDelete size={props.inputSize} />
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
          
                <Card>
                  <Card.Header>Action Plan (중요하고 시급한 액션)</Card.Header>
                  <Card.Body>
                    <Table id="TBActionPlan">
                      <colgroup className="col_form3_2">
                        <col /><col /><col /><col />
                      </colgroup>
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
                            <Form.Control size={props.inputSize} type="text" />
                          </td>
                          <td>
                            <Form.Control size={props.inputSize} type="date" />
                          </td>
                          <td>
                            <Form.Control size={props.inputSize} type="text" />
                          </td>
                          <td>
                            <Form.Control size={props.inputSize} type="text" />
                          </td>
                          <td>
                            <LineAdd size={props.inputSize} />
                            <LineDelete size={props.inputSize} />
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </div>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button variant="secondary" onClick={handleBack} sx={{ mr: 1 }}>
                  &lt; 이전
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Link to={`/customer/${id.customer_id}/${id.tgp_id}/2`} style={{ display: 'block' }}>
                <Button variant="primary" onClick={handleNext}>전체 보기</Button>
              </Link>
              </Box>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

export default TGPDetail3;
