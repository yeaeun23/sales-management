import React from 'react';
import Button from 'react-bootstrap/Button';

function BtnDeleteRow(props) {
    return (
        <Button
            className="btnDeleteRow"
            variant="light"
            size={props.size}
            title="행 삭제"
            onClick={props.handleClick}>
            ×
        </Button>
    );
}

export default BtnDeleteRow;
