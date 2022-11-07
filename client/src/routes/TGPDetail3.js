import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import '../App.css';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import LineAdd from '../components/LineAdd';
import LineDelete from '../components/LineDelete';
import SelectSign from '../components/SelectSign';
import SelectScore from '../components/SelectScore';
import SelectPower from "../components/SelectPower";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import { useParams } from 'react-router-dom';
import { post } from "axios";
import { Link } from "react-router-dom";

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
      onKeyDown={toggleDrawer(anchor, false)}
    >
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
        <Stepper activeStep={activeStep} style={{ margin: '50px' }}>
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
