import React from "react";
import Form from 'react-bootstrap/Form';

function SelectScore(props) {
  const options = [
    { value: "0" },
    { value: "+4" },
    { value: "+3" },
    { value: "+2" },
    { value: "+1" },
    { value: "-1" },
    { value: "-2" },
    { value: "-3" },
    { value: "-4" },
  ];

  let selectedValue = 0;
 
  options.map((option, i) => {
    if (option.value === props.value) 
      selectedValue = i;   
  });
  
  const styles = {
    width: props.size == "sm" ? "65px" : "70px",
    float: "right"
  };

  return (
    <Form.Select
      size={props.size}
      title="평가 선택"
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

export default SelectScore;
