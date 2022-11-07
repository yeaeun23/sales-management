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

function TGPDetail(props) {
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

  const handleNext = () => {
    
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
  }

  const handleBack = () => {
    //setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    //navigate(`/`);
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
          <React.Fragment>
            <div sx={{ mt: 2, mb: 1 }}>
              <Card>
                <Card.Header>TGP 현재 위치</Card.Header>
                <Card.Body>
                  <Table>
                    <colgroup className="col_form2_1">
                      <col /><col /><col />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>
                          <Form.Label column={props.inputSize}>고객관점<br />세일즈 퍼널 위치</Form.Label>
                        </th>
                        <td>
                          <Form.Check inline label="Lead" name="sales_funnel" type="radio" id="sales_funnel1" />
                          <Form.Check inline label="Filtering" name="sales_funnel" type="radio" id="sales_funnel2" />
                          <Form.Check inline label="Opportunity" name="sales_funnel" type="radio" id="sales_funnel3" />
                          <Form.Check inline label="Closing" name="sales_funnel" type="radio" id="sales_funnel4" />
                        </td>
                        <td><SelectSign size={props.inputSize} /></td>
                      </tr>
                      <tr>
                        <th>
                          <Form.Label column={props.inputSize}>고객관점<br />경쟁대비 위치</Form.Label>
                        </th>
                        <td>
                          <Form.Check inline label="희박함" name="competition" type="radio" id="competition1" />
                          <Form.Check inline label="동일선상" name="competition" type="radio" id="competition2" />
                          <Form.Check inline label="우선시됨" name="competition" type="radio" id="competition3" />
                          <Form.Check inline label="거의 독점" name="competition" type="radio" id="competition4" />
                        </td>
                        <td><SelectSign size={props.inputSize} /></td>
                      </tr>
                      <tr>
                        <th>
                          <Form.Label column={props.inputSize}>내가 생각하는<br />성공 가능성</Form.Label>
                        </th>
                        <td>
                          <Form.Check inline label="0%" name="success" type="radio" id="success1" />
                          <Form.Check inline label="15%" name="success" type="radio" id="success2" />
                          <Form.Check inline label="30%" name="success" type="radio" id="success3" />
                          <Form.Check inline label="45%" name="success" type="radio" id="success4" />
                          <Form.Check inline label="60%" name="success" type="radio" id="success5" />
                          <Form.Check inline label="75%" name="success" type="radio" id="success6" />
                          <Form.Check inline label="90%" name="success" type="radio" id="success7" />
                        </td>
                        <td><SelectSign size={props.inputSize} /></td>
                      </tr>
                    </tbody>
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
                      <tr className="test">
                        <th><Form.Label column={props.inputSize}>TDM</Form.Label></th>
                        <td><Form.Control size={props.inputSize} type="text" /></td>
                        <td><SelectSign size={props.inputSize} /></td>
                        <td><SelectPower size={props.inputSize} /></td>
                        <td><SelectSign size={props.inputSize} /></td>
                        <td><Form.Control size={props.inputSize} type="text" /></td>
                        <td><SelectSign size={props.inputSize} /></td>
                        <td><Form.Control size={props.inputSize} type="text" /></td>
                        <td><SelectSign size={props.inputSize} /></td>
                        <td>
                          <LineAdd size={props.inputSize} />
                          <LineDelete size={props.inputSize} />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <Table style={{ marginBottom: 0 }}>
                    <colgroup className="col_form2_2">
                      <col /><col /><col /><col /><col /><col /><col /><col /><col /><col />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th><Form.Label column={props.inputSize}>FDM</Form.Label></th>
                        <td><Form.Control size={props.inputSize} type="text" /></td>
                        <td><SelectSign size={props.inputSize} /></td>
                        <td><SelectPower size={props.inputSize} /></td>
                        <td><SelectSign size={props.inputSize} /></td>
                        <td><Form.Control size={props.inputSize} type="text" /></td>
                        <td><SelectSign size={props.inputSize} /></td>
                        <td><Form.Control size={props.inputSize} type="text" /></td>
                        <td><SelectSign size={props.inputSize} /></td>
                        <td>
                          <LineAdd size={props.inputSize} />
                          <LineDelete size={props.inputSize} />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <Table style={{ marginBottom: 0 }}>
                    <colgroup className="col_form2_2">
                      <col /><col /><col /><col /><col /><col /><col /><col /><col /><col />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th><Form.Label column={props.inputSize}>UDM</Form.Label></th>
                        <td><Form.Control size={props.inputSize} type="text" /></td>
                        <td><SelectSign size={props.inputSize} /></td>
                        <td><SelectPower size={props.inputSize} /></td>
                        <td><SelectSign size={props.inputSize} /></td>
                        <td><Form.Control size={props.inputSize} type="text" /></td>
                        <td><SelectSign size={props.inputSize} /></td>
                        <td><Form.Control size={props.inputSize} type="text" /></td>
                        <td><SelectSign size={props.inputSize} /></td>
                        <td>
                          <LineAdd size={props.inputSize} />
                          <LineDelete size={props.inputSize} />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <Table>
                    <colgroup className="col_form2_2">
                      <col /><col /><col /><col /><col /><col /><col /><col /><col /><col />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th><Form.Label column={props.inputSize}>HELPER</Form.Label></th>
                        <td><Form.Control size={props.inputSize} type="text" /></td>
                        <td><SelectSign size={props.inputSize} /></td>
                        <td><SelectPower size={props.inputSize} /></td>
                        <td><SelectSign size={props.inputSize} /></td>
                        <td><Form.Control size={props.inputSize} type="text" /></td>
                        <td><SelectSign size={props.inputSize} /></td>
                        <td><Form.Control size={props.inputSize} type="text" /></td>
                        <td><SelectSign size={props.inputSize} /></td>
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
                <Card.Header>구매 영향력 평가</Card.Header>
                <Card.Body>
                  <Table style={{ marginBottom: 0 }}>
                    <colgroup className="col_form2_3">
                      <col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col />
                    </colgroup>
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
                        <td><Form.Control size={props.inputSize} type="text" disabled /></td>
                        <td><SelectScore size={props.inputSize} /></td>
                        <td><SelectSign size={props.inputSize} /></td>
                        <td><SelectScore size={props.inputSize} /></td>
                        <td><SelectSign size={props.inputSize} /></td>
                        <td><SelectScore size={props.inputSize} /></td>
                        <td><SelectSign size={props.inputSize} /></td>
                        <td><SelectScore size={props.inputSize} /></td>
                        <td><SelectSign size={props.inputSize} /></td>
                        <td><Form.Control size={props.inputSize} type="text" /></td>
                      </tr>
                    </tbody>
                  </Table>
                  <Table style={{ marginBottom: 0 }}>
                    <colgroup className="col_form2_3">
                      <col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th><Form.Label column={props.inputSize}>FDM</Form.Label></th>
                        <td><Form.Control size={props.inputSize} type="text" disabled /></td>
                        <td><SelectScore size={props.inputSize} /></td>
                        <td><SelectSign size={props.inputSize} /></td>
                        <td><SelectScore size={props.inputSize} /></td>
                        <td><SelectSign size={props.inputSize} /></td>
                        <td><SelectScore size={props.inputSize} /></td>
                        <td><SelectSign size={props.inputSize} /></td>
                        <td><SelectScore size={props.inputSize} /></td>
                        <td><SelectSign size={props.inputSize} /></td>
                        <td><Form.Control size={props.inputSize} type="text" /></td>
                      </tr>
                    </tbody>
                  </Table>
                  <Table style={{ marginBottom: 0 }}>
                    <colgroup className="col_form2_3">
                      <col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th><Form.Label column={props.inputSize}>UDM</Form.Label></th>
                        <td><Form.Control size={props.inputSize} type="text" disabled /></td>
                        <td><SelectScore size={props.inputSize} /></td>
                        <td><SelectSign size={props.inputSize} /></td>
                        <td><SelectScore size={props.inputSize} /></td>
                        <td><SelectSign size={props.inputSize} /></td>
                        <td><SelectScore size={props.inputSize} /></td>
                        <td><SelectSign size={props.inputSize} /></td>
                        <td><SelectScore size={props.inputSize} /></td>
                        <td><SelectSign size={props.inputSize} /></td>
                        <td><Form.Control size={props.inputSize} type="text" /></td>
                      </tr>
                    </tbody>
                  </Table>
                  <Table>
                    <colgroup className="col_form2_3">
                      <col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th><Form.Label column={props.inputSize}>HELPER</Form.Label></th>
                        <td><Form.Control size={props.inputSize} type="text" disabled /></td>
                        <td><SelectScore size={props.inputSize} /></td>
                        <td><SelectSign size={props.inputSize} /></td>
                        <td><SelectScore size={props.inputSize} /></td>
                        <td><SelectSign size={props.inputSize} /></td>
                        <td><SelectScore size={props.inputSize} /></td>
                        <td><SelectSign size={props.inputSize} /></td>
                        <td><SelectScore size={props.inputSize} /></td>
                        <td><SelectSign size={props.inputSize} /></td>
                        <td><Form.Control size={props.inputSize} type="text" /></td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>

              <Card>
                <Card.Header>경쟁</Card.Header>
                <Card.Body>
                  <Table style={{ marginBottom: 0 }}>
                    <colgroup className="col_form2_4">
                      <col /><col /><col /><col /><col /><col />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th><Form.Label column={props.inputSize}>선정 고객명</Form.Label></th>
                        <td><Form.Control size={props.inputSize} type="text" /></td>
                        <td><SelectSign size={props.inputSize} /></td>
                        <td><Form.Control size={props.inputSize} type="text" /></td>
                        <td><SelectSign size={props.inputSize} /></td>
                        <td></td>
                      </tr>
                      <tr>
                        <th><Form.Label column={props.inputSize}>고객관점 대체안<br />(우리의 경쟁)</Form.Label></th>
                        <td><Form.Control size={props.inputSize} type="text" /></td>
                        <td><SelectSign size={props.inputSize} /></td>
                        <td><Form.Control size={props.inputSize} type="text" /></td>
                        <td><SelectSign size={props.inputSize} /></td>
                        <td></td>
                      </tr>
                      <tr>
                        <th><Form.Label column={props.inputSize}>강점과 기회</Form.Label></th>
                        <td><Form.Control size={props.inputSize} type="text" /></td>
                        <td><SelectSign size={props.inputSize} /></td>
                        <td><Form.Control size={props.inputSize} type="text" /></td>
                        <td><SelectSign size={props.inputSize} /></td>
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
                        <td><Form.Control size={props.inputSize} type="text" /></td>
                        <td><SelectSign size={props.inputSize} /></td>
                        <td><Form.Control size={props.inputSize} type="text" /></td>
                        <td><SelectSign size={props.inputSize} /></td>
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
              <Button variant="secondary" onClick={handleNext}>다음 &gt;</Button>
            </Box>
          </React.Fragment>
        </div>
      </div>
    </div>
  );
}

export default Form1;
