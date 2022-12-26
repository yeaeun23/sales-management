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
  const { customer_id, tgp_id } = useParams();
  const customer_name = useLocation().state.customer_name;
  const tgp_name = useLocation().state.tgp_name;

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
      const response = await fetch('/tgp/' + tgp_id + '/step2');
      const body = await response.json();
      return body;
    }

    setInputData1().then(res => setInputs1({
      ...inputs1,
      flag: true,
      position1: (res[0] === undefined) ? "" : res[0].position1,
      position1_sign: (res[0] === undefined) ? "" : res[0].position1_sign,
      position2: (res[0] === undefined) ? "" : res[0].position2,
      position2_sign: (res[0] === undefined) ? "" : res[0].position2_sign,
      position3: (res[0] === undefined) ? "" : res[0].position3,
      position3_sign: (res[0] === undefined) ? "" : res[0].position3_sign,
      competition1_name: (res[0] === undefined) ? "" : res[0].competition1_name,
      competition1_name_sign: (res[0] === undefined) ? "" : res[0].competition1_name_sign,
      competition1_type: (res[0] === undefined) ? "" : res[0].competition1_type,
      competition1_type_sign: (res[0] === undefined) ? "" : res[0].competition1_type_sign,
      competition2_name: (res[0] === undefined) ? "" : res[0].competition2_name,
      competition2_name_sign: (res[0] === undefined) ? "" : res[0].competition2_name_sign,
      competition2_type: (res[0] === undefined) ? "" : res[0].competition2_type,
      competition2_type_sign: (res[0] === undefined) ? "" : res[0].competition2_type_sign
    })).catch(err => console.log(err));
  }, [tgp_id]);

  useEffect(() => {
    const setInputData2 = async () => {
      const response = await fetch('/tgp/' + tgp_id + '/tdm');
      const body = await response.json();
      return body;
    }

    setInputData2().then(res => setInputs2({
      ...inputs2,
      flag: true,
      title: (res[0] === undefined) ? "" : res[0].title,
      title_sign: (res[0] === undefined) ? "" : res[0].title_sign,
      power: (res[0] === undefined) ? "" : res[0].power,
      power_sign: (res[0] === undefined) ? "" : res[0].power_sign,
      barrier: (res[0] === undefined) ? "" : res[0].barrier,
      barrier_sign: (res[0] === undefined) ? "" : res[0].barrier_sign,
      dynamic: (res[0] === undefined) ? "" : res[0].dynamic,
      dynamic_sign: (res[0] === undefined) ? "" : res[0].dynamic_sign,
      score_sales: (res[0] === undefined) ? "" : res[0].score_sales,
      score_sales_sign: (res[0] === undefined) ? "" : res[0].score_sales_sign,
      score_product: (res[0] === undefined) ? "" : res[0].score_product,
      score_product_sign: (res[0] === undefined) ? "" : res[0].score_product_sign,
      score_service: (res[0] === undefined) ? "" : res[0].score_service,
      score_service_sign: (res[0] === undefined) ? "" : res[0].score_service_sign,
      score_company: (res[0] === undefined) ? "" : res[0].score_company,
      score_company_sign: (res[0] === undefined) ? "" : res[0].score_company_sign,
      score_opinion: (res[0] === undefined) ? "" : res[0].score_opinion
    })).catch(err => console.log(err));
  }, [tgp_id]);

  useEffect(() => {
    const setInputData3 = async () => {
      const response = await fetch('/tgp/' + tgp_id + '/strength');
      const body = await response.json();
      return body;
    }

    setInputData3().then(res => setInputs3({
      ...inputs3,
      flag: true,
      strength1: (res[0] === undefined) ? "" : res[0].strength1,
      strength1_sign: (res[0] === undefined) ? "" : res[0].strength1_sign,
      strength2: (res[0] === undefined) ? "" : res[0].strength2,
      strength2_sign: (res[0] === undefined) ? "" : res[0].strength2_sign
    })).catch(err => console.log(err));
  }, [tgp_id]);

  useEffect(() => {
    const setInputData4 = async () => {
      const response = await fetch('/tgp/' + tgp_id + '/weakness');
      const body = await response.json();
      return body;
    }

    setInputData4().then(res => setInputs4({
      ...inputs4,
      flag: true,
      weakness1: (res[0] === undefined) ? "" : res[0].weakness1,
      weakness1_sign: (res[0] === undefined) ? "" : res[0].weakness1_sign,
      weakness2: (res[0] === undefined) ? "" : res[0].weakness2,
      weakness2_sign: (res[0] === undefined) ? "" : res[0].weakness2_sign
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

  const handleValueChange4 = (e) => {
    const { name, value } = e.target;
    setInputs4({ ...inputs4, [name]: value });
  };

  const handleBack = () => {
    saveInputData();
  };

  const handleNext = () => {
    saveInputData();
  };

  const saveInputData = () => {
    const url = '/tgp/' + tgp_id + '/step2';

    const data = {
      // Target Goal Plan
      position1: inputs1.position1,
      position1_sign: inputs1.position1_sign,
      position2: inputs1.position2,
      position2_sign: inputs1.position2_sign,
      position3: inputs1.position3,
      position3_sign: inputs1.position3_sign,

      // 구매 영향력, 평가
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

      // 경쟁
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

    return post(url, data, config);
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
            to={"/customer/" + customer_id}
            state={{ customer_name: customer_name }}>
            {customer_name}
          </Link>&nbsp;
          <PlayArrowOutlinedIcon />&nbsp;
          {tgp_name}
        </div>

        <TGPStep step={2} />

        <div sx={{ mt: 2, mb: 1 }}>
          <Card>
            <Card.Header>Target Goal Plan</Card.Header>
            <Card.Body>
              <Table>
                <colgroup className="col_form2_1">
                  <col /><col /><col />
                </colgroup>
                {inputs1.flag ?
                  <tbody>
                    <tr>
                      <th>
                        <Form.Label column={props.inputSize}>고객관점<br />세일즈 퍼널 위치</Form.Label>
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
                      <td><SelectSign size={props.inputSize} name="position1_sign" value={inputs1.position1_sign} handleValueChange={handleValueChange1} /></td>
                    </tr>
                    <tr>
                      <th>
                        <Form.Label column={props.inputSize}>고객관점<br />경쟁대비 위치</Form.Label>
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
                      <td><SelectSign size={props.inputSize} name="position2_sign" value={inputs1.position2_sign} handleValueChange={handleValueChange1} /></td>
                    </tr>
                    <tr>
                      <th>
                        <Form.Label column={props.inputSize}>내가 생각하는<br />성공 가능성</Form.Label>
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
                      <td><SelectSign size={props.inputSize} name="position3_sign" value={inputs1.position3_sign} handleValueChange={handleValueChange1} /></td>
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
            <Card.Header>구매 영향력 (Personal과 Business를 모두 고려)</Card.Header>
            <Card.Body>
              <Table style={{ marginBottom: 0 }}>
                <colgroup className="col_form2_2">
                  <col /><col /><col /><col /><col /><col /><col /><col /><col /><col />
                </colgroup>
                {inputs2.flag ?
                  <tbody>
                    <tr>
                      <th>
                        <Form.Label column={props.inputSize}>역할</Form.Label>
                      </th>
                      <th colSpan={2} style={{ textAlign: 'center' }}>
                        <Form.Label column={props.inputSize}>이름/직함/직급</Form.Label>
                      </th>
                      <th colSpan={2} style={{ textAlign: 'center' }}>
                        <Form.Label column={props.inputSize}>파워</Form.Label>
                      </th>
                      <th colSpan={2} style={{ textAlign: 'center' }}>
                        <Form.Label column={props.inputSize}>장벽</Form.Label>
                      </th>
                      <th colSpan={2} style={{ textAlign: 'center' }}>
                        <Form.Label column={props.inputSize}>원동력</Form.Label>
                      </th>
                      <th></th>
                    </tr>
                    <tr>
                      <th><Form.Label column={props.inputSize}>TDM</Form.Label></th>
                      <td><Form.Control size={props.inputSize} type="text" name="title" value={inputs2.title} onChange={handleValueChange2} /></td>
                      <td><SelectSign size={props.inputSize} name="title_sign" value={inputs2.title_sign} handleValueChange={handleValueChange2} /></td>
                      <td><SelectPower size={props.inputSize} name="power" value={inputs2.power} handleValueChange={handleValueChange2} /></td>
                      <td><SelectSign size={props.inputSize} name="power_sign" value={inputs2.power_sign} handleValueChange={handleValueChange2} /></td>
                      <td><Form.Control size={props.inputSize} type="text" name="barrier" value={inputs2.barrier} onChange={handleValueChange2} /></td>
                      <td><SelectSign size={props.inputSize} name="barrier_sign" value={inputs2.barrier_sign} handleValueChange={handleValueChange2} /></td>
                      <td><Form.Control size={props.inputSize} type="text" name="dynamic" value={inputs2.dynamic} onChange={handleValueChange2} /></td>
                      <td><SelectSign size={props.inputSize} name="dynamic_sign" value={inputs2.dynamic_sign} handleValueChange={handleValueChange2} /></td>
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
            <Card.Header>구매 영향력 평가</Card.Header>
            <Card.Body>
              <Table style={{ marginBottom: 0 }}>
                <colgroup className="col_form2_3">
                  <col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col />
                </colgroup>
                {inputs2.flag ?
                  <tbody>
                    <tr>
                      <th>
                        <Form.Label column={props.inputSize}>역할</Form.Label>
                      </th>
                      <th style={{ textAlign: 'center' }}>
                        <Form.Label column={props.inputSize}>이름/직함/직급</Form.Label>
                      </th>
                      <th colSpan={2} style={{ textAlign: 'center' }}>
                        <Form.Label column={props.inputSize}>영업사원</Form.Label>
                      </th>
                      <th colSpan={2} style={{ textAlign: 'center' }}>
                        <Form.Label column={props.inputSize}>제품</Form.Label>
                      </th>
                      <th colSpan={2} style={{ textAlign: 'center' }}>
                        <Form.Label column={props.inputSize}>서비스</Form.Label>
                      </th>
                      <th colSpan={2} style={{ textAlign: 'center' }}>
                        <Form.Label column={props.inputSize}>우리 회사</Form.Label>
                      </th>
                      <th style={{ textAlign: 'center' }}>
                        <Form.Label column={props.inputSize}>평가 의견</Form.Label>
                      </th>
                    </tr>
                    <tr>
                      <th><Form.Label column={props.inputSize}>TDM</Form.Label></th>
                      <td><Form.Control size={props.inputSize} type="text" value={inputs2.title} disabled /></td>
                      <td><SelectScore size={props.inputSize} name="score_sales" value={inputs2.score_sales} handleValueChange={handleValueChange2} /></td>
                      <td><SelectSign size={props.inputSize} name="score_sales_sign" value={inputs2.score_sales_sign} handleValueChange={handleValueChange2} /></td>
                      <td><SelectScore size={props.inputSize} name="score_product" value={inputs2.score_product} handleValueChange={handleValueChange2} /></td>
                      <td><SelectSign size={props.inputSize} name="score_product_sign" value={inputs2.score_product_sign} handleValueChange={handleValueChange2} /></td>
                      <td><SelectScore size={props.inputSize} name="score_service" value={inputs2.score_service} handleValueChange={handleValueChange2} /></td>
                      <td><SelectSign size={props.inputSize} name="score_service_sign" value={inputs2.score_service_sign} handleValueChange={handleValueChange2} /></td>
                      <td><SelectScore size={props.inputSize} name="score_company" value={inputs2.score_company} handleValueChange={handleValueChange2} /></td>
                      <td><SelectSign size={props.inputSize} name="score_company_sign" value={inputs2.score_company_sign} handleValueChange={handleValueChange2} /></td>
                      <td><Form.Control size={props.inputSize} type="text" name="score_opinion" value={inputs2.score_opinion} onChange={handleValueChange2} /></td>
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
            <Card.Header>경쟁</Card.Header>
            {(inputs3.flag && inputs4.flag) ?
              <Card.Body>
                <Table style={{ marginBottom: 0 }}>
                  <colgroup className="col_form2_4">
                    <col /><col /><col /><col /><col /><col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th><Form.Label column={props.inputSize}>선정 고객명</Form.Label></th>
                      <td><Form.Control size={props.inputSize} type="text" name="competition1_name" value={inputs1.competition1_name} onChange={handleValueChange1} /></td>
                      <td><SelectSign size={props.inputSize} name="competition1_name_sign" value={inputs1.competition1_name_sign} handleValueChange={handleValueChange1} /></td>
                      <td><Form.Control size={props.inputSize} type="text" name="competition2_name" value={inputs1.competition2_name} onChange={handleValueChange1} /></td>
                      <td><SelectSign size={props.inputSize} name="competition2_name_sign" value={inputs1.competition2_name_sign} handleValueChange={handleValueChange1} /></td>
                      <td></td>
                    </tr>
                    <tr>
                      <th><Form.Label column={props.inputSize}>고객관점 대체안<br />(우리의 경쟁)</Form.Label></th>
                      <td><Form.Control size={props.inputSize} type="text" name="competition1_type" value={inputs1.competition1_type} onChange={handleValueChange1} /></td>
                      <td><SelectSign size={props.inputSize} name="competition1_type_sign" value={inputs1.competition1_type_sign} handleValueChange={handleValueChange1} /></td>
                      <td><Form.Control size={props.inputSize} type="text" name="competition2_type" value={inputs1.competition2_type} onChange={handleValueChange1} /></td>
                      <td><SelectSign size={props.inputSize} name="competition2_type_sign" value={inputs1.competition2_type_sign} handleValueChange={handleValueChange1} /></td>
                      <td></td>
                    </tr>
                    <tr>
                      <th><Form.Label column={props.inputSize}>강점과 기회</Form.Label></th>
                      <td><Form.Control size={props.inputSize} type="text" name="strength1" value={inputs3.strength1} onChange={handleValueChange3} /></td>
                      <td><SelectSign size={props.inputSize} name="strength1_sign" value={inputs3.strength1_sign} handleValueChange={handleValueChange3} /></td>
                      <td><Form.Control size={props.inputSize} type="text" name="strength2" value={inputs3.strength2} onChange={handleValueChange3} /></td>
                      <td><SelectSign size={props.inputSize} name="strength2_sign" value={inputs3.strength2_sign} handleValueChange={handleValueChange3} /></td>
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
                      <th><Form.Label column={props.inputSize}>약점과 위협</Form.Label></th>
                      <td><Form.Control size={props.inputSize} type="text" name="weakness1" value={inputs4.weakness1} onChange={handleValueChange4} /></td>
                      <td><SelectSign size={props.inputSize} name="weakness1_sign" value={inputs4.weakness1_sign} handleValueChange={handleValueChange4} /></td>
                      <td><Form.Control size={props.inputSize} type="text" name="weakness2" value={inputs4.weakness2} onChange={handleValueChange4} /></td>
                      <td><SelectSign size={props.inputSize} name="weakness2_sign" value={inputs4.weakness2_sign} handleValueChange={handleValueChange4} /></td>
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
            to={`/customer/${customer_id}/${tgp_id}/1`}
            state={{ tgp_name: tgp_name, customer_name: customer_name }}>
            <Button variant="secondary" onClick={handleBack}>&lt; 저장 후 이전</Button>
          </Link>
          <Box sx={{ flex: '1 1 auto' }} />
          <Link
            to={`/customer/${customer_id}/${tgp_id}/3`}
            state={{ tgp_name: tgp_name, customer_name: customer_name }}>
            <Button variant="secondary" onClick={handleNext}>저장 후 다음 &gt;</Button>
          </Link>
        </Box>
      </div>
    </div>
  );
}

export default TGPDetail2;
