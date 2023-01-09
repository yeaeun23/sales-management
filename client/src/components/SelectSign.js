import React from "react";
import Form from 'react-bootstrap/Form';

function SelectSign(props) {
  const options = [
    { value: "", color: "black", text: "● Default", title: "" },
    { value: "G", color: "darkgray", text: "● Gray Sign", title: "불확실" },
    { value: "R", color: "red", text: "● Red Sign", title: "약점/위협 요인" },
    { value: "B", color: "blue", text: "● Blue Sign", title: "강점/기회 요인" },
  ];

  let selectedValue = 0;
 
  options.map((option, i) => {
    if (option.value === props.value) 
      selectedValue = i;   
  });

  const styles = {
    width: props.size === "sm" ? "60px" : "65px",
    color: options[selectedValue].color,
    float: "right"
  };

  return (
    <Form.Select
      size={props.size}
      title="사인 선택"
      style={styles}
      name={props.name}
      value={props.value}
      onChange={props.handleValueChange}>
      {
        options.map(option => (
          <option
            key={option.value}
            value={option.value}
            style={{ color: option.color }}
            title={option.title}>
            {option.text}
          </option>
        ))
      }
    </Form.Select>
  );
}

export default SelectSign;
