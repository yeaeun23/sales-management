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
import Form1 from '../components/Form1';
import Form2 from '../components/Form2';
import Form3 from '../components/Form3';
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

function TGPDetail() {
  const { tgp_id } = useParams();
  const inputSize = "sm";
  const navigate = useNavigate();
  const [customer, setCustomer] = useState("");
  const [department, setDepartment] = useState("");
  const [solution, setSolution] = useState("");
  const [amount, setAmount] = useState("");
  const [targetdate, setTargetdate] = useState("");
  const steps = ['Target Goal Plan', 'In The Funnel', 'Getting Action'];
  const [activeStep, setActiveStep] = React.useState(0);
  //const [skipped, setSkipped] = React.useState(new Set());

  useEffect(() => {
    callApi()
      .then(res => setCustomer(res.map((c) => {
        return c.customer
      })))
      .catch(err => console.log(err));
  }, []);

  const callApi = async () => {
    const response = await fetch('/api/tgp/' + tgp_id + '/1');
    const body = await response.json();
    console.log(body);
    return body;
  }

  const isStepOptional = (step) => {
    return step === 1;
  };

  // const isStepSkipped = (step) => {
  //   return skipped.has(step);
  // };

  const handleNext = () => {
    // let newSkipped = skipped;

    // if (isStepSkipped(activeStep)) {
    //   newSkipped = new Set(newSkipped.values());
    //   newSkipped.delete(activeStep);
    // }

    if (activeStep == 0) {
      saveForm1()
        .then((response) => {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        })
    }
    else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    // setSkipped(newSkipped);
  };

  const saveForm1 = () => {
    const url = '/api/tgp/' + tgp_id + '/1';
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
    // setDepartment(e.target.value);
    // setSolution(e.target.value);
    // setAmount(e.target.value);
    // setTargetdate(e.target.value);
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    // setActiveStep(0);
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
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption"></Typography>
              );
            }
            // if (isStepSkipped(index)) {
            //   stepProps.completed = false;
            // }
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
                {/* Step {activeStep + 1} */}
                {
                  activeStep === 0
                    ? <Card>
                    <Card.Header>Target Goal Plan</Card.Header>
                    <Card.Body>
                      <Table>
                        <colgroup className="col_form1_1">
                          <col /><col /><col /><col />
                        </colgroup>
                        <tbody>
                          <tr>
                            <th><Form.Label column={inputSize}>거래처</Form.Label></th>
                            <td><Form.Control size={inputSize} type="text" name="customer" value={customer} onChange={handleValueChange} /></td>
                            <th><Form.Label column={inputSize}>부서</Form.Label></th>
                            <td><Form.Control size={inputSize} type="text" name="department" onChange={handleValueChange} /></td>
                          </tr>
                          <tr>
                            <th><Form.Label column={inputSize}>솔루션</Form.Label></th>
                            <td><Form.Control size={inputSize} type="text" name="solution" onChange={handleValueChange} /></td>
                            <th><Form.Label column={inputSize}>금액 (원)</Form.Label></th>
                            <td><Form.Control size={inputSize} type="text" name="amount" onChange={handleValueChange} />
                            </td>
                          </tr>
                          <tr>
                            <th>
                              <Form.Label column={inputSize}>목표일</Form.Label>
                            </th>
                            <td>
                              <Form.Control size={inputSize} type="date" name="targetdate" />
                            </td>
                            <th></th>
                            <td></td>
                          </tr>
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                    : (activeStep === 1
                      ? <Form2 inputSize={inputSize} />
                      : <Form3 inputSize={inputSize} />
                    )
                }
              </div>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button variant="secondary" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                  &lt; 이전
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />

                {
                  activeStep === steps.length - 1
                    ?
                    (function () {
                      return (<Button variant="primary" onClick={handleNext}>TGP 저장</Button>);
                    })()
                    : (function () {
                      return (<Button variant="secondary" onClick={handleNext}>다음 &gt;</Button>);
                    })()
                }
              </Box>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

export default TGPDetail;
