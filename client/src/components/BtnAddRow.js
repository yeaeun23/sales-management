import React from 'react';
import Button from 'react-bootstrap/Button';

function BtnAddRow(props) {
    return (
        <Button
            className="btnAddRow"
            variant="secondary"
            size={props.size}
            title="행 추가"
            onClick={props.handleClick}>
            +
        </Button>
    );
}

export default BtnAddRow;
