import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from "./routes/Login";
import CustomerList from "./routes/CustomerList";
import TGPList from "./routes/TGPList";
import TGPDetail from "./routes/TGPDetail";
import TGPDetail1 from "./routes/TGPDetail1";
import TGPDetail2 from "./routes/TGPDetail2";
import TGPDetail3 from "./routes/TGPDetail3";
import Preview from "./routes/Preview";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	const inputSize = "sm";

	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/" element={<CustomerList inputSize={inputSize} />} />
			<Route path="/:customer_id" element={<TGPList inputSize={inputSize} />} />

			<Route path="/:customer_id/:tgp_id" element={<TGPDetail inputSize={inputSize} />} />
			<Route path="/:customer_id/:tgp_id/:form_id/step1" element={<TGPDetail1 inputSize={inputSize} />} />
			<Route path="/:customer_id/:tgp_id/:form_id/step2" element={<TGPDetail2 inputSize={inputSize} />} />
			<Route path="/:customer_id/:tgp_id/:form_id/step3" element={<TGPDetail3 inputSize={inputSize} />} />
			<Route path="/:customer_id/:tgp_id/:form_id/preview" element={<Preview />} />
		</Routes>
	);
}

export default App;
