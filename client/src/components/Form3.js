import React from "react";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import LineAdd from '../components/LineAdd';
import LineDelete from '../components/LineDelete';

function Form3(props) {
  return (
    <div>
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
                  <Form.Label column={props.inputSize}>기회/강점 요인 (Blue Sign)</Form.Label>
                </th>
                <th>
                  <Form.Label column={props.inputSize}>기회/강점을 강화하거나 활용할 수 있는 방안</Form.Label>
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
                  <Form.Label column={props.inputSize}>위협/약점 요인 (Red/Gray Sign)</Form.Label>
                </th>
                <th>
                  <Form.Label column={props.inputSize}>위협/약점을 최소화하거나 제거할 수 있는 방안</Form.Label>
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
  )
}

export default Form3;
