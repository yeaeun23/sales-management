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
import SelectScore from '../components/SelectScore';
import SelectPower from "../components/SelectPower";
import SelectSign from '../components/SelectSign';

function TGPDetail2(props) {
  const { customer_id, tgp_id, form_id } = useParams();
  const { customer_name, tgp_name } = useLocation().state;

  const [inputs1, setInputs1] = useState({
    flag: false,
    position1: "",
    position1_sign: "",
    position2: "",
    position2_sign: "",
    position3: "",
    position3_sign: "",
    competition1_name: "",
    competition1_name_sign: "",
    competition1_type: "",
    competition1_type_sign: "",
    competition2_name: "",
    competition2_name_sign: "",
    competition2_type: "",
    competition2_type_sign: "",
  });

  const [inputs2, setInputs2] = useState({
    flag: false,
    title: "",
    title_sign: "",
    power: "",
    power_sign: "",
    barrier: "",
    barrier_sign: "",
    dynamic: "",
    dynamic_sign: "",
    score_sales: "",
    score_sales_sign: "",
    score_product: "",
    score_product_sign: "",
    score_service: "",
    score_service_sign: "",
    score_company: "",
    score_company_sign: "",
    score_opinion: ""
  });

  const [inputs3, setInputs3] = useState({
    flag: false,
    strength1: "",
    strength1_sign: "",
    strength2: "",
    strength2_sign: ""
  });

  const [inputs4, setInputs4] = useState({
    flag: false,
    weakness1: "",
    weakness1_sign: "",
    weakness2: "",
    weakness2_sign: ""
  });

  useEffect(() => {
    const setInputData1 = async () => {
      const response = await fetch('/tgp/' + tgp_id + '/' + form_id + '/step2');
      const body = await response.json();
      return body;
    }

    setInputData1().then(res => setInputs1({
      flag: true,
      position1: res[0].position1,
      position1_sign: res[0].position1_sign,
      position2: res[0].position2,
      position2_sign: res[0].position2_sign,
      position3: res[0].position3,
      position3_sign: res[0].position3_sign,
      competition1_name: res[0].competition1_name,
      competition1_name_sign: res[0].competition1_name_sign,
      competition1_type: res[0].competition1_type,
      competition1_type_sign: res[0].competition1_type_sign,
      competition2_name: res[0].competition2_name,
      competition2_name_sign: res[0].competition2_name_sign,
      competition2_type: res[0].competition2_type,
      competition2_type_sign: res[0].competition2_type_sign
    })).catch(err => console.log(err));
  }, [tgp_id, form_id]);

  useEffect(() => {
    const setInputData2 = async () => {
      const response = await fetch('/tgp/' + form_id + '/tdm');
      const body = await response.json();
      return body;
    }

    setInputData2().then(res => {
      setInputs2({ flag: true });

      if (res[0] !== undefined) {
        setInputs2({
          flag: true,
          title: res[0].title,
          title_sign: res[0].title_sign,
          power: res[0].power,
          power_sign: res[0].power_sign,
          barrier: res[0].barrier,
          barrier_sign: res[0].barrier_sign,
          dynamic: res[0].dynamic,
          dynamic_sign: res[0].dynamic_sign,
          score_sales: res[0].score_sales,
          score_sales_sign: res[0].score_sales_sign,
          score_product: res[0].score_product,
          score_product_sign: res[0].score_product_sign,
          score_service: res[0].score_service,
          score_service_sign: res[0].score_service_sign,
          score_company: res[0].score_company,
          score_company_sign: res[0].score_company_sign,
          score_opinion: res[0].score_opinion
        })
      }
    }).catch(err => console.log(err));
  }, [tgp_id, form_id]);

  useEffect(() => {
    const setInputData3 = async () => {
      const response = await fetch('/tgp/' + form_id + '/strength');
      const body = await response.json();
      return body;
    }

    setInputData3().then(res => {
      setInputs3({ flag: true });

      if (res[0] !== undefined) {
        setInputs3({
          flag: true,
          strength1: res[0].strength1,
          strength1_sign: res[0].strength1_sign,
          strength2: res[0].strength2,
          strength2_sign: res[0].strength2_sign
        })
      }
    }).catch(err => console.log(err));
  }, [tgp_id, form_id]);

  useEffect(() => {
    const setInputData4 = async () => {
      const response = await fetch('/tgp/' + form_id + '/weakness');
      const body = await response.json();
      return body;
    }

    setInputData4().then(res => {
      setInputs4({ flag: true });

      if (res[0] !== undefined) {
        setInputs4({
          flag: true,
          weakness1: res[0].weakness1,
          weakness1_sign: res[0].weakness1_sign,
          weakness2: res[0].weakness2,
          weakness2_sign: res[0].weakness2_sign
        })
      }
    }).catch(err => console.log(err));
  }, [tgp_id, form_id]);

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

  const handleValueChange4 = (e) => {
    const { name, value } = e.target;
    setInputs4({ ...inputs4, [name]: value });
  };

  const handleMove = () => {
    if (window.confirm("?????????????????????????"))
      saveInputData();
  }

  const handleSave = () => {
    saveInputData();
    alert("?????????????????????.");      
  }

  const saveInputData = () => {
    const api = '/tgp/' + tgp_id + '/' + form_id + '/step2';

    const data = {
      // Target Goal Plan
      position1: inputs1.position1,
      position1_sign: inputs1.position1_sign,
      position2: inputs1.position2,
      position2_sign: inputs1.position2_sign,
      position3: inputs1.position3,
      position3_sign: inputs1.position3_sign,

      // ?????? ?????????, ??????
      title: inputs2.title,
      title_sign: inputs2.title_sign,
      power: inputs2.power,
      power_sign: inputs2.power_sign,
      barrier: inputs2.barrier,
      barrier_sign: inputs2.barrier_sign,
      dynamic: inputs2.dynamic,
      dynamic_sign: inputs2.dynamic_sign,

      score_sales: inputs2.score_sales,
      score_sales_sign: inputs2.score_sales_sign,
      score_product: inputs2.score_product,
      score_product_sign: inputs2.score_product_sign,
      score_service: inputs2.score_service,
      score_service_sign: inputs2.score_service_sign,
      score_company: inputs2.score_company,
      score_company_sign: inputs2.score_company_sign,
      score_opinion: inputs2.score_opinion,

      // ??????
      competition1_name: inputs1.competition1_name,
      competition1_name_sign: inputs1.competition1_name_sign,
      competition1_type: inputs1.competition1_type,
      competition1_type_sign: inputs1.competition1_type_sign,
      competition2_name: inputs1.competition2_name,
      competition2_name_sign: inputs1.competition2_name_sign,
      competition2_type: inputs1.competition2_type,
      competition2_type_sign: inputs1.competition2_type_sign,

      strength1: inputs3.strength1,
      strength1_sign: inputs3.strength1_sign,
      strength2: inputs3.strength2,
      strength2_sign: inputs3.strength2_sign,

      weakness1: inputs4.weakness1,
      weakness1_sign: inputs4.weakness1_sign,
      weakness2: inputs4.weakness2,
      weakness2_sign: inputs4.weakness2_sign
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
              ?????????
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

        <TGPStep step={2} />

        <div sx={{ mt: 2, mb: 1 }}>
          <Card>
            <Card.Header>
              Target Goal Plan
              <Button size="sm" variant="success" style={{float: "right"}} onClick={handleSave}>?????? ??????</Button>
            </Card.Header>
            <Card.Body>
              <Table>
                <colgroup className="col_form2_1">
                  <col /><col /><col />
                </colgroup>
                {inputs1.flag ?
                  <tbody>
                    <tr>
                      <th>
                        <Form.Label column={props.inputSize}>????????????<br />????????? ?????? ??????</Form.Label>
                      </th>
                      <td>
                        {["Lead", "Filtering", "Opportunity", "Closing"].map((label) => (
                          <Form.Check
                            inline
                            type="radio"
                            name="position1"
                            id={label}
                            key={label}
                            value={label}
                            label={label}
                            onChange={handleValueChange1}
                            checked={inputs1.position1 === label} />))
                        }
                      </td>
                      <td><SelectSign size={props.inputSize} name="position1_sign" value={inputs1.position1_sign || ''} handleValueChange={handleValueChange1} /></td>
                    </tr>
                    <tr>
                      <th>
                        <Form.Label column={props.inputSize}>????????????<br />???????????? ??????</Form.Label>
                      </th>
                      <td>
                        {["Late Runner", "Same Line", "Consider First", "Exclusive"].map((label) => (
                          <Form.Check
                            inline
                            type="radio"
                            name="position2"
                            id={label}
                            key={label}
                            value={label}
                            label={label}
                            onChange={handleValueChange1}
                            checked={inputs1.position2 === label} />))
                        }
                      </td>
                      <td><SelectSign size={props.inputSize} name="position2_sign" value={inputs1.position2_sign || ''} handleValueChange={handleValueChange1} /></td>
                    </tr>
                    <tr>
                      <th>
                        <Form.Label column={props.inputSize}>?????? ????????????<br />?????? ?????????</Form.Label>
                      </th>
                      <td>
                        {["0%", "15%", "30%", "45%", "60%", "75%", "90%"].map((label) => (
                          <Form.Check
                            inline
                            type="radio"
                            name="position3"
                            id={label}
                            key={label}
                            value={label}
                            label={label}
                            title={label}
                            onChange={handleValueChange1}
                            checked={inputs1.position3 === label} />))
                        }
                      </td>
                      <td><SelectSign size={props.inputSize} name="position3_sign" value={inputs1.position3_sign || ''} handleValueChange={handleValueChange1} /></td>
                    </tr>
                  </tbody>
                  :
                  <tbody>
                    <tr>
                      <td colSpan="3" align="center">
                        <CircularProgress className="progress" variant="indeterminate" />
                      </td>
                    </tr>
                  </tbody>
                }
              </Table>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>
              ?????? ????????? (Personal??? Business??? ?????? ??????)
              <Button size="sm" variant="success" style={{float: "right"}} onClick={handleSave}>?????? ??????</Button>
            </Card.Header>
            <Card.Body>
              <Table style={{ marginBottom: 0 }}>
                <colgroup className="col_form2_2">
                  <col /><col /><col /><col /><col /><col /><col /><col /><col /><col />
                </colgroup>
                {inputs2.flag ?
                  <tbody>
                    <tr>
                      <th>
                        <Form.Label column={props.inputSize}>??????</Form.Label>
                      </th>
                      <th colSpan={2} style={{ textAlign: 'center' }}>
                        <Form.Label column={props.inputSize}>??????/??????/??????</Form.Label>
                      </th>
                      <th colSpan={2} style={{ textAlign: 'center' }}>
                        <Form.Label column={props.inputSize}>??????</Form.Label>
                      </th>
                      <th colSpan={2} style={{ textAlign: 'center' }}>
                        <Form.Label column={props.inputSize}>??????</Form.Label>
                      </th>
                      <th colSpan={2} style={{ textAlign: 'center' }}>
                        <Form.Label column={props.inputSize}>?????????</Form.Label>
                      </th>
                      <th></th>
                    </tr>
                    <tr>
                      <th><Form.Label column={props.inputSize}>TDM</Form.Label></th>
                      <td><Form.Control size={props.inputSize} type="text" name="title" value={inputs2.title || ''} onChange={handleValueChange2} /></td>
                      <td><SelectSign size={props.inputSize} name="title_sign" value={inputs2.title_sign || ''} handleValueChange={handleValueChange2} /></td>
                      <td><SelectPower size={props.inputSize} name="power" value={inputs2.power || ''} handleValueChange={handleValueChange2} /></td>
                      <td><SelectSign size={props.inputSize} name="power_sign" value={inputs2.power_sign || ''} handleValueChange={handleValueChange2} /></td>
                      <td><Form.Control size={props.inputSize} type="text" name="barrier" value={inputs2.barrier || ''} onChange={handleValueChange2} /></td>
                      <td><SelectSign size={props.inputSize} name="barrier_sign" value={inputs2.barrier_sign || ''} handleValueChange={handleValueChange2} /></td>
                      <td><Form.Control size={props.inputSize} type="text" name="dynamic" value={inputs2.dynamic || ''} onChange={handleValueChange2} /></td>
                      <td><SelectSign size={props.inputSize} name="dynamic_sign" value={inputs2.dynamic_sign || ''} handleValueChange={handleValueChange2} /></td>
                      <td>
                        <LineAdd size={props.inputSize} />
                        <LineDelete size={props.inputSize} />
                      </td>
                    </tr>
                  </tbody>
                  :
                  <tbody>
                    <tr>
                      <td colSpan="10" align="center">
                        <CircularProgress className="progress" variant="indeterminate" />
                      </td>
                    </tr>
                  </tbody>
                }
              </Table>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>
              ?????? ????????? ??????
              <Button size="sm" variant="success" style={{float: "right"}} onClick={handleSave}>?????? ??????</Button>
            </Card.Header>
            <Card.Body>
              <Table style={{ marginBottom: 0 }}>
                <colgroup className="col_form2_3">
                  <col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col />
                </colgroup>
                {inputs2.flag ?
                  <tbody>
                    <tr>
                      <th>
                        <Form.Label column={props.inputSize}>??????</Form.Label>
                      </th>
                      <th style={{ textAlign: 'center' }}>
                        <Form.Label column={props.inputSize}>??????/??????/??????</Form.Label>
                      </th>
                      <th colSpan={2} style={{ textAlign: 'center' }}>
                        <Form.Label column={props.inputSize}>????????????</Form.Label>
                      </th>
                      <th colSpan={2} style={{ textAlign: 'center' }}>
                        <Form.Label column={props.inputSize}>??????</Form.Label>
                      </th>
                      <th colSpan={2} style={{ textAlign: 'center' }}>
                        <Form.Label column={props.inputSize}>?????????</Form.Label>
                      </th>
                      <th colSpan={2} style={{ textAlign: 'center' }}>
                        <Form.Label column={props.inputSize}>?????? ??????</Form.Label>
                      </th>
                      <th style={{ textAlign: 'center' }}>
                        <Form.Label column={props.inputSize}>?????? ??????</Form.Label>
                      </th>
                    </tr>
                    <tr>
                      <th><Form.Label column={props.inputSize}>TDM</Form.Label></th>
                      <td><Form.Control size={props.inputSize} type="text" value={inputs2.title || ''} disabled /></td>
                      <td><SelectScore size={props.inputSize} name="score_sales" value={inputs2.score_sales || ''} handleValueChange={handleValueChange2} /></td>
                      <td><SelectSign size={props.inputSize} name="score_sales_sign" value={inputs2.score_sales_sign || ''} handleValueChange={handleValueChange2} /></td>
                      <td><SelectScore size={props.inputSize} name="score_product" value={inputs2.score_product || ''} handleValueChange={handleValueChange2} /></td>
                      <td><SelectSign size={props.inputSize} name="score_product_sign" value={inputs2.score_product_sign || ''} handleValueChange={handleValueChange2} /></td>
                      <td><SelectScore size={props.inputSize} name="score_service" value={inputs2.score_service || ''} handleValueChange={handleValueChange2} /></td>
                      <td><SelectSign size={props.inputSize} name="score_service_sign" value={inputs2.score_service_sign || ''} handleValueChange={handleValueChange2} /></td>
                      <td><SelectScore size={props.inputSize} name="score_company" value={inputs2.score_company || ''} handleValueChange={handleValueChange2} /></td>
                      <td><SelectSign size={props.inputSize} name="score_company_sign" value={inputs2.score_company_sign || ''} handleValueChange={handleValueChange2} /></td>
                      <td><Form.Control size={props.inputSize} type="text" name="score_opinion" value={inputs2.score_opinion || ''} onChange={handleValueChange2} /></td>
                    </tr>
                  </tbody>
                  :
                  <tbody>
                    <tr>
                      <td colSpan="11" align="center">
                        <CircularProgress className="progress" variant="indeterminate" />
                      </td>
                    </tr>
                  </tbody>
                }
              </Table>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>
            <Button size="sm" variant="success" style={{float: "right"}} onClick={handleSave}>?????? ??????</Button>
              ??????
            </Card.Header>
            {(inputs3.flag && inputs4.flag) ?
              <Card.Body>
                <Table style={{ marginBottom: 0 }}>
                  <colgroup className="col_form2_4">
                    <col /><col /><col /><col /><col /><col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th><Form.Label column={props.inputSize}>?????? ?????????</Form.Label></th>
                      <td><Form.Control size={props.inputSize} type="text" name="competition1_name" value={inputs1.competition1_name || ''} onChange={handleValueChange1} /></td>
                      <td><SelectSign size={props.inputSize} name="competition1_name_sign" value={inputs1.competition1_name_sign || ''} handleValueChange={handleValueChange1} /></td>
                      <td><Form.Control size={props.inputSize} type="text" name="competition2_name" value={inputs1.competition2_name || ''} onChange={handleValueChange1} /></td>
                      <td><SelectSign size={props.inputSize} name="competition2_name_sign" value={inputs1.competition2_name_sign || ''} handleValueChange={handleValueChange1} /></td>
                      <td></td>
                    </tr>
                    <tr>
                      <th><Form.Label column={props.inputSize}>???????????? ?????????<br />(????????? ??????)</Form.Label></th>
                      <td><Form.Control size={props.inputSize} type="text" name="competition1_type" value={inputs1.competition1_type || ''} onChange={handleValueChange1} /></td>
                      <td><SelectSign size={props.inputSize} name="competition1_type_sign" value={inputs1.competition1_type_sign || ''} handleValueChange={handleValueChange1} /></td>
                      <td><Form.Control size={props.inputSize} type="text" name="competition2_type" value={inputs1.competition2_type || ''} onChange={handleValueChange1} /></td>
                      <td><SelectSign size={props.inputSize} name="competition2_type_sign" value={inputs1.competition2_type_sign || ''} handleValueChange={handleValueChange1} /></td>
                      <td></td>
                    </tr>
                    <tr>
                      <th><Form.Label column={props.inputSize}>????????? ??????</Form.Label></th>
                      <td><Form.Control size={props.inputSize} type="text" name="strength1" value={inputs3.strength1 || ''} onChange={handleValueChange3} /></td>
                      <td><SelectSign size={props.inputSize} name="strength1_sign" value={inputs3.strength1_sign || ''} handleValueChange={handleValueChange3} /></td>
                      <td><Form.Control size={props.inputSize} type="text" name="strength2" value={inputs3.strength2 || ''} onChange={handleValueChange3} /></td>
                      <td><SelectSign size={props.inputSize} name="strength2_sign" value={inputs3.strength2_sign || ''} handleValueChange={handleValueChange3} /></td>
                      <td>
                        <LineAdd size={props.inputSize} />
                        <LineDelete size={props.inputSize} />
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <Table>
                  <colgroup className="col_form2_4">
                    <col /><col /><col /><col /><col /><col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th><Form.Label column={props.inputSize}>????????? ??????</Form.Label></th>
                      <td><Form.Control size={props.inputSize} type="text" name="weakness1" value={inputs4.weakness1 || ''} onChange={handleValueChange4} /></td>
                      <td><SelectSign size={props.inputSize} name="weakness1_sign" value={inputs4.weakness1_sign || ''} handleValueChange={handleValueChange4} /></td>
                      <td><Form.Control size={props.inputSize} type="text" name="weakness2" value={inputs4.weakness2 || ''} onChange={handleValueChange4} /></td>
                      <td><SelectSign size={props.inputSize} name="weakness2_sign" value={inputs4.weakness2_sign || ''} handleValueChange={handleValueChange4} /></td>
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
        </div>

        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Link
            to={`/${customer_id}/${tgp_id}/${form_id}/step1`}
            state={{ tgp_name: tgp_name, customer_name: customer_name }}>
            <Button variant="secondary" onClick={handleMove}>&lt; ?????? ??????</Button>
          </Link>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button variant="secondary">????????????</Button>
          &nbsp;&nbsp;
          <Link
            to={`/${customer_id}/${tgp_id}/${form_id}/step3`}
            state={{ tgp_name: tgp_name, customer_name: customer_name }}>
            <Button variant="primary" onClick={handleMove}>?????? ?????? &gt;</Button>
          </Link>
        </Box>
      </div>
    </div>
  );
}

export default TGPDetail2;
