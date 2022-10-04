import React from 'react';
import { Link } from "react-router-dom";
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CustomerDelete from './CustomerDelete';

class Customer extends React.Component {
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                {/* <TableCell><img src={this.props.image} alt="profile"/></TableCell> */}
                <TableCell><Link to={`/TGP/${this.props.id}`}>{this.props.name}</Link></TableCell>
                <TableCell>{this.props.birthday}</TableCell>
                <TableCell>{this.props.gender}</TableCell>
                <TableCell>{this.props.job}</TableCell>
                <TableCell>
                    <CustomerDelete stateRefresh={this.props.stateRefresh} id={this.props.id} />
                </TableCell>
            </TableRow>
        );
    }
}

export default Customer;