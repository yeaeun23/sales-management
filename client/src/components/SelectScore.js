import React from 'react';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

function SelectScore(props) {
  const styles = {
    width: props.size == "sm" ? "62px" : "68px",
    float: "right"
  };

  const options = [
    { value: "0", text: "0", title: "" },
    { value: "4", text: "+4", title: "" },
    { value: "3", text: "+3", title: "" },
    { value: "2", text: "+2", title: "" },
    { value: "1", text: "+1", title: "" },
    { value: "-1", text: "-1", title: "" },
    { value: "-2", text: "-2", title: "" },
    { value: "-3", text: "-3", title: "" },
    { value: "-4", text: "-4", title: "" },
  ];

  const [selected, setSelected] = useState(options[0].value);

  const handleValueChange = (e) => {
    e.target.style.color = e.target.value;
    setSelected(e.target.value);
  };

  return (
    <Form.Select size={props.size} title="평가 선택" style={styles} value={selected} onChange={handleValueChange}>
      {options.map(option => (
        <option key={option.value} value={option.value} style={{ color: option.value }} title={option.title}>
          {option.text}
        </option>
      ))}
    </Form.Select>
  );
}

export default SelectScore;
