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
import SelectRole from '../components/SelectRole';

function TGPDetail2(props) {
  const { customer_id, tgp_id, form_id } = useParams();
  const { customer_name, tgp_name } = useLocation().state;
  const [inputs1, setInputs1] = useState({});
  const [inputs2, setInputs2] = useState([]);
  const [inputs3, setInputs3] = useState([]);
  const [inputs4, setInputs4] = useState([]);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);
  const [loading4, setLoading4] = useState(true);

  useEffect(() => {
    const setInputData1 = async () => {
      const response = await fetch('/tgp/' + tgp_id + '/' + form_id + '/step2');
      const body = await response.json();
      return body;
    }

    setInputData1().then(res => {
      setInputs1(res[0]);
      setLoading1(false);
    }).catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const setInputData2 = async () => {
      const response = await fetch('/tgp/' + form_id + '/tdm');
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
      const response = await fetch('/tgp/' + form_id + '/strength');
      const body = await response.json();
      return body;
    }

    setInputData3().then(res => {
      setInputs3(res);
      setLoading3(false);
    }).catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const setInputData4 = async () => {
      const response = await fetch('/tgp/' + form_id + '/weakness');
      const body = await response.json();
      return body;
    }

    setInputData4().then(res => {
      setInputs4(res);
      setLoading4(false);
    }).catch(err => console.log(err));
  }, []);

  const handleValueChange1 = (e) => {
    const { name, value } = e.target;
    setInputs1({ ...inputs1, [name]: value });
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

  const handleValueChange4 = (index) => (e) => {
    const newArray = inputs4.map((item, i) => {
      if (index === i) {
        return { ...item, [e.target.name]: e.target.value };
      } else {
        return item;
      }
    });
    setInputs4(newArray);
  };

  const handleMove = () => {
    if (window.confirm("저장하시겠습니까?"))
      saveInputData();
  }

  const handleSave = () => {
    saveInputData();
    alert("저장되었습니다.");
  }

  const saveInputData = () => {
    const api = '/tgp/' + tgp_id + '/' + form_id + '/step2';

    const data = {
      // TGP 현재 위치
      position1: inputs1.position1,
      position1_sign: inputs1.position1_sign,
      position2: inputs1.position2,
      position2_sign: inputs1.position2_sign,
      position3: inputs1.position3,
      position3_sign: inputs1.position3_sign,

      // 구매 영향력, 평가
      role: inputs2.role,
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

        <TGPStep step={2} />

        <div sx={{ mt: 2, mb: 1 }}>
          <Card>
            <Card.Header>
              TGP 현재 위치
              <Button size="sm" variant="success" style={{ float: "right" }} onClick={handleSave}>중간 저장</Button>
            </Card.Header>
            <Card.Body>
              <Table>
                <colgroup className="col_form2_1">
                  <col /><col /><col />
                </colgroup>
                {!loading1 ?
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
                      <td><SelectSign size={props.inputSize} name="position1_sign" value={inputs1.position1_sign || ''} handleValueChange={handleValueChange1} /></td>
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
                      <td><SelectSign size={props.inputSize} name="position2_sign" value={inputs1.position2_sign || ''} handleValueChange={handleValueChange1} /></td>
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
              구매 영향력 (Personal과 Business를 모두 고려)
              <Button size="sm" variant="success" style={{ float: "right" }} onClick={handleSave}>중간 저장</Button>
            </Card.Header>
            <Card.Body>
              <Table style={{ marginBottom: 0 }}>
                <colgroup className="col_form2_2">
                  <col /><col /><col /><col /><col /><col /><col /><col /><col /><col />
                </colgroup>
                {!loading2 ?
                  <tbody>
                    <tr>
                      <th style={{ textAlign: 'center' }}>
                        <Form.Label column={props.inputSize}>이름/직함/직급</Form.Label>
                      </th>
                      <th colSpan={2} style={{ textAlign: 'center' }}>
                        <Form.Label column={props.inputSize}>역할</Form.Label>
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
                    {
                      inputs2.map((item, i) => {
                        return (
                          <tr key={item.tdm_id}>
                            <td><Form.Control size={props.inputSize} type="text" name="title" value={item.title || ''} onChange={handleValueChange2(i)} /></td>
                            <td><SelectRole size={props.inputSize} name="role" value={item.role || ''} handleValueChange={handleValueChange2(i)} /></td>
                            <td><SelectSign size={props.inputSize} name="title_sign" value={item.title_sign || ''} handleValueChange={handleValueChange2(i)} /></td>
                            <td><SelectPower size={props.inputSize} name="power" value={item.power || ''} handleValueChange={handleValueChange2(i)} /></td>
                            <td><SelectSign size={props.inputSize} name="power_sign" value={item.power_sign || ''} handleValueChange={handleValueChange2(i)} /></td>
                            <td><Form.Control size={props.inputSize} type="text" name="barrier" value={item.barrier || ''} onChange={handleValueChange2(i)} /></td>
                            <td><SelectSign size={props.inputSize} name="barrier_sign" value={item.barrier_sign || ''} handleValueChange={handleValueChange2(i)} /></td>
                            <td><Form.Control size={props.inputSize} type="text" name="dynamic" value={item.dynamic || ''} onChange={handleValueChange2(i)} /></td>
                            <td><SelectSign size={props.inputSize} name="dynamic_sign" value={item.dynamic_sign || ''} handleValueChange={handleValueChange2(i)} /></td>
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
              구매 영향력 평가
              <Button size="sm" variant="success" style={{ float: "right" }} onClick={handleSave}>중간 저장</Button>
            </Card.Header>
            <Card.Body>
              <Table style={{ marginBottom: 0 }}>
                <colgroup className="col_form2_3">
                  <col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col />
                </colgroup>
                {!loading2 ?
                  <tbody>
                    <tr>
                      <th style={{ textAlign: 'center' }}>
                        <Form.Label column={props.inputSize}>이름/직함/직급</Form.Label>
                      </th>
                      <th style={{ textAlign: 'center' }}>
                        <Form.Label column={props.inputSize}>역할</Form.Label>
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
                    {
                      inputs2.map((item, i) => {
                        return (
                          <tr key={item.tdm_id}>
                            <td><Form.Control size={props.inputSize} type="text" value={item.title || ''} disabled /></td>
                            <td><Form.Control size={props.inputSize} type="text" value={item.role || ''} disabled /></td>
                            <td><SelectScore size={props.inputSize} name="score_sales" value={item.score_sales || ''} handleValueChange={handleValueChange2(i)} /></td>
                            <td><SelectSign size={props.inputSize} name="score_sales_sign" value={item.score_sales_sign || ''} handleValueChange={handleValueChange2(i)} /></td>
                            <td><SelectScore size={props.inputSize} name="score_product" value={item.score_product || ''} handleValueChange={handleValueChange2(i)} /></td>
                            <td><SelectSign size={props.inputSize} name="score_product_sign" value={item.score_product_sign || ''} handleValueChange={handleValueChange2(i)} /></td>
                            <td><SelectScore size={props.inputSize} name="score_service" value={item.score_service || ''} handleValueChange={handleValueChange2(i)} /></td>
                            <td><SelectSign size={props.inputSize} name="score_service_sign" value={item.score_service_sign || ''} handleValueChange={handleValueChange2(i)} /></td>
                            <td><SelectScore size={props.inputSize} name="score_company" value={item.score_company || ''} handleValueChange={handleValueChange2(i)} /></td>
                            <td><SelectSign size={props.inputSize} name="score_company_sign" value={item.score_company_sign || ''} handleValueChange={handleValueChange2(i)} /></td>
                            <td><Form.Control size={props.inputSize} type="text" name="score_opinion" value={item.score_opinion || ''} onChange={handleValueChange2(i)} /></td>
                          </tr>
                        )
                      })
                    }
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
              <Button size="sm" variant="success" style={{ float: "right" }} onClick={handleSave}>중간 저장</Button>
              경쟁
            </Card.Header>
            {(!loading3 && !loading4) ?
              <Card.Body>
                <Table style={{ marginBottom: 0 }}>
                  <colgroup className="col_form2_4">
                    <col /><col /><col /><col /><col /><col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th><Form.Label column={props.inputSize}>선정 고객명</Form.Label></th>
                      <td><Form.Control size={props.inputSize} type="text" name="competition1_name" value={inputs1.competition1_name || ''} onChange={handleValueChange1} /></td>
                      <td><SelectSign size={props.inputSize} name="competition1_name_sign" value={inputs1.competition1_name_sign || ''} handleValueChange={handleValueChange1} /></td>
                      <td><Form.Control size={props.inputSize} type="text" name="competition2_name" value={inputs1.competition2_name || ''} onChange={handleValueChange1} /></td>
                      <td><SelectSign size={props.inputSize} name="competition2_name_sign" value={inputs1.competition2_name_sign || ''} handleValueChange={handleValueChange1} /></td>
                      <td></td>
                    </tr>
                    <tr>
                      <th><Form.Label column={props.inputSize}>고객관점 대체안<br />(우리의 경쟁)</Form.Label></th>
                      <td><Form.Control size={props.inputSize} type="text" name="competition1_type" value={inputs1.competition1_type || ''} onChange={handleValueChange1} /></td>
                      <td><SelectSign size={props.inputSize} name="competition1_type_sign" value={inputs1.competition1_type_sign || ''} handleValueChange={handleValueChange1} /></td>
                      <td><Form.Control size={props.inputSize} type="text" name="competition2_type" value={inputs1.competition2_type || ''} onChange={handleValueChange1} /></td>
                      <td><SelectSign size={props.inputSize} name="competition2_type_sign" value={inputs1.competition2_type_sign || ''} handleValueChange={handleValueChange1} /></td>
                      <td></td>
                    </tr>
                    {
                      inputs3.map((item, i) => {
                        return (
                          <tr key={item.strength_id}>
                            <th><Form.Label column={props.inputSize}>
                              { i === 0 ? "강점과 기회" : "" }
                            </Form.Label></th>
                            <td><Form.Control size={props.inputSize} type="text" name="strength1" value={item.strength1 || ''} onChange={handleValueChange3(i)} /></td>
                            <td><SelectSign size={props.inputSize} name="strength1_sign" value={item.strength1_sign || ''} handleValueChange={handleValueChange3(i)} /></td>
                            <td><Form.Control size={props.inputSize} type="text" name="strength2" value={item.strength2 || ''} onChange={handleValueChange3(i)} /></td>
                            <td><SelectSign size={props.inputSize} name="strength2_sign" value={item.strength2_sign || ''} handleValueChange={handleValueChange3(i)} /></td>
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
                  <colgroup className="col_form2_4">
                    <col /><col /><col /><col /><col /><col />
                  </colgroup>
                  <tbody>
                    {
                      inputs4.map((item, i) => {
                        return (
                          <tr key={item.weakness_id}>
                            <th><Form.Label column={props.inputSize}>
                              { i === 0 ? "약점과 위협" : "" }
                            </Form.Label></th>
                            <td><Form.Control size={props.inputSize} type="text" name="weakness1" value={item.weakness1 || ''} onChange={handleValueChange4(i)} /></td>
                            <td><SelectSign size={props.inputSize} name="weakness1_sign" value={item.weakness1_sign || ''} handleValueChange={handleValueChange4(i)} /></td>
                            <td><Form.Control size={props.inputSize} type="text" name="weakness2" value={item.weakness2 || ''} onChange={handleValueChange4(i)} /></td>
                            <td><SelectSign size={props.inputSize} name="weakness2_sign" value={item.weakness2_sign || ''} handleValueChange={handleValueChange4(i)} /></td>
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
        </div>

        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Link
            to={`/${customer_id}/${tgp_id}/${form_id}/step1`}
            state={{ tgp_name: tgp_name, customer_name: customer_name }}>
            <Button variant="secondary" onClick={handleMove}>&lt; 이전 단계</Button>
          </Link>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button variant="secondary">미리보기</Button>
          &nbsp;&nbsp;
          <Link
            to={`/${customer_id}/${tgp_id}/${form_id}/step3`}
            state={{ tgp_name: tgp_name, customer_name: customer_name }}>
            <Button variant="primary" onClick={handleMove}>다음 단계 &gt;</Button>
          </Link>
        </Box>
      </div>
    </div>
  );
}

export default TGPDetail2;
