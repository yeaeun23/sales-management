import React from "react";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

function Form1(props) {
  return (
    <div>
      <Card>
        <Card.Header>Target Goal Plan</Card.Header>
        <Card.Body>
          <Table>
            <colgroup className="col_form1_1">
              <col /><col /><col /><col />
            </colgroup>
            <tbody>
              <tr>
                <th><Form.Label column={props.inputSize}>거래처</Form.Label></th>
                <td><Form.Control size={props.inputSize} type="text" name="customer" /></td>
                <th><Form.Label column={props.inputSize}>부서</Form.Label></th>
                <td><Form.Control size={props.inputSize} type="text" name="department" /></td>
              </tr>
              <tr>
                <th><Form.Label column={props.inputSize}>솔루션</Form.Label></th>
                <td><Form.Control size={props.inputSize} type="text" name="solution" /></td>
                <th><Form.Label column={props.inputSize}>금액 (원)</Form.Label></th>
                <td><Form.Control size={props.inputSize} type="text" name="amount" />
                </td>
              </tr>
              <tr>
                <th>
                  <Form.Label column={props.inputSize}>목표일</Form.Label>
                </th>
                <td>
                  <Form.Control size={props.inputSize} type="date" name="targetdate" />
                </td>
                <th></th>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Form1;