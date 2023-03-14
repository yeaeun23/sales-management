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
import * as common from "../common";

function TGPDetail1(props) {
  const { customer_id, tgp_id, form_id } = useParams();
  const { customer_name, tgp_name } = useLocation().state;
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setInputData = async () => {
      const response = await fetch(common.apiPrefix+'/tgp/' + tgp_id + '/' + form_id + '/step1');
      const body = await response.json();
      return body;
    }
    setInputData().then(res => {
      setInputs(res[0]);
      setLoading(false);
    }).catch(err => console.log(err));
  }, []);

  const handleValueChange = (e) => {
    let { name, value } = e.target;
   
    // 금액이면 콤마
    if (name === "amount") {
      value = common.comma(common.uncomma(value));
    }

    setInputs({ ...inputs, [name]: value });
  }

  const handleMove = () => {
    if (window.confirm("저장하시겠습니까?")) {
      saveInputData();
    }
  }

  const handleSave = () => {
    saveInputData();
    alert("저장되었습니다.");
  }

  const saveInputData = () => {
    const api = common.apiPrefix+'/tgp/' + tgp_id + '/' + form_id + '/step1';
    const data = { inputs };
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

        <TGPStep step={1} />

        <div sx={{ mt: 2, mb: 1 }}>
          <Card>
            <Card.Header>
              Target Goal Plan
              <Button size="sm" variant="success" style={{ float: "right" }} onClick={handleSave}>중간 저장</Button>
            </Card.Header>
            <Card.Body>
              <Table>
                <colgroup className="col_form1_1">
                  <col /><col /><col /><col />
                </colgroup>
                {!loading ?
                  <tbody>
                    <tr>
                      <th><Form.Label column={props.inputSize}>거래처</Form.Label></th>
                      <td><Form.Control size={props.inputSize} type="text" name="account" value={inputs.account} disabled /></td>
                      <th><Form.Label column={props.inputSize}>부서</Form.Label></th>
                      <td><Form.Control size={props.inputSize} type="text" name="department" value={inputs.department || ''} onChange={handleValueChange} maxLength="20" /></td>
                    </tr>
                    <tr>
                      <th><Form.Label column={props.inputSize}>솔루션</Form.Label></th>
                      <td><Form.Control size={props.inputSize} type="text" name="solution" value={inputs.solution || ''} onChange={handleValueChange} maxLength="20" /></td>
                      <th><Form.Label column={props.inputSize}>금액(원)</Form.Label></th>
                      <td><Form.Control size={props.inputSize} type="text" name="amount" value={inputs.amount || ''} onChange={handleValueChange} maxLength="19" />
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
            <Button variant="secondary" onClick={handleMove}>&lt; 이전 단계</Button>
          </Link>
          <Box sx={{ flex: '1 1 auto' }} />
          <Link
            to={`/${customer_id}/${tgp_id}/${form_id}/step2`}
            state={{ tgp_name: tgp_name, customer_name: customer_name }}>
            <Button variant="primary" onClick={handleMove}>다음 단계 &gt;</Button>
          </Link>
        </Box>
      </div>
    </div>
  );
}

export default TGPDetail1;
