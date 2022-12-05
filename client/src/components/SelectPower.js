import React, { useState } from "react";
import Form from 'react-bootstrap/Form';

function SelectPower(props) {
  const styles = {
    width: props.size === "sm" ? "57px" : "62px",
    float: "right"
  };

  const options = [
    { value: "", text: "", title: "" },
    { value: "H", text: "H", title: "High" },
    { value: "M", text: "M", title: "Middle" },
    { value: "L", text: "L", title: "Low" },
  ];

  const [selected, setSelected] = useState(props.selected);

  const handleValueChange = (e) => {
    setSelected(e.target.value);
  };

  return (
    <Form.Select
      size={props.size}
      title="파워 선택"
      style={styles}
      value={selected}
      onChange={handleValueChange}>
      {
        options.map(option => (
          <option
            key={option.value}
            value={option.value}
            title={option.title}>
            {option.text}
          </option>
        ))
      }
    </Form.Select>
  );
}

export default SelectPower;
