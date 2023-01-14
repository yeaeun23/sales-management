import React from "react";
import Form from 'react-bootstrap/Form';

function SelectRole(props) {
  const options = [
    { value: "" },
    { value: "TDM" },
    { value: "FDM" },
    { value: "UDM" },
    { value: "HELPER" }
  ];

  let selectedValue = 0;

  options.map((option, i) => {
    if (option.value === props.value)
      selectedValue = i;
  });

  const styles = {
    width: props.size === "sm" ? "95px" : "105px",
    float: "right"
  };

  return (
    <Form.Select
      size={props.size}
      title="역할 선택"
      style={styles}
      name={props.name}
      value={props.value}
      onChange={props.handleValueChange}>
      {
        options.map(option => (
          <option
            key={option.value}
            value={option.value}>
            {option.value}
          </option>
        ))
      }
    </Form.Select>
  );
}

export default SelectRole;
