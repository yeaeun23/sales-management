import React from "react";
import {
  BrowserRouter as Router,
  useParams
} from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import '../App.css';
import SignSelect from '../components/SignSelect';
import LineAdd from '../components/LineAdd';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function TGPDetail() {
  let { id } = useParams();

  const navigate = useNavigate();
  const steps = ['Target Goal Plan', 'In The Funnel', 'Getting Action'];
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    // setActiveStep(0);
    navigate(`/`);
  };

  return (
    <div className="root">
      <AppBar position="static">
        <Toolbar>
          <IconButton className="menuButton" color="inherit" aria-label="Open drawer">
            <MenuIcon />
          </IconButton>
          <Typography className="title" variant="h6" color="inherit" noWrap>
            Sales Master
          </Typography>
        </Toolbar>
      </AppBar>

      <div className="paper">
        <Stepper activeStep={activeStep} style={{margin: '50px'}}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption"></Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <Form className="form">
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
                <Button onClick={handleReset}>TGP 목록</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                {/* Step {activeStep + 1} */}
                {
                  activeStep === 0
                    ? Step1()
                    : (activeStep === 1
                      ? Step2()
                      : Step3()
                    )
                }
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button variant="secondary" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                  &lt; 이전
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {/* {isStepOptional(activeStep) && (
                  <Button variant="secondary" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )}&nbsp;&nbsp; */}
                
                {
                activeStep === steps.length - 1 
                ? 
                (function(){
                  return (<Button variant="primary" onClick={handleNext}>TGP 저장</Button>);
                })()                   
                : (function(){
                  return (<Button variant="secondary" onClick={handleNext}>다음 &gt;</Button>);
                })()
                }                
              </Box>
            </React.Fragment>
          )}
        </Form>
      </div>
    </div>
  );
}

