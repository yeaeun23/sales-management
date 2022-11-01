import React from "react";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import LineAdd from '../components/LineAdd';
import LineDelete from '../components/LineDelete';
import SelectSign from '../components/SelectSign';
import SelectScore from '../components/SelectScore';
import SelectPower from "../components/SelectPower";

function Form2(props) {
  return (
    <div>
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
  )
}

export default Form2;
