import React, { useState } from "react";
import Form from 'react-bootstrap/Form';

function SelectSign(props) {
  const styles = {
    width: props.size === "sm" ? "60px" : "66px",
    float: "right",
    color: props.selected
  };

  const options = [
    { value: "black", text: "● Default", title: "" },
    { value: "darkgray", text: "● Gray Sign", title: "불확실" },
    { value: "red", text: "● Red Sign", title: "약점/위협 요인" },
    { value: "blue", text: "● Blue Sign", title: "강점/기회 요인" },
  ];

  const [selected, setSelected] = useState(props.selected);

  const handleValueChange = (e) => {
    setSelected(e.target.value);
    e.target.style.color = e.target.value;
  };

  return (
    <Form.Select
      size={props.size}
      title="사인 선택"
      style={styles}
      value={selected}
      onChange={handleValueChange}>
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          style={{ color: option.value }}
          title={option.title}>
          {option.text}
        </option>
      ))}
    </Form.Select>
  );
}

export default SelectSign;
