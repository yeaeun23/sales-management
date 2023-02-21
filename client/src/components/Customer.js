import React from 'react';
import { Link } from "react-router-dom";
import CustomerAdd from './CustomerAdd';
import CustomerDelete from './CustomerDelete';

function Customer(props) {
	return (
		<tr>
			<td style={{ textAlign: 'center' }}>{props.customer_id}</td>
			<td style={{ textAlign: 'center' }}>{props.make_time}</td>
			<td>
				<Link
					style={{ display: 'block' }}
					to={`/${props.customer_id}`}
					state={{ customer_name: props.name }}>
					{props.name}
				</Link>
			</td>
			<td style={{ textAlign: 'right' }}>{props.amount === "null" ? "-" : props.amount}</td>
			<td style={{ textAlign: 'right' }}>{props.amount === "null" ? "-" : props.amount}</td>
			<td colSpan="2" style={{ textAlign: 'right' }}>
				<CustomerAdd
					stateRefresh={props.stateRefresh}
					customer_id={props.customer_id}
					name={props.name}
					status_code={props.status_code}
					kind="edit" />
				&nbsp;&nbsp;
				<CustomerDelete
					stateRefresh={props.stateRefresh}
					customer_id={props.customer_id}
					name={props.name} />
			</td>
		</tr>
	);
}

export default Customer;
