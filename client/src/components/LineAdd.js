import React from 'react';
import Button from 'react-bootstrap/Button';

function LineAdd(props) {
    const handleAddClick = (e) => {
        let T = e.currentTarget.closest('table tbody');
        let R = e.currentTarget.closest('tr');
        let C = R.cloneNode(true);

        // 추가->삭제 버튼
        C.querySelector('.addRowBtn').style.display = 'none';
        C.querySelector('.deleteRowBtn').style.display = 'block';
        C.querySelector('.deleteRowBtn').addEventListener('click', handleDeleteClick);

        // input 초기화
        [...C.getElementsByTagName('input')].forEach(element => {
            element.value = null;
        });

        // th 초기화
        if (C.getElementsByTagName('th')[0] != null) {
            C.getElementsByTagName('th')[0].textContent = "";
        }

        T.appendChild(C);
    };

    const handleDeleteClick = (e) => {
        e.currentTarget.closest("tr").remove();
    };

    return (
        <Button
            className="addRowBtn"
            variant="secondary"
            size={props.size}
            title="행 추가"
            onClick={handleAddClick}
            style={{ display: 'block' }}>
            +
        </Button>
    );
}

export default LineAdd;
