import React from 'react';
import { Link } from "react-router-dom";
import CustomerDelete from './CustomerDelete';
import Button from 'react-bootstrap/Button';

class Customer extends React.Component {
    render() {
        return (
            <tr>
                <td style={{textAlign: 'center'}} >{this.props.id}</td>
                <td><Link to={`/TGP/${this.props.id}`} style={{display: 'block'}}>{this.props.name}</Link></td>
                <td style={{textAlign: 'center'}} >{this.props.status}</td>
                <td style={{textAlign: 'center'}} >{this.props.update_time}</td>
                <td style={{textAlign: 'center'}} >
                    <Button variant="secondary" size="sm">수정</Button>
                </td>
                <td style={{textAlign: 'center'}} >
                    <CustomerDelete stateRefresh={this.props.stateRefresh} id={this.props.id} />
                </td>
            </tr>
        );
    }
}

export default Customer;