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

function TGPDetail() {
  let { id } = useParams();

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
        <Form style={{ width: '800px', margin: 'auto' }}>
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

          <Card>
            <Card.Header as="h6">TGP 현재 위치</Card.Header>
            <Card.Body>
              <Table>
                <tbody>
                  <tr>
                    <th>
                      <Form.Label column="sm">세일즈 퍼널 위치</Form.Label>
                    </th>
                    <td>
                      <Form.Check
                        inline
                        label="Lead"
                        name="sales_funnel"
                        type="radio"
                        id="sales_funnel1" />
                      <Form.Check
                        inline
                        label="Filtering"
                        name="sales_funnel"
                        type="radio"
                        id="sales_funnel2" />
                      <Form.Check
                        inline
                        label="Opportunity"
                        name="sales_funnel"
                        type="radio"
                        id="sales_funnel3" />
                      <Form.Check
                        inline
                        label="Closing"
                        name="sales_funnel"
                        type="radio"
                        id="sales_funnel4" />
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <Form.Label column="sm">경쟁대비 위치</Form.Label>
                    </th>
                    <td>
                      <Form.Check
                        inline
                        label="희박함"
                        name="competition"
                        type="radio"
                        id="competition1" />
                      <Form.Check
                        inline
                        label="동일선상"
                        name="competition"
                        type="radio"
                        id="competition2" />
                      <Form.Check
                        inline
                        label="우선시됨"
                        name="competition"
                        type="radio"
                        id="competition3" />
                      <Form.Check
                        inline
                        label="거의 독점"
                        name="competition"
                        type="radio"
                        id="competition4" />
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <Form.Label column="sm">성공 가능성</Form.Label>
                    </th>
                    <td>
                      <Form.Check
                        inline
                        label="0%"
                        name="success"
                        type="radio"
                        id="success1" />
                      <Form.Check
                        inline
                        label="15%"
                        name="success"
                        type="radio"
                        id="success2" />
                      <Form.Check
                        inline
                        label="30%"
                        name="success"
                        type="radio"
                        id="success3" />
                      <Form.Check
                        inline
                        label="45%"
                        name="success"
                        type="radio"
                        id="success4" />
                      <Form.Check
                        inline
                        label="60%"
                        name="success"
                        type="radio"
                        id="success5" />
                      <Form.Check
                        inline
                        label="75%"
                        name="success"
                        type="radio"
                        id="success6" />
                      <Form.Check
                        inline
                        label="90%"
                        name="success"
                        type="radio"
                        id="success7" />
                    </td>
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
                  </tr>
                  <tr>
                    <th><Form.Label column="sm">FDM</Form.Label></th>
                    <td><Form.Control size="sm" type="text" placeholder="이름/직함 또는 직급" /></td>
                  </tr>
                  <tr>
                    <th><Form.Label column="sm">UDM</Form.Label></th>
                    <td><Form.Control size="sm" type="text" placeholder="이름/직함 또는 직급" /></td>
                  </tr>
                  <tr>
                    <th><Form.Label column="sm">HELPER</Form.Label></th>
                    <td><Form.Control size="sm" type="text" placeholder="이름/직함 또는 직급" /></td>
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
                        <option>파워</option>
                        <option>High</option>
                        <option>Middle</option>
                        <option>Low</option>
                      </Form.Select>
                    </td>
                    <td><Form.Control size="sm" type="text" /></td>
                    <td><Form.Control size="sm" type="text" /></td>
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
                    <th><Form.Label column="sm">우리회사</Form.Label></th>
                    <th><Form.Label column="sm">의견</Form.Label></th>
                  </tr>
                  <tr>
                    <td>
                      <Form.Select size="sm">
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
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>

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
                    <th><Form.Label column="sm">협조자(부서)</Form.Label></th>
                  </tr>
                  <tr>
                    <td><Form.Control size="sm" type="text" /></td>
                    <td><Form.Control size="sm" type="date" /></td>
                    <td><Form.Control size="sm" type="text" /></td>
                    <td><Form.Control size="sm" type="text" /></td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Form>
      </div>
    </div>
  );
}

export default TGPDetail;