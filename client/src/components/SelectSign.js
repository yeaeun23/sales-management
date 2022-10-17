import React from 'react';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

function SelectSign(props) {
  const styles = {
    width: props.size == "sm" ? "60px" : "66px",
    float: "right"
  };

  const options = [
    { value: "black", text: "● Default", title: "" },
    { value: "darkgray", text: "● Gray Sign", title: "불확실" },
    { value: "red", text: "● Red Sign", title: "위협/약점 요인" },
    { value: "blue", text: "● Blue Sign", title: "기회/강점 요인" },
  ];

  const [selected, setSelected] = useState(options[0].value);

  const handleChange = event => {
    //console.log(event.target.value);
    event.target.style.color = event.target.value;
    setSelected(event.target.value);
  };

  return (
    <Form.Select size={props.size} title="사인 선택" style={styles} value={selected} onChange={handleChange}>
      {options.map(option => (
        <option key={option.value} value={option.value} style={{ color: option.value }} title={option.title}>
          {option.text}
        </option>
      ))}
    </Form.Select>
  );
}

export default SelectSign;
