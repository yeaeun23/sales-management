import React from 'react';
import { Link } from "react-router-dom";
import TGPDelete from './TGPDelete';
import Button from 'react-bootstrap/Button';

function TGP(props) {
    return (
        <tr>
            <td style={{ textAlign: 'center' }} >{props.tgp_id}</td>
            <td>
                <Link to={`/customer/${props.customer_id}/${props.tgp_id}`} style={{ display: 'block' }}>{props.name}</Link>
            </td>
            <td style={{ textAlign: 'center' }} >{props.status}</td>
            <td style={{ textAlign: 'center' }} >{props.update_time}</td>
            <td style={{ textAlign: 'center' }} >
                <Button variant="secondary" size="sm">전체 보기</Button>
            </td>
            <td style={{ textAlign: 'center' }} >
                <TGPDelete stateRefresh={props.stateRefresh} customer_id={props.customer_id} tgp_id={props.tgp_id} name={props.name} />
            </td>
        </tr>
    );
}

export default TGP;
