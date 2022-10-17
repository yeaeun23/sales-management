import React from 'react';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';

function LineAdd(props) {
    const handleClick = event => {
        //console.log(event.target.value);
        //event.target.style.color = event.target.value;
    };

    return (
        <Button
            variant="secondary"
            size={props.size}
            title="행 추가"
            className="plusBtn"
            style={{ float: 'right'}}
            onChange={handleClick}>
            +
        </Button>
    );
}

export default LineAdd;
