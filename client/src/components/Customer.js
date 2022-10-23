import React from 'react';
import { Link } from "react-router-dom";
import CustomerDelete from './CustomerDelete';
import Button from 'react-bootstrap/Button';

function Customer(props) {
    return (
        <tr>
            <td style={{ textAlign: 'center' }} >{props.customer_id}</td>
            <td>
                <Link style={{ display: 'block' }} to={`/customer/${props.customer_id}`}>{props.name}</Link>
            </td>
            <td style={{ textAlign: 'center' }} >{props.status}</td>
            <td style={{ textAlign: 'center' }} >{props.update_time}</td>
            <td style={{ textAlign: 'center' }} >
                <Button variant="secondary" size="sm">수정</Button>
            </td>
            <td style={{ textAlign: 'center' }} >
                <CustomerDelete stateRefresh={props.stateRefresh} customer_id={props.customer_id} name={props.name} />
            </td>
        </tr>
    );
}

export default Customer;
