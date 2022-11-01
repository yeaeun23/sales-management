import React from 'react';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

function SelectPower(props) {
  const styles = {
    width: props.size == "sm" ? "57px" : "62px",
    float: "right"
  };
  
  const options = [
    { value: "", text: "", title: "" },
    { value: "H", text: "H", title: "High" },
    { value: "M", text: "M", title: "Middle" },
    { value: "L", text: "L", title: "Low" },
  ];

  const [selected, setSelected] = useState(options[0].value);

  const handleValueChange = (e) => {
    e.target.style.color = e.target.value;
    setSelected(e.target.value);
  };

  return (
    <Form.Select size={props.size} title="파워 선택" style={styles} value={selected} onChange={handleValueChange}>
      {options.map(option => (
        <option key={option.value} value={option.value} style={{ color: option.value }} title={option.title}>
          {option.text}
        </option>
      ))}
    </Form.Select>
  );
}

export default SelectPower;
