import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../App.css';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from 'react-bootstrap/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import LineAdd from '../components/LineAdd';
import LineDelete from '../components/LineDelete';
import SelectScore from '../components/SelectScore';
import SelectPower from "../components/SelectPower";
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import { useParams } from 'react-router-dom';
import { post } from "axios";
import { Link } from "react-router-dom";
import SelectSign from '../components/SelectSign';

function TGPDetail2(props) {
  const params = useParams();
  const steps = ['Target Goal Plan', 'In The Funnel', 'Getting Action'];
  const position1_label = ["Lead", "Filtering", "Opportunity", "Closing"];
  const position2_label = ["Late Runner", "Same Line", "Consider First", "Exclusive"];
  const position3_label = ["0%", "15%", "30%", "45%", "60%", "75%", "90%"];
  const [loading1, setLoading1] = useState(0);
  const [loading2, setLoading2] = useState(0);
  const [loading3, setLoading3] = useState(0);

  const progress1 = () => {
    const completed = loading1;
    setLoading1((completed >= 100) ? 0 : completed + 1);
  }

  const progress2 = () => {
    const completed = loading2;
    setLoading2((completed >= 100) ? 0 : completed + 1);
  }

  const progress3 = () => {
    const completed = loading3;
    setLoading3((completed >= 100) ? 0 : completed + 1);
  }

  useEffect(() => {
    setInterval(progress1, 20);
    setInterval(progress2, 20);
    setInterval(progress3, 20);
  });

  const [inputs1, setInputs1] = useState({
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
    strength1: "",
    strength1_sign: "",
    strength2: "",
    strength2_sign: ""
  });

  const [inputs4, setInputs4] = useState({
    weakness1: "",
    weakness1_sign: "",
    weakness2: "",
    weakness2_sign: ""
  });

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

  useEffect(() => {
    const setInputData1 = async () => {
      const response = await fetch('/api/tgp/' + params.tgp_id + '/FORM');
      const body = await response.json();
      return body;
    }

    setInputData1()
      .then(res => setInputs1({
        ...inputs1,
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
        competition2_type_sign: res[0].competition2_type_sign,
      }))
      .catch(err => console.log(err));
  }, [params.tgp_id]);

  useEffect(() => {
    const setInputData2 = async () => {
      const response = await fetch('/api/tgp/' + params.tgp_id + '/FORM_TDM');
      const body = await response.json();
      return body;
    }

    setInputData2()
      .then(res => setInputs2({
        ...inputs2,
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
      }))
      .catch(err => console.log(err));
  }, [params.tgp_id]);

  useEffect(() => {
    const setInputData3 = async () => {
      const response = await fetch('/api/tgp/' + params.tgp_id + '/FORM_STRENGTH');
      const body = await response.json();
      return body;
    }

    setInputData3()
      .then(res => setInputs3({
        ...inputs3,
        strength1: res[0].strength1,
        strength1_sign: res[0].strength1_sign,
        strength2: res[0].strength2,
        strength2_sign: res[0].strength2_sign
      }))
      .catch(err => console.log(err));
  }, [params.tgp_id]);

  useEffect(() => {
    const setInputData4 = async () => {
      const response = await fetch('/api/tgp/' + params.tgp_id + '/FORM_WEAKNESS');
      const body = await response.json();
      return body;
    }

    setInputData4()
      .then(res => setInputs4({
        ...inputs4,
        weakness1: res[0].weakness1,
        weakness1_sign: res[0].weakness1_sign,
        weakness2: res[0].weakness2,
        weakness2_sign: res[0].weakness2_sign
      }))
      .catch(err => console.log(err));
  }, [params.tgp_id]);

  const handleBack = () => {
    saveInputData();
  };

  const handleNext = () => {
    saveInputData();
  };

  const saveInputData = () => {
    const url = '/api/tgp/' + params.tgp_id + '/STEP2';
    const formData = new FormData();

    // Target Goal Plan
    formData.append('position1', inputs1.position1);
    formData.append('position1_sign', inputs1.position1_sign);
    formData.append('position2', inputs1.position2);
    formData.append('position2_sign', inputs1.position2_sign);
    formData.append('position3', inputs1.position3);
    formData.append('position3_sign', inputs1.position3_sign);

    // 구매 영향력, 평가
    formData.append('title', inputs2.title);
    formData.append('title_sign', inputs2.title_sign);
    formData.append('power', inputs2.power);
    formData.append('power_sign', inputs2.power_sign);
    formData.append('barrier', inputs2.barrier);
    formData.append('barrier_sign', inputs2.barrier_sign);
    formData.append('dynamic', inputs2.dynamic);
    formData.append('dynamic_sign', inputs2.dynamic_sign);

    formData.append('score_sales', inputs2.score_sales);
    formData.append('score_sales_sign', inputs2.score_sales_sign);
    formData.append('score_product', inputs2.score_product);
    formData.append('score_product_sign', inputs2.score_product_sign);
    formData.append('score_service', inputs2.score_service);
    formData.append('score_service_sign', inputs2.score_service_sign);
    formData.append('score_company', inputs2.score_company);
    formData.append('score_company_sign', inputs2.score_company_sign);
    formData.append('score_opinion', inputs2.score_opinion);

    // 경쟁
    formData.append('competition1_name', inputs1.competition1_name);
    formData.append('competition1_name_sign', inputs1.competition1_name_sign);
    formData.append('competition1_type', inputs1.competition1_type);
    formData.append('competition1_type_sign', inputs1.competition1_type_sign);
    formData.append('competition2_name', inputs1.competition2_name);
    formData.append('competition2_name_sign', inputs1.competition2_name_sign);
    formData.append('competition2_type', inputs1.competition2_type);
    formData.append('competition2_type_sign', inputs1.competition2_type_sign);

    formData.append('strength1', inputs3.strength1);
    formData.append('strength1_sign', inputs3.strength1_sign);
    formData.append('strength2', inputs3.strength2);
    formData.append('strength2_sign', inputs3.strength2_sign);

    formData.append('weakness1', inputs4.weakness1);
    formData.append('weakness1_sign', inputs4.weakness1_sign);
    formData.append('weakness2', inputs4.weakness2);
    formData.append('weakness2_sign', inputs4.weakness2_sign);

    return post(url, formData);
  }

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
      <List>
        {['로그아웃', '설정'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="root">
      <AppBar position="fixed">
        <Toolbar>
          <IconButton className="menuButton" color="inherit" aria-label="Open drawer">
            {/*<MenuIcon onClick={toggleDrawer('left', true)} />*/}
            <MenuIcon />
          </IconButton>
          <Typography className="title" variant="h6" color="inherit" noWrap>
            Sales Master
          </Typography>
        </Toolbar>
      </AppBar>

      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}

      <div className="paper">
        <Stepper activeStep={1} style={{ margin: '50px' }}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <div className="form">
          <React.Fragment>
            <div sx={{ mt: 2, mb: 1 }}>
              <Card>
                <Card.Header>Target Goal Plan</Card.Header>
                <Card.Body>
                  <Table>
                    <colgroup className="col_form2_1">
                      <col /><col /><col />
                    </colgroup>
                    {inputs1.position1 !== "" ?
                      <tbody>
                        <tr>
                          <th>
                            <Form.Label column={props.inputSize}>고객관점<br />세일즈 퍼널 위치</Form.Label>
                          </th>
                          <td>
                            {position1_label.map((label) => (
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
                          <td><SelectSign size={props.inputSize} selected={inputs1.position1_sign} /></td>
                        </tr>
                        <tr>
                          <th>
                            <Form.Label column={props.inputSize}>고객관점<br />경쟁대비 위치</Form.Label>
                          </th>
                          <td>
                            {position2_label.map((label) => (
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
                          <td><SelectSign size={props.inputSize} selected={inputs1.position2_sign} /></td>
                        </tr>
                        <tr>
                          <th>
                            <Form.Label column={props.inputSize}>내가 생각하는<br />성공 가능성</Form.Label>
                          </th>
                          <td>
                            {position3_label.map((label) => (
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
                          <td><SelectSign size={props.inputSize} selected={inputs1.position3_sign} /></td>
                        </tr>
                      </tbody>
                      :
                      <tbody>
                        <tr>
                          <td colSpan="3" align="center">
                            <CircularProgress className="progress" variant="indeterminate" value={loading1} />
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
                    {inputs2.title !== "" ?
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
                          <td><Form.Control size={props.inputSize} type="text" value={inputs2.title} onChange={handleValueChange2} /></td>
                          <td><SelectSign size={props.inputSize} selected={inputs2.title_sign} /></td>
                          <td><SelectPower size={props.inputSize} selected={inputs2.power} /></td>
                          <td><SelectSign size={props.inputSize} selected={inputs2.power_sign} /></td>
                          <td><Form.Control size={props.inputSize} type="text" value={inputs2.barrier} onChange={handleValueChange2} /></td>
                          <td><SelectSign size={props.inputSize} selected={inputs2.barrier_sign} /></td>
                          <td><Form.Control size={props.inputSize} type="text" value={inputs2.dynamic} onChange={handleValueChange2} /></td>
                          <td><SelectSign size={props.inputSize} selected={inputs2.dynamic_sign} /></td>
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
                            <CircularProgress className="progress" variant="indeterminate" value={loading2} />
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
                    {inputs2.title !== "" ?
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
                          <td><SelectScore size={props.inputSize} selected={inputs2.score_sales} /></td>
                          <td><SelectSign size={props.inputSize} selected={inputs2.score_sales_sign} /></td>
                          <td><SelectScore size={props.inputSize} selected={inputs2.score_product} /></td>
                          <td><SelectSign size={props.inputSize} selected={inputs2.score_product_sign} /></td>
                          <td><SelectScore size={props.inputSize} selected={inputs2.score_service} /></td>
                          <td><SelectSign size={props.inputSize} selected={inputs2.score_service_sign} /></td>
                          <td><SelectScore size={props.inputSize} selected={inputs2.score_company} /></td>
                          <td><SelectSign size={props.inputSize} selected={inputs2.score_company_sign} /></td>
                          <td><Form.Control size={props.inputSize} type="text" value={inputs2.score_opinion} onChange={handleValueChange2} /></td>
                        </tr>
                      </tbody>
                      :
                      <tbody>
                        <tr>
                          <td colSpan="11" align="center">
                            <CircularProgress className="progress" variant="indeterminate" value={loading2} />
                          </td>
                        </tr>
                      </tbody>
                    }
                  </Table>
                </Card.Body>
              </Card>
              <Card>
                <Card.Header>경쟁</Card.Header>
                {(inputs3.strength1 !== "") && (inputs4.weakness1 !== "") ?
                  <Card.Body>
                    <Table style={{ marginBottom: 0 }}>
                      <colgroup className="col_form2_4">
                        <col /><col /><col /><col /><col /><col />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th><Form.Label column={props.inputSize}>선정 고객명</Form.Label></th>
                          <td><Form.Control size={props.inputSize} type="text" value={inputs1.competition1_name} onChange={handleValueChange1} /></td>
                          <td><SelectSign size={props.inputSize} selected={inputs1.competition1_name_sign} /></td>
                          <td><Form.Control size={props.inputSize} type="text" value={inputs1.competition2_name} onChange={handleValueChange1} /></td>
                          <td><SelectSign size={props.inputSize} selected={inputs1.competition2_name_sign} /></td>
                          <td></td>
                        </tr>
                        <tr>
                          <th><Form.Label column={props.inputSize}>고객관점 대체안<br />(우리의 경쟁)</Form.Label></th>
                          <td><Form.Control size={props.inputSize} type="text" value={inputs1.competition1_type} onChange={handleValueChange1} /></td>
                          <td><SelectSign size={props.inputSize} selected={inputs1.competition1_type_sign} /></td>
                          <td><Form.Control size={props.inputSize} type="text" value={inputs1.competition2_type} onChange={handleValueChange1} /></td>
                          <td><SelectSign size={props.inputSize} selected={inputs1.competition2_type_sign} /></td>
                          <td></td>
                        </tr>
                        <tr>
                          <th><Form.Label column={props.inputSize}>강점과 기회</Form.Label></th>
                          <td><Form.Control size={props.inputSize} type="text" value={inputs3.strength1} onChange={handleValueChange3} /></td>
                          <td><SelectSign size={props.inputSize} selected={inputs3.strength1_sign} /></td>
                          <td><Form.Control size={props.inputSize} type="text" value={inputs3.strength2} onChange={handleValueChange3} /></td>
                          <td><SelectSign size={props.inputSize} selected={inputs3.strength2_sign} /></td>
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
                          <td><Form.Control size={props.inputSize} type="text" value={inputs4.weakness1} onChange={handleValueChange4} /></td>
                          <td><SelectSign size={props.inputSize} selected={inputs4.weakness1_sign} /></td>
                          <td><Form.Control size={props.inputSize} type="text" value={inputs4.weakness2} onChange={handleValueChange4} /></td>
                          <td><SelectSign size={props.inputSize} selected={inputs4.weakness2_sign} /></td>
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
                            <CircularProgress className="progress" variant="indeterminate" value={loading3} />
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                }
              </Card>
            </div>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Link to={`/customer/${params.customer_id}/${params.tgp_id}/1`} style={{ display: 'block' }}>
                <Button variant="secondary" onClick={handleBack} sx={{ mr: 1 }}>
                  &lt; 이전
                </Button>
              </Link>
              <Box sx={{ flex: '1 1 auto' }} />
              <Link to={`/customer/${params.customer_id}/${params.tgp_id}/3`} style={{ display: 'block' }}>
                <Button variant="secondary" onClick={handleNext}>다음 &gt;</Button>
              </Link>
            </Box>
          </React.Fragment>
        </div>
      </div>
    </div>
  );
}

export default TGPDetail2;
