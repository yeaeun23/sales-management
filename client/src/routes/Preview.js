import React, { useState, useEffect } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import { useParams } from 'react-router-dom';
import styles from "./Preview.module.css";

function Preview(props) {
  const { customer_id, tgp_id, form_id } = useParams();
  const [inputs1, setInputs1] = useState([]);
  const [inputs2, setInputs2] = useState([]);
  const [inputs3, setInputs3] = useState([]);
  const [inputs4, setInputs4] = useState([]);
  const [inputs5, setInputs5] = useState([]);
  const [inputs6, setInputs6] = useState([]);
  const [inputs7, setInputs7] = useState([]);
  const [inputs8, setInputs8] = useState([]);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);
  const [loading4, setLoading4] = useState(true);
  const [loading5, setLoading5] = useState(true);
  const [loading6, setLoading6] = useState(true);
  const [loading7, setLoading7] = useState(true);
  const [loading8, setLoading8] = useState(true);

  // Target Goal Plan, 경쟁
  useEffect(() => {
    const setInputData1 = async () => {
      const response = await fetch('/tgp/' + tgp_id + '/' + form_id + '/step1');
      const body = await response.json();
      return body;
    }
    setInputData1().then(res => {
      setInputs1(res[0]);
      setLoading1(false);
    }).catch(err => console.log(err));
  }, []);

  // TGP 현재 위치
  useEffect(() => {
    const setInputData2 = async () => {
      const response = await fetch('/tgp/' + tgp_id + '/' + form_id + '/step2');
      const body = await response.json();
      return body;
    }
    setInputData2().then(res => {
      setInputs2(res[0]);
      setLoading2(false);
    }).catch(err => console.log(err));
  }, []);

  // 구매 영향력, 평가
  useEffect(() => {
    const setInputData3 = async () => {
      const response = await fetch('/tgp/' + form_id + '/tdm');
      const body = await response.json();
      return body;
    }
    setInputData3().then(res => {
      if (res.length !== 0) {
        setInputs3(res);
      }
      setLoading3(false);
    }).catch(err => console.log(err));
  }, []);

  // 경쟁 - 강점/기회
  useEffect(() => {
    const setInputData4 = async () => {
      const response = await fetch('/tgp/' + form_id + '/strength');
      const body = await response.json();
      return body;
    }
    setInputData4().then(res => {
      if (res.length !== 0) {
        setInputs4(res);
      }
      setLoading4(false);
    }).catch(err => console.log(err));
  }, []);

  // 경쟁 - 약점/위협
  useEffect(() => {
    const setInputData5 = async () => {
      const response = await fetch('/tgp/' + form_id + '/weakness');
      const body = await response.json();
      return body;
    }
    setInputData5().then(res => {
      if (res.length !== 0) {
        setInputs5(res);
      }
      setLoading5(false);
    }).catch(err => console.log(err));
  }, []);

  // 전략 분석
  useEffect(() => {
    const setInputData6 = async () => {
      const response = await fetch('/tgp/' + tgp_id + '/' + form_id + '/strategy1/false');
      const body = await response.json();
      return body;
    }
    const setInputData7 = async () => {
      const response = await fetch('/tgp/' + form_id + '/strategy2');
      const body = await response.json();
      return body;
    }
    setInputData6().then(res => {
      if (res.length !== 0) {
        setInputs6(res);
      }
      setLoading6(false);
    }).then(() => {
      setInputData7().then(res => {
        if (res.length !== 0) {
          setInputs7(res);
        }
        setLoading7(false);
      })
    }).catch(err => console.log(err));
  }, []);

  // Action Plan
  useEffect(() => {
    const setInputData8 = async () => {
      const response = await fetch('/tgp/' + form_id + '/action');
      const body = await response.json();
      return body;
    }
    setInputData8().then(res => {
      if (res.length !== 0) {
        setInputs8(res);
      }
      setLoading8(false);
    }).catch(err => console.log(err));
  }, []);

  const SetSign = (sign) => {
    if (sign === "G") {
      return <span style={{ color: "darkgray" }}>●</span>;
    }
    else if (sign === "R") {
      return <span style={{ color: "red" }}>●</span>;
    }
    else if (sign === "B") {
      return <span style={{ color: "blue" }}>●</span>;
    }
  }

  return (
    <div className={styles.prev}>
      {(!loading1 && !loading2 && !loading3 && !loading4 && !loading5 && !loading6 && !loading7 && !loading8) ?
        <div>
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <th colSpan="10">Target Goal Plan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th width="90px">거래처</th>
                <td width="175px">{inputs1.account}</td>
                <th width="90px">부서</th>
                <td width="175px">{inputs1.department}</td>
                <th width="90px">솔루션</th>
                <td width="175px">{inputs1.solution}</td>
                <th width="90px">금액(원)</th>
                <td width="175px">{inputs1.amount}</td>
                <th width="90px">목표일</th>
                <td width="175px">{inputs1.closingdate}</td>
              </tr>
            </tbody>
          </table>
          <br /><br />

          <div>
            <table>
              <thead>
                <tr>
                  <th colSpan="3">TGP 현재 위치</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th width="90px">고객관점<br />세일즈 퍼널</th>
                  <td width="105px">
                    <input type="checkbox" disabled checked={inputs2.position1 === "Lead" ? "checked" : ""} /> Lead<br />
                    <input type="checkbox" disabled checked={inputs2.position1 === "Filtering" ? "checked" : ""} /> Filtering<br />
                    <input type="checkbox" disabled checked={inputs2.position1 === "Opportunity" ? "checked" : ""} /> Opportunity<br />
                    <input type="checkbox" disabled checked={inputs2.position1 === "Closing" ? "checked" : ""} /> Closing
                  </td>
                  <td className="sign">{SetSign(inputs2.position1_sign)}</td>
                </tr>
                <tr>
                  <th>고객관점<br />경쟁 위치</th>
                  <td>
                    <input type="checkbox" disabled checked={inputs2.position2 === "Late Runner" ? "checked" : ""} /> Late Runner<br />
                    <input type="checkbox" disabled checked={inputs2.position2 === "Same Line" ? "checked" : ""} /> Same Line<br />
                    <input type="checkbox" disabled checked={inputs2.position2 === "Consider First" ? "checked" : ""} /> Consider First<br />
                    <input type="checkbox" disabled checked={inputs2.position2 === "Exclusive" ? "checked" : ""} /> Exclusive
                  </td>
                  <td className="sign">{SetSign(inputs2.position2_sign)}</td>
                </tr>
                <tr>
                  <th>성공 가능성</th>
                  <td>{inputs2.position3}</td>
                  <td className="sign">{SetSign(inputs2.position3_sign)}</td>
                </tr>
              </tbody>
            </table>
            &nbsp;&nbsp;

            <table>
              <thead>
                <tr>
                  <th colSpan="9">구매 영향력</th>
                  <th colSpan="9">평가</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>이름/직함/직급</th>
                  <th colSpan="2">역할</th>
                  <th colSpan="2">파워</th>
                  <th colSpan="2">장벽</th>
                  <th colSpan="2">원동력</th>
                  <th colSpan="2">영업사원</th>
                  <th colSpan="2">제품</th>
                  <th colSpan="2">서비스</th>
                  <th colSpan="2">우리회사</th>
                  <th>평가 의견</th>
                </tr>
                {inputs3.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td width="95px">{item.title}</td>
                      <td width="55px">{item.role}</td>
                      <td className="sign">{SetSign(item.role_sign)}</td>
                      <td width="25px" align="center">{item.power}</td>
                      <td className="sign">{SetSign(item.power_sign)}</td>
                      <td width="95px">{item.barrier}</td>
                      <td className="sign">{SetSign(item.barrier_sign)}</td>
                      <td width="95px">{item.dynamic}</td>
                      <td className="sign">{SetSign(item.dynamic_sign)}</td>
                      <td width="35px" align="center">{item.score_sales}</td>
                      <td className="sign">{SetSign(item.score_sales_sign)}</td>
                      <td width="35px" align="center">{item.score_product}</td>
                      <td className="sign">{SetSign(item.score_product_sign)}</td>
                      <td width="35px" align="center">{item.score_service}</td>
                      <td className="sign">{SetSign(item.score_service_sign)}</td>
                      <td width="35px" align="center">{item.score_company}</td>
                      <td className="sign">{SetSign(item.score_company_sign)}</td>
                      <td width="95px">{item.score_opinion}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            &nbsp;&nbsp;

            <table>
              <thead>
                <tr>
                  <th colSpan="5">경쟁</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th width="65px">선정고객</th>
                  <td width="95px">{inputs2.competition1_name}</td>
                  <td className="sign">{SetSign(inputs2.competition1_name_sign)}</td>
                  <td width="95px">{inputs2.competition2_name}</td>
                  <td className="sign">{SetSign(inputs2.competition2_name_sign)}</td>
                </tr>
                <tr>
                  <th>대체안</th>
                  <td>{inputs2.competition1_type}</td>
                  <td className="sign">{SetSign(inputs2.competition1_type_sign)}</td>
                  <td>{inputs2.competition2_type}</td>
                  <td className="sign">{SetSign(inputs2.competition2_type_sign)}</td>
                </tr>
                {inputs4.map((item, i) => {
                  return (
                    <tr key={i}>
                      <th>{i === 0 ? "강점/기회" : ""}</th>
                      <td>{item.strength1}</td>
                      <td className="sign">{SetSign(item.strength1_sign)}</td>
                      <td>{item.strength2}</td>
                      <td className="sign">{SetSign(item.strength2_sign)}</td>
                    </tr>
                  )
                })}
                {inputs5.map((item, i) => {
                  return (
                    <tr key={i}>
                      <th>{i === 0 ? "약점/위협" : ""}</th>
                      <td>{item.weakness1}</td>
                      <td className="sign">{SetSign(item.weakness1_sign)}</td>
                      <td>{item.weakness2}</td>
                      <td className="sign">{SetSign(item.weakness2_sign)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <br />

          <div>
            <table>
              <thead>
                <tr>
                  <th colSpan="2">전략 분석</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th width="295px">강점/기회 요인</th>
                  <th width="180px">강화/활용 방안</th>
                </tr>
                {inputs6.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{item.strength}</td>
                      <td>{item.behavior1}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            &nbsp;&nbsp;

            <table>
              <thead>
                <tr>
                  <th colSpan="4">Action Plan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>실행액션</th>
                  <th>실행일시</th>
                  <th>실행자</th>
                  <th>협조자(부서)</th>
                </tr>
                {inputs8.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td width="95px">{item.action}</td>
                      <td width="74px" align="center">{item.date}</td>
                      <td width="95px">{item.owner}</td>
                      <td width="95px">{item.collaborator}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            &nbsp;&nbsp;

            <table>
              <thead>
                <tr>
                  <th colSpan="2">전략 분석</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th width="295px">약점/위협 요인</th>
                  <th width="180px">최소화/제거 방안</th>
                </tr>
                {inputs7.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{item.weakness}</td>
                      <td>{item.behavior2}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
        :
        <div className={styles.loading}>
          <CircularProgress className="progress" variant="indeterminate" />
          <br />
          Loading..
        </div>
      }
    </div>
  );
}

export default Preview;
