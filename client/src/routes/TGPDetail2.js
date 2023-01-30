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
import BtnAddRow from '../components/BtnAddRow';
import BtnDeleteRow from '../components/BtnDeleteRow';
import SelectScore from '../components/SelectScore';
import SelectPower from "../components/SelectPower";
import SelectSign from '../components/SelectSign';
import SelectRole from '../components/SelectRole';

function TGPDetail2(props) {
  const { customer_id, tgp_id, form_id } = useParams();
  const { customer_name, tgp_name } = useLocation().state;
  const input2 = {
    title: '', role: '', role_sign: '',
    power: '', power_sign: '',
    barrier: '', barrier_sign: '',
    dynamic: '', dynamic_sign: '',
    score_sales: '', score_sales_sign: '',
    score_product: '', score_product_sign: '',
    score_service: '', score_service_sign: '',
    score_company: '', score_company_sign: '',
    score_opinion: ''
  }
  const input3 = {
    strength1: '', strength1_sign: '',
    strength2: '', strength2_sign: ''
  }
  const input4 = {
    weakness1: '', weakness1_sign: '',
    weakness2: '', weakness2_sign: ''
  }
  const [inputs1, setInputs1] = useState({});
  const [inputs2, setInputs2] = useState([input2]);
  const [inputs3, setInputs3] = useState([input3]);
  const [inputs4, setInputs4] = useState([input4]);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);
  const [loading4, setLoading4] = useState(true);
  const navigate = useNavigate();

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
      if (res.length !== 0) {
        setInputs2(res);
      }
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
      if (res.length !== 0) {
        setInputs3(res);
      }
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
      if (res.length !== 0) {
        setInputs4(res);
      }
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

  const handleAddRow2 = () => {
    setInputs2([...inputs2, input2]);
  }

  const handleAddRow3 = () => {
    setInputs3([...inputs3, input3]);
  }

  const handleAddRow4 = () => {
    setInputs4([...inputs4, input4]);
  }

  const handleDeleteRow2 = (index) => {
    const newArray = [...inputs2];
    newArray.splice(index, 1);
    setInputs2(newArray);
  }

  const handleDeleteRow3 = (index) => {
    const newArray = [...inputs3];
    newArray.splice(index, 1);
    setInputs3(newArray);
  }

  const handleDeleteRow4 = (index) => {
    const newArray = [...inputs4];
    newArray.splice(index, 1);
    setInputs4(newArray);
  }

  const handleMove = (e) => {
    if (window.confirm("저장하시겠습니까?")) {
      saveInputData();

      if (e.target.innerHTML.indexOf("다음") !== -1) {
        const url = `/${customer_id}/${tgp_id}/${form_id}/step3`;
        const state = {
          tgp_name: tgp_name,
          customer_name: customer_name,
          initStrategy: "true"
        };
        navigate(url, { state: state });
      }
    }
    else {
      if (e.target.innerHTML.indexOf("다음") !== -1) {
        const url = `/${customer_id}/${tgp_id}/${form_id}/step3`;
        const state = {
          tgp_name: tgp_name,
          customer_name: customer_name,
          initStrategy: "false"
        };
        navigate(url, { state: state });
      }
    }
  }

  const handleSave = () => {
    saveInputData();
    alert("저장되었습니다.");
  }

  const saveInputData = () => {
    const api = '/tgp/' + tgp_id + '/' + form_id + '/step2';
    const data = {
      inputs1, inputs2, inputs3, inputs4
    };
    const config = {
      headers: { 'content-type': 'application/json' }
    };
    console.log(data);
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
                        <Form.Label column={props.inputSize}>고객관점 세일즈 퍼널</Form.Label>
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
                        <Form.Label column={props.inputSize}>고객관점 경쟁 위치</Form.Label>
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
                        <Form.Label column={props.inputSize}>내가 생각하는 성공 가능성</Form.Label>
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
                    {inputs2.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td><Form.Control size={props.inputSize} type="text" name="title" value={item.title || ''} onChange={handleValueChange2(i)} /></td>
                          <td><SelectRole size={props.inputSize} name="role" value={item.role || ''} handleValueChange={handleValueChange2(i)} /></td>
                          <td><SelectSign size={props.inputSize} name="role_sign" value={item.role_sign || ''} handleValueChange={handleValueChange2(i)} /></td>
                          <td><SelectPower size={props.inputSize} name="power" value={item.power || ''} handleValueChange={handleValueChange2(i)} /></td>
                          <td><SelectSign size={props.inputSize} name="power_sign" value={item.power_sign || ''} handleValueChange={handleValueChange2(i)} /></td>
                          <td><Form.Control size={props.inputSize} type="text" name="barrier" value={item.barrier || ''} onChange={handleValueChange2(i)} /></td>
                          <td><SelectSign size={props.inputSize} name="barrier_sign" value={item.barrier_sign || ''} handleValueChange={handleValueChange2(i)} /></td>
                          <td><Form.Control size={props.inputSize} type="text" name="dynamic" value={item.dynamic || ''} onChange={handleValueChange2(i)} /></td>
                          <td><SelectSign size={props.inputSize} name="dynamic_sign" value={item.dynamic_sign || ''} handleValueChange={handleValueChange2(i)} /></td>
                          <td>
                            {i === 0 ?
                              <BtnAddRow size={props.inputSize} handleClick={handleAddRow2} />
                              :
                              <BtnDeleteRow size={props.inputSize} handleClick={() => handleDeleteRow2(i)} />
                            }
                          </td>
                        </tr>
                      )
                    })}
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
                    {inputs2.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td><Form.Control size={props.inputSize} type="text" value={item.title || ''} disabled /></td>
                          <td><Form.Control size={props.inputSize} type="text" value={item.role || ''} disabled /></td>
                          <td><SelectScore size={props.inputSize} name="score_sales" value={item.score_sales || "0"} handleValueChange={handleValueChange2(i)} /></td>
                          <td><SelectSign size={props.inputSize} name="score_sales_sign" value={item.score_sales_sign || ''} handleValueChange={handleValueChange2(i)} /></td>
                          <td><SelectScore size={props.inputSize} name="score_product" value={item.score_product || "0"} handleValueChange={handleValueChange2(i)} /></td>
                          <td><SelectSign size={props.inputSize} name="score_product_sign" value={item.score_product_sign || ''} handleValueChange={handleValueChange2(i)} /></td>
                          <td><SelectScore size={props.inputSize} name="score_service" value={item.score_service || "0"} handleValueChange={handleValueChange2(i)} /></td>
                          <td><SelectSign size={props.inputSize} name="score_service_sign" value={item.score_service_sign || ''} handleValueChange={handleValueChange2(i)} /></td>
                          <td><SelectScore size={props.inputSize} name="score_company" value={item.score_company || "0"} handleValueChange={handleValueChange2(i)} /></td>
                          <td><SelectSign size={props.inputSize} name="score_company_sign" value={item.score_company_sign || ''} handleValueChange={handleValueChange2(i)} /></td>
                          <td><Form.Control size={props.inputSize} type="text" name="score_opinion" value={item.score_opinion || ''} onChange={handleValueChange2(i)} /></td>
                        </tr>
                      )
                    })}
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
                    {inputs3.map((item, i) => {
                      return (
                        <tr key={i}>
                          <th><Form.Label column={props.inputSize}>
                            {i === 0 ? "강점과 기회" : ""}
                          </Form.Label></th>
                          <td><Form.Control size={props.inputSize} type="text" name="strength1" value={item.strength1 || ''} onChange={handleValueChange3(i)} /></td>
                          <td><SelectSign size={props.inputSize} name="strength1_sign" value={item.strength1_sign || ''} handleValueChange={handleValueChange3(i)} /></td>
                          <td><Form.Control size={props.inputSize} type="text" name="strength2" value={item.strength2 || ''} onChange={handleValueChange3(i)} /></td>
                          <td><SelectSign size={props.inputSize} name="strength2_sign" value={item.strength2_sign || ''} handleValueChange={handleValueChange3(i)} /></td>
                          <td>
                            {i === 0 ?
                              <BtnAddRow size={props.inputSize} handleClick={handleAddRow3} />
                              :
                              <BtnDeleteRow size={props.inputSize} handleClick={() => handleDeleteRow3(i)} />
                            }
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
                <Table>
                  <colgroup className="col_form2_4">
                    <col /><col /><col /><col /><col /><col />
                  </colgroup>
                  <tbody>
                    {inputs4.map((item, i) => {
                      return (
                        <tr key={i}>
                          <th><Form.Label column={props.inputSize}>
                            {i === 0 ? "약점과 위협" : ""}
                          </Form.Label></th>
                          <td><Form.Control size={props.inputSize} type="text" name="weakness1" value={item.weakness1 || ''} onChange={handleValueChange4(i)} /></td>
                          <td><SelectSign size={props.inputSize} name="weakness1_sign" value={item.weakness1_sign || ''} handleValueChange={handleValueChange4(i)} /></td>
                          <td><Form.Control size={props.inputSize} type="text" name="weakness2" value={item.weakness2 || ''} onChange={handleValueChange4(i)} /></td>
                          <td><SelectSign size={props.inputSize} name="weakness2_sign" value={item.weakness2_sign || ''} handleValueChange={handleValueChange4(i)} /></td>
                          <td>
                            {i === 0 ?
                              <BtnAddRow size={props.inputSize} handleClick={handleAddRow4} />
                              :
                              <BtnDeleteRow size={props.inputSize} handleClick={() => handleDeleteRow4(i)} />
                            }
                          </td>
                        </tr>
                      )
                    })}
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
          <Button variant="primary" onClick={handleMove}>다음 단계 &gt;</Button>
        </Box>
      </div>
    </div>
  );
}

export default TGPDetail2;