function Step1() {
  return (
    <div>
      <Card>
        <Card.Header as="h6">Target Goal Plan</Card.Header>
        <Card.Body>
          <Row>
            <Form.Group as={Col} controlId="customer">
              <Form.Label column="sm">거래처</Form.Label>
              <Form.Control size="sm" type="text" />
            </Form.Group>
            <Form.Group as={Col} controlId="department">
              <Form.Label column="sm">부서</Form.Label>
              <Form.Control size="sm" type="text" />
            </Form.Group>
            <Form.Group as={Col} controlId="solution">
              <Form.Label column="sm">솔루션</Form.Label>
              <Form.Control size="sm" type="text" />
            </Form.Group>
            <Form.Group as={Col} controlId="amount">
              <Form.Label column="sm">금액</Form.Label>
              <Form.Control size="sm" type="text" />
            </Form.Group>
            <Form.Group as={Col} controlId="target_date">
              <Form.Label column="sm">목표일</Form.Label>
              <Form.Control size="sm" type="date" />
            </Form.Group>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}

function Step2() {
  return (
    <div>
      <Card>
        <Card.Header as="h6">TGP 현재 위치</Card.Header>
        <Card.Body>
          <Table>
            <tbody>
              <tr>
                <th>
                  <Form.Label column="sm">고객관점<br />세일즈 퍼널 위치</Form.Label>
                </th>
                <td>
                  <Form.Check inline label="Lead" name="sales_funnel" type="radio" id="sales_funnel1" />
                  <Form.Check inline label="Filtering" name="sales_funnel" type="radio" id="sales_funnel2" />
                  <Form.Check inline label="Opportunity" name="sales_funnel" type="radio" id="sales_funnel3" />
                  <Form.Check inline label="Closing" name="sales_funnel" type="radio" id="sales_funnel4" />
                </td>
                <td><SignSelect /></td>
              </tr>
              <tr>
                <th>
                  <Form.Label column="sm">고객관점<br />경쟁대비 위치</Form.Label>
                </th>
                <td>
                  <Form.Check inline label="희박함" name="competition" type="radio" id="competition1" />
                  <Form.Check inline label="동일선상" name="competition" type="radio" id="competition2" />
                  <Form.Check inline label="우선시됨" name="competition" type="radio" id="competition3" />
                  <Form.Check inline label="거의 독점" name="competition" type="radio" id="competition4" />
                </td>
                <td><SignSelect /></td>
              </tr>
              <tr>
                <th>
                  <Form.Label column="sm">내가 생각하는<br />성공 가능성</Form.Label>
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
                <td><SignSelect /></td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header as="h6">구매 영향력의 역할</Card.Header>
        <Card.Body>
          <Table>
            <tbody>
              <tr>
                <th><Form.Label column="sm">TDM</Form.Label></th>
                <td><Form.Control size="sm" type="text" placeholder="이름/직함 또는 직급" /></td>
                <td><SignSelect /></td>
                <td><LineAdd /></td>
              </tr>
              <tr>
                <th><Form.Label column="sm">FDM</Form.Label></th>
                <td><Form.Control size="sm" type="text" placeholder="이름/직함 또는 직급" /></td>
                <td><SignSelect /></td>
                <td><LineAdd /></td>
              </tr>
              <tr>
                <th><Form.Label column="sm">UDM</Form.Label></th>
                <td><Form.Control size="sm" type="text" placeholder="이름/직함 또는 직급" /></td>
                <td><SignSelect /></td>
                <td><LineAdd /></td>
              </tr>
              <tr>
                <th><Form.Label column="sm">HELPER</Form.Label></th>
                <td><Form.Control size="sm" type="text" placeholder="이름/직함 또는 직급" /></td>
                <td><SignSelect /></td>
                <td><LineAdd /></td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header as="h6">장벽과 원동력 (Personal과 Business를 모두 고려)</Card.Header>
        <Card.Body>
          <Table>
            <tbody>
              <tr>
                <td>
                  <Form.Select size="sm">
                    <option>파워 선택</option>
                    <option>High</option>
                    <option>Middle</option>
                    <option>Low</option>
                  </Form.Select>
                </td>
                <td><Form.Control size="sm" type="text" /></td>
                <td><SignSelect /></td>
                <td><Form.Control size="sm" type="text" /></td>
                <td><SignSelect /></td>
                <td><LineAdd /></td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header as="h6">평가</Card.Header>
        <Card.Body>
          <Table>
            <tbody>
              <tr>
                <th><Form.Label column="sm">영업사원</Form.Label></th>
                <th><Form.Label column="sm">제품</Form.Label></th>
                <th><Form.Label column="sm">서비스</Form.Label></th>
                <th><Form.Label column="sm">우리 회사</Form.Label></th>
                <th><Form.Label column="sm">평가에 대한 의견</Form.Label></th>
              </tr>
              <tr>
                <td>
                  <Form.Select size="sm">
                    <option>선택</option>
                    <option>+4</option>
                    <option>+3</option>
                    <option>+2</option>
                    <option>+1</option>
                    <option>-1</option>
                    <option>-2</option>
                    <option>-3</option>
                    <option>-4</option>
                  </Form.Select>
                </td>
                <td>
                  <Form.Select size="sm">
                    <option>선택</option>
                    <option>+4</option>
                    <option>+3</option>
                    <option>+2</option>
                    <option>+1</option>
                    <option>-1</option>
                    <option>-2</option>
                    <option>-3</option>
                    <option>-4</option>
                  </Form.Select>
                </td>
                <td>
                  <Form.Select size="sm">
                    <option>선택</option>
                    <option>+4</option>
                    <option>+3</option>
                    <option>+2</option>
                    <option>+1</option>
                    <option>-1</option>
                    <option>-2</option>
                    <option>-3</option>
                    <option>-4</option>
                  </Form.Select>
                </td>
                <td>
                  <Form.Select size="sm">
                    <option>선택</option>
                    <option>+4</option>
                    <option>+3</option>
                    <option>+2</option>
                    <option>+1</option>
                    <option>-1</option>
                    <option>-2</option>
                    <option>-3</option>
                    <option>-4</option>
                  </Form.Select>
                </td>
                <td><Form.Control size="sm" type="text" /></td>
                <td><SignSelect /></td>
                <td><LineAdd /></td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header as="h6">경쟁자</Card.Header>
        <Card.Body>
          <Table>
            <tbody>
              <tr>
                <th><Form.Label column="sm">선정고객</Form.Label></th>
                <td><Form.Control size="sm" type="text" /></td>
                <td><SignSelect /></td>
                <td><Form.Control size="sm" type="text" /></td>
                <td><SignSelect /></td>
                <td><LineAdd /></td>
              </tr>
              <tr>
                <th><Form.Label column="sm">고객관점 대체안<br />(우리의 경쟁)</Form.Label></th>
                <td><Form.Control size="sm" type="text" /></td>
                <td><SignSelect /></td>
                <td><Form.Control size="sm" type="text" /></td>
                <td><SignSelect /></td>
                <td><LineAdd /></td>
              </tr>
              <tr>
                <th><Form.Label column="sm">강점과 기회</Form.Label></th>
                <td><Form.Control size="sm" type="text" /></td>
                <td><SignSelect /></td>
                <td><Form.Control size="sm" type="text" /></td>
                <td><SignSelect /></td>
                <td><LineAdd /></td>
              </tr>
              <tr>
                <th><Form.Label column="sm">약점과 위협</Form.Label></th>
                <td><Form.Control size="sm" type="text" /></td>
                <td><SignSelect /></td>
                <td><Form.Control size="sm" type="text" /></td>
                <td><SignSelect /></td>
                <td><LineAdd /></td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
}

function Step3() {
  return (
    <div>
      <Card>
        <Card.Header as="h6">전략 분석</Card.Header>
        <Card.Body>
          <Table>
            <tbody>
              <tr>
                <th><Form.Label column="sm">기회/강점 요인 (Blue Sign)</Form.Label></th>
                <th><Form.Label column="sm">기회/강점을 강화하거나 활용할 수 있는 방안</Form.Label></th>
              </tr>
              <tr>
                <td><Form.Control size="sm" type="text" /></td>
                <td><Form.Control size="sm" type="text" /></td>
              </tr>
              <tr>
                <th><Form.Label column="sm">위협/약점 요인 (Red/Gray Sign)</Form.Label></th>
                <th><Form.Label column="sm">위협/약점을 최소화하거나 제거할 수 있는 방안</Form.Label></th>
              </tr>
              <tr>
                <td><Form.Control size="sm" type="text" /></td>
                <td><Form.Control size="sm" type="text" /></td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header as="h6">Action Plan (중요하고 시급한 액션)</Card.Header>
        <Card.Body>
          <Table>
            <tbody>
              <tr>
                <th><Form.Label column="sm">실행액션</Form.Label></th>
                <th><Form.Label column="sm">실행일시</Form.Label></th>
                <th><Form.Label column="sm">실행자</Form.Label></th>
                <th><Form.Label column="sm">협조자 (부서)</Form.Label></th>
              </tr>
              <tr>
                <td><Form.Control size="sm" type="text" /></td>
                <td><Form.Control size="sm" type="date" /></td>
                <td><Form.Control size="sm" type="text" /></td>
                <td><Form.Control size="sm" type="text" /></td>
                <td><LineAdd /></td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
}

export default TGPDetail;
