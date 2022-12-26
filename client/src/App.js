import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CustomerList from "./routes/CustomerList";
import TGPList from "./routes/TGPList";
import TGPDetail from "./routes/TGPDetail";
import TGPDetail1 from "./routes/TGPDetail1";
import TGPDetail2 from "./routes/TGPDetail2";
import TGPDetail3 from "./routes/TGPDetail3";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	const inputSize = "sm";

	return (
		<Routes>
			<Route path="/" element={<CustomerList />} />
			<Route path="/customer/:customer_id" element={<TGPList />} />

			<Route path="/customer/:customer_id/:tgp_id" element={<TGPDetail inputSize={inputSize} />} />
			<Route path="/customer/:customer_id/:tgp_id/1" element={<TGPDetail1 inputSize={inputSize} />} />
			<Route path="/customer/:customer_id/:tgp_id/2" element={<TGPDetail2 inputSize={inputSize} />} />
			<Route path="/customer/:customer_id/:tgp_id/3" element={<TGPDetail3 inputSize={inputSize} />} />
		</Routes>
	);
}

export default App;
