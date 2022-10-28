import React from 'react';
import Button from 'react-bootstrap/Button';

function LineDelete(props) {
    return (
        <Button
            className="deleteRowBtn"
            variant="light"
            size={props.size}
            title="행 삭제"
            style={{ display: 'none' }}>
            ×
        </Button>
    );
}

export default LineDelete;
