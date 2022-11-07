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
  const [loading, setLoading] = useState(0);

  const progress = () => {
    const completed = loading;
    setLoading((completed >= 100) ? 0 : completed + 1);
  }

  useEffect(() => {
    setInterval(progress, 20);
  });

  const [inputs, setInputs] = useState({
    position1: "",
    position1_sign: "",
    position2: "",
    position2_sign: "",
    position3: "",
    position3_sign: ""
  });

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  useEffect(() => {
    setInputData()
      .then(res => setInputs({
        ...inputs,
        position1: res[0].position1,
        position1_sign: res[0].position1_sign,
        position2: res[0].position2,
        position2_sign: res[0].position2_sign,
        position3: res[0].position3,
        position3_sign: res[0].position3_sign
      }))
      .catch(err => console.log(err));
  }, []);

  const setInputData = async () => {
    const response = await fetch('/api/tgp/' + params.tgp_id + '/' + params.form_id);
    const body = await response.json();
    return body;
  }

  const handleBack = () => {
    saveInputData();
  };

  const handleNext = () => {
    saveInputData();
  };

  const saveInputData = () => {
    const url = '/api/tgp/' + params.tgp_id + '/' + params.form_id;
    const formData = new FormData();
    formData.append('position1', inputs.position1);
    formData.append('position1_sign', inputs.position1_sign);
    formData.append('position2', inputs.position2);
    formData.append('position2_sign', inputs.position2_sign);
    formData.append('position3', inputs.position3);
    formData.append('position3_sign', inputs.position3_sign);

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

  const position1_label = ["Lead", "Filtering","Opportunity","Closing"];

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
                    {inputs.account != "" ?
                      <tbody>
                        <tr>
                          <th>
                            <Form.Label column={props.inputSize}>고객관점<br />세일즈 퍼널 위치</Form.Label>
                          </th>
                          <td>
                          {                            
                            position1_label.map((label, i) => (
                              <Form.Check inline label={label} name="position1" type="radio" key={i} value={i} checked={inputs.position1 === i } onChange={handleValueChange} />
                          ))}
                          </td>
                          <td><SelectSign size={props.inputSize} value={inputs.position1_sign} /></td>
                        </tr>
                        <tr>
                          <th>
                            <Form.Label column={props.inputSize}>고객관점<br />경쟁대비 위치</Form.Label>
                          </th>
                          <td>
                            {/* <Form.Check inline label="희박함" name="position2" type="radio" value="0" checked={inputs.position2 === 0 } />
                            <Form.Check inline label="동일선상" name="position2" type="radio" value="1" checked={inputs.position2 === 1 } />
                            <Form.Check inline label="우선시됨" name="position2" type="radio" value="2" checked={inputs.position2 === 2 } />
                            <Form.Check inline label="거의 독점" name="position2" type="radio" value="3" checked={inputs.position2 === 3 } /> */}
                          </td>
                          <td><SelectSign size={props.inputSize} /></td>
                        </tr>
                        <tr>
                          <th>
                            <Form.Label column={props.inputSize}>내가 생각하는<br />성공 가능성</Form.Label>
                          </th>
                          <td>
                            {/* <Form.Check inline label="0%" name="position3" type="radio" value="0" checked={inputs.position3 === 0 } />
                            <Form.Check inline label="15%" name="position3" type="radio" value="1" checked={inputs.position3 === 1 } />
                            <Form.Check inline label="30%" name="position3" type="radio" value="2" checked={inputs.position3 === 2 } />
                            <Form.Check inline label="45%" name="position3" type="radio" value="3" checked={inputs.position3 === 3 } />
                            <Form.Check inline label="60%" name="position3" type="radio" value="4" checked={inputs.position3 === 4 } />
                            <Form.Check inline label="75%" name="position3" type="radio" value="5" checked={inputs.position3 === 5 } />
                            <Form.Check inline label="90%" name="position3" type="radio" value="6" checked={inputs.position3 === 6 } /> */}
                          </td>
                          <td><SelectSign size={props.inputSize} /></td>
                        </tr>
                      </tbody>
                      :
                      <tbody>
                        <tr>
                          <td colSpan="3" align="center">
                            <CircularProgress className="progress" variant="indeterminate" value={loading} />
                          </td>
                        </tr>
                      </tbody>
                    }
                  </Table>
                </Card.Body>
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
