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
import { useParams, useLocation, Link } from "react-router-dom";

function TGPDetail1(props) {
  const { customer_id, tgp_id, form_id } = useParams();
  //const customer_name = useLocation().state.customer_name;
  //const tgp_name = useLocation().state.tgp_name;
  const customer_name = "임시";
  const tgp_name = "";

  const [inputs, setInputs] = useState({
    account: "",
    department: "",
    solution: "",
    amount: "",
    closingdate: ""
  });

  useEffect(() => {
    const setInputData = async () => {
      const response = await fetch('/tgp/' + tgp_id + '/' + form_id + '/step1');
      const body = await response.json();
      return body;
    }

    setInputData().then(res => setInputs({
      ...inputs,
      account: customer_name,
      department: res[0].department,
      solution: res[0].solution,
      amount: res[0].amount,
      closingdate: res[0].closingdate
    })).catch(err => console.log(err));
  }, [tgp_id]);

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  }

  const handleNext = () => {
    saveInputData();
  }

  const saveInputData = () => {
    const api = '/tgp/' + tgp_id + '/' + form_id + '/step1';

    const data = {
			account: inputs.account,
			department: inputs.department,
			solution: inputs.solution,
			amount: inputs.amount,
			closingdate: inputs.closingdate
		};

    const config = {
      headers: { 'content-type': 'application/json' }
    };

    return post(api, data, config);
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

        <TGPStep step={1} />

        <div sx={{ mt: 2, mb: 1 }}>
          <Card>
            <Card.Header>Target Goal Plan</Card.Header>
            <Card.Body>
              <Table>
                <colgroup className="col_form1_1">
                  <col /><col /><col /><col />
                </colgroup>
                {inputs.account !== "" ?
                  <tbody>
                    <tr>
                      <th><Form.Label column={props.inputSize}>거래처</Form.Label></th>
                      <td><Form.Control size={props.inputSize} type="text" name="account" value={inputs.account || ''} readOnly /></td>
                      <th><Form.Label column={props.inputSize}>부서</Form.Label></th>
                      <td><Form.Control size={props.inputSize} type="text" name="department" value={inputs.department || ''} onChange={handleValueChange} /></td>
                    </tr>
                    <tr>
                      <th><Form.Label column={props.inputSize}>솔루션</Form.Label></th>
                      <td><Form.Control size={props.inputSize} type="text" name="solution" value={inputs.solution || ''} onChange={handleValueChange} /></td>
                      <th><Form.Label column={props.inputSize}>금액 (원)</Form.Label></th>
                      <td><Form.Control size={props.inputSize} type="text" name="amount" value={inputs.amount || ''} onChange={handleValueChange} />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <Form.Label column={props.inputSize}>목표일</Form.Label>
                      </th>
                      <td>
                        <Form.Control size={props.inputSize} type="date" name="closingdate" value={inputs.closingdate || ''} onChange={handleValueChange} max="2999-12-31" />
                      </td>
                      <th></th>
                      <td></td>
                    </tr>
                  </tbody>
                  :
                  <tbody>
                    <tr>
                      <td colSpan="4" align="center">
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
            to={`/${customer_id}/${tgp_id}`}
            state={{ tgp_name: tgp_name, customer_name: customer_name }}>
            <Button variant="secondary">&lt; 이전</Button>
          </Link>
          <Box sx={{ flex: '1 1 auto' }} />
          <Link
            to={`/${customer_id}/${tgp_id}/${form_id}/step2`}
            state={{ tgp_name: tgp_name, customer_name: customer_name }}>
            <Button variant="secondary" onClick={handleNext}>저장 후 다음 &gt;</Button>
          </Link>
        </Box>
      </div>
    </div>
  );
}

export default TGPDetail1;