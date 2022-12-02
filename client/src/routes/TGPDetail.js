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

function TGPDetail(props) {
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
    account: "",
    department: "",
    solution: "",
    amount: "",
    closingdate: ""
  });

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  useEffect(() => {
    const setInputData = async () => {
      const response = await fetch('/api/tgp/' + params.tgp_id);
      const body = await response.json();
      return body;
    }

    setInputData()
      .then(res => setInputs({
        ...inputs,
        account: res[0].account,
        department: res[0].department,
        solution: res[0].solution,
        amount: res[0].amount,
        closingdate: res[0].closingdate
      }))
      .catch(err => console.log(err));
  }, [params.tgp_id]);

  const handleNext = () => {
    saveInputData();
  };

  const saveInputData = () => {
    const url = '/api/tgp/' + params.tgp_id + '/STEP1';
    const formData = new FormData();

    formData.append('account', inputs.account);
    formData.append('department', inputs.department);
    formData.append('solution', inputs.solution);
    formData.append('amount', inputs.amount);
    formData.append('closingdate', inputs.closingdate);
    
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
        <Stepper activeStep={0} style={{ margin: '50px' }}>
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
                    <colgroup className="col_form1_1">
                      <col /><col /><col /><col />
                    </colgroup>
                    {inputs.account !== null ?
                      <tbody>
                        <tr>
                          <th><Form.Label column={props.inputSize}>거래처</Form.Label></th>
                          <td><Form.Control size={props.inputSize} type="text" name="account" value={inputs.account} onChange={handleValueChange} /></td>
                          <th><Form.Label column={props.inputSize}>부서</Form.Label></th>
                          <td><Form.Control size={props.inputSize} type="text" name="department" value={inputs.department} onChange={handleValueChange} /></td>
                        </tr>
                        <tr>
                          <th><Form.Label column={props.inputSize}>솔루션</Form.Label></th>
                          <td><Form.Control size={props.inputSize} type="text" name="solution" value={inputs.solution} onChange={handleValueChange} /></td>
                          <th><Form.Label column={props.inputSize}>금액 (원)</Form.Label></th>
                          <td><Form.Control size={props.inputSize} type="text" name="amount" value={inputs.amount} onChange={handleValueChange} />
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <Form.Label column={props.inputSize}>목표일</Form.Label>
                          </th>
                          <td>
                            <Form.Control size={props.inputSize} type="date" name="closingdate" value={inputs.closingdate} onChange={handleValueChange} />
                          </td>
                          <th></th>
                          <td></td>
                        </tr>
                      </tbody>
                      :
                      <tbody>
                        <tr>
                          <td colSpan="4" align="center">
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
              <Box sx={{ flex: '1 1 auto' }} />
              <Link to={`/customer/${params.customer_id}/${params.tgp_id}/2`} style={{ display: 'block' }}>
                <Button variant="secondary" onClick={handleNext}>다음 &gt;</Button>
              </Link>
            </Box>
          </React.Fragment>
        </div>
      </div>
    </div>
  );
}

export default TGPDetail;
