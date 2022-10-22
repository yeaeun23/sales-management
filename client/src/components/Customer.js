import React from 'react';
import { Link } from "react-router-dom";
import CustomerDelete from './CustomerDelete';
import Button from 'react-bootstrap/Button';

function Customer(props) {
    return (
        <tr>
            <td style={{ textAlign: 'center' }} >{props.id}</td>
            <td><Link to={`/TGP/${props.id}`} style={{ display: 'block' }}>{props.name}</Link></td>
            <td style={{ textAlign: 'center' }} >{props.status}</td>
            <td style={{ textAlign: 'center' }} >{props.update_time}</td>
            <td style={{ textAlign: 'center' }} >
                <Button variant="secondary" size="sm">수정</Button>
            </td>
            <td style={{ textAlign: 'center' }} >
                <CustomerDelete stateRefresh={props.stateRefresh} id={props.id} />
            </td>
        </tr>
    );
}

export default Customer;
