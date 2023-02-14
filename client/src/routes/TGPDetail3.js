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

function TGPDetail3(props) {
  const { customer_id, tgp_id, form_id } = useParams();
  const { customer_name, tgp_name, initStrategy } = useLocation().state;
  const [inputs1, setInputs1] = useState([{}]);
  const [inputs2, setInputs2] = useState([{}]);
  const [inputs3, setInputs3] = useState([{}]);
  const [inputs4, setInputs4] = useState({});
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);
  const [loading4, setLoading4] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const setInputData1 = async () => {
      const response = await fetch('/tgp/' + tgp_id + '/' + form_id + '/strategy1/' + initStrategy);
      const body = await response.json();
      return body;
    }
    const setInputData2 = async () => {
      const response = await fetch('/tgp/' + form_id + '/strategy2');
      const body = await response.json();
      return body;
    }
    setInputData1().then(res => {
      if (res.length !== 0) {
        setInputs1(res);
      }
      setLoading1(false);
    }).then(() => {
      setInputData2().then(res => {
        if (res.length !== 0) {
          setInputs2(res);
        }
        setLoading2(false);
      })
    }).catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const setInputData3 = async () => {
      const response = await fetch('/tgp/' + form_id + '/action');
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
      const response = await fetch('/tgp/' + tgp_id + '/' + form_id + '/step3');
      const body = await response.json();
      return body;
    }
    setInputData4().then(res => {
      setInputs4(res[0]);
      setLoading4(false);
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

  const handleValueChange4 = (e) => {
    const { name, value } = e.target;
    setInputs4({ ...inputs4, [name]: value });
  }

  const handleAddRow1 = () => {
    setInputs1([...inputs1, {}]);
  }

  const handleAddRow2 = () => {
    setInputs2([...inputs2, {}]);
  }

  const handleAddRow3 = () => {
    setInputs3([...inputs3, {}]);
  }

  const handleDeleteRow1 = (index) => {
    const newArray = [...inputs1];
    newArray.splice(index, 1);
    setInputs1(newArray);
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

  const handleMove = (e) => {
    if (e.target.innerHTML === "작성 완료") {
      if (window.confirm("작성 완료하시겠습니까?")) {
        saveInputData("1");

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
        saveInputData("0");
    }

    return;
  }

  const handleSave = () => {
    saveInputData("0");
    alert("저장되었습니다.");
  }

  const saveInputData = (setComplete) => {
    const api = '/tgp/' + tgp_id + '/' + form_id + '/step3/' + setComplete;
    const data = {
      inputs1, inputs2, inputs3, inputs4
    };
    const config = {
      headers: { 'content-type': 'application/json' }
    };
    return post(api, data, config);
  }

  const handlePreview = () => {
    const url = `/${customer_id}/${tgp_id}/${form_id}/preview`;
    window.open(url, "_blank", "width=1365,height=800");
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
            {(!loading1 && !loading2 && !loading4) ?
              <Card.Body>
                <Table>
                  <colgroup className="col_form3_1">
                    <col /><col /><col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>
                        <Form.Label column={props.inputSize}>No</Form.Label>
                      </th>
                      <th>
                        <Form.Label column={props.inputSize}>강점/기회 요인 (Blue Sign)</Form.Label>
                      </th>
                      <th></th>
                      <th>
                        <Form.Label column={props.inputSize}>강점/기회를 강화하거나 활용할 수 있는 방안</Form.Label>
                      </th>
                    </tr>
                    {inputs1.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td style={{ textAlign: "center" }}>{i + 1}.</td>
                          <td>
                            <Form.Control size={props.inputSize} type="text" name="strength" value={item.strength || ''} onChange={handleValueChange1(i)} maxLength="100" placeholder="100자 이내" disabled={item.auto_complete === 1 ? "disabled" : ""} />
                          </td>
                          <td>
                            {i === 0 ?
                              <BtnAddRow size={props.inputSize} handleClick={handleAddRow1} />
                              :
                              <BtnDeleteRow size={props.inputSize} handleClick={() => handleDeleteRow1(i)} auto={item.auto_complete} />
                            }
                          </td>
                          {i === 0 ?
                            <td rowSpan={inputs1.length} className="behavior">
                              <textarea className="form-control form-control-sm" name="strategy1_behavior" value={inputs4.strategy1_behavior || ''} onChange={handleValueChange4} maxLength="250" placeholder="250자 이내" />
                            </td>
                            : ""
                          }
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
                <Table>
                  <colgroup className="col_form3_1">
                    <col /><col /><col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>
                        <Form.Label column={props.inputSize}>No</Form.Label>
                      </th>
                      <th>
                        <Form.Label column={props.inputSize}>약점/위협 요인 (Red/Gray Sign)</Form.Label>
                      </th>
                      <th></th>
                      <th>
                        <Form.Label column={props.inputSize}>약점/위협을 최소화하거나 제거할 수 있는 방안</Form.Label>
                      </th>
                    </tr>
                    {inputs2.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td style={{ textAlign: "center" }}>{i + 1}.</td>
                          <td>
                            <Form.Control size={props.inputSize} type="text" name="weakness" value={item.weakness || ''} onChange={handleValueChange2(i)} maxLength="100" placeholder="100자 이내" disabled={item.auto_complete === 1 ? "disabled" : ""} />
                          </td>
                          <td>
                            {i === 0 ?
                              <BtnAddRow size={props.inputSize} handleClick={handleAddRow2} />
                              :
                              <BtnDeleteRow size={props.inputSize} handleClick={() => handleDeleteRow2(i)} auto={item.auto_complete} />
                            }
                          </td>
                          {i === 0 ?
                            <td rowSpan={inputs2.length} className="behavior">
                              <textarea className="form-control form-control-sm" name="strategy2_behavior" value={inputs4.strategy2_behavior || ''} onChange={handleValueChange4} maxLength="250" placeholder="250자 이내" />
                            </td>
                            : ""
                          }
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
                    {inputs3.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            <Form.Control size={props.inputSize} type="text" name="action" value={item.action || ''} onChange={handleValueChange3(i)} maxLength="100" placeholder="100자 이내" />
                          </td>
                          <td>
                            <Form.Control size={props.inputSize} type="date" name="date" value={item.date || ''} onChange={handleValueChange3(i)} max="2999-12-31" />
                          </td>
                          <td>
                            <Form.Control size={props.inputSize} type="text" name="owner" value={item.owner || ''} onChange={handleValueChange3(i)} maxLength="20" />
                          </td>
                          <td>
                            <Form.Control size={props.inputSize} type="text" name="collaborator" value={item.collaborator || ''} onChange={handleValueChange3(i)} maxLength="20" />
                          </td>
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
          <Button variant="secondary" onClick={handlePreview}>미리보기</Button>
          &nbsp;&nbsp;
          <Button variant="primary" onClick={handleMove}>작성 완료</Button>
        </Box>
      </div>
    </div>
  );
}

export default TGPDetail3;
