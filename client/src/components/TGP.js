import React from 'react';
import { Link } from "react-router-dom";
import TGPAdd from './TGPAdd';
import TGPDelete from './TGPDelete';

function TGP(props) {
	return (
		<tr>
			<td style={{ textAlign: 'center' }}>{props.tgp_id}</td>
			<td>
				<Link
					style={{ display: 'block' }}
					to={`/customer/${props.customer_id}/${props.tgp_id}`}
					state={{ tgp_name: props.name }}>
					{props.name}
				</Link>
			</td>
			<td style={{ textAlign: 'center' }}>{props.status}</td>
			<td style={{ textAlign: 'center' }}>{props.update_time}</td>
			<td style={{ textAlign: 'right' }}>
				<TGPAdd
					stateRefresh={props.stateRefresh}
					tgp_id={props.tgp_id}
					customer_id={props.customer_id}
					name={props.name}
					status_code={props.status_code}
					kind="edit" />
			</td>
			<td style={{ textAlign: 'right' }}>
				<TGPDelete
					stateRefresh={props.stateRefresh}
					tgp_id={props.tgp_id}
					name={props.name} />
			</td>
		</tr>
	);
}

export default TGP;
