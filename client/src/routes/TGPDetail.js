import React from "react";
import {
  BrowserRouter as Router,
  useParams
} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { colors } from "@material-ui/core";

function TGPDetail() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();

  return (
    <div>
      <Form>
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
              <Form.Group as={Row}>
                <Form.Label as="legend" column sm={2}>
                  고객 관점<br />세일즈 퍼널 위치
                </Form.Label>
                <Col sm={10}>
                    <Form.Check
                      inline
                      label="Lead"
                      name="sales_funnel"
                      type="radio"
                      id="sales_funnel1"
                    />
                    <Form.Check
                      inline
                      label="Filtering"
                      name="sales_funnel"
                      type="radio"
                      id="sales_funnel2"
                    />
                    <Form.Check
                      inline
                      label="Opportunity"
                      name="sales_funnel"
                      type="radio"
                      id="sales_funnel3"
                    />
                    <Form.Check
                      inline
                      label="Closing"
                      name="sales_funnel"
                      type="radio"
                      id="sales_funnel4"
                    />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label as="legend" column sm={2}>
                  고객 관점<br />경쟁대비 위치
                </Form.Label>
                <Col sm={10}>
                    <Form.Check
                      inline
                      label="희박함"
                      name="competition"
                      type="radio"
                      id="competition1"
                    />
                    <Form.Check
                      inline
                      label="동일선상"
                      name="competition"
                      type="radio"
                      id="competition2"
                    />
                    <Form.Check
                      inline
                      label="우선시됨"
                      name="competition"
                      type="radio"
                      id="competition3"
                    />
                    <Form.Check
                      inline
                      label="거의 독점"
                      name="competition"
                      type="radio"
                      id="competition4"
                    />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label as="legend" column sm={2}>
                  내가 생각하는<br />성공 가능성
                </Form.Label>
                <Col sm={10}>
                    <Form.Check
                      inline
                      label="0%"
                      name="success"
                      type="radio"
                      id="success1"
                    />
                    <Form.Check
                      inline
                      label="15%"
                      name="success"
                      type="radio"
                      id="success2"
                    />
                    <Form.Check
                      inline
                      label="30%"
                      name="success"
                      type="radio"
                      id="success3"
                    />
                    <Form.Check
                      inline
                      label="45%"
                      name="success"
                      type="radio"
                      id="success4"
                    />
                    <Form.Check
                      inline
                      label="60%"
                      name="success"
                      type="radio"
                      id="success5"
                    />
                    <Form.Check
                      inline
                      label="75%"
                      name="success"
                      type="radio"
                      id="success6"
                    />
                    <Form.Check
                      inline
                      label="90%"
                      name="success"
                      type="radio"
                      id="success7"
                    />
                </Col>
              </Form.Group>
          </Card.Body>
        </Card>
      </Form>

    </div>
  );
}

export default TGPDetail;