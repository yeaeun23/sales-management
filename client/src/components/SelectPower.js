import React from "react";
import Form from 'react-bootstrap/Form';

function SelectPower(props) {
  const options = [
    { value: "", title: "" },
    { value: "H", title: "High" },
    { value: "M", title: "Middle" },
    { value: "L", title: "Low" },
  ];
  const styles = {
    width: props.size === "sm" ? "60px" : "65px",
    float: "right"
  };

  return (
    <Form.Select
      size={props.size}
      title="파워 선택"
      style={styles}
      name={props.name}
      value={props.value}
      onChange={props.handleValueChange}>
      {
        options.map(option => (
          <option
            key={option.value}
            value={option.value}
            title={option.title}>
            {option.value}
          </option>
        ))
      }
    </Form.Select>
  );
}

export default SelectPower;
