import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TGPList from "./routes/TGPList";
import TGPDetail from "./routes/TGPDetail";
import CustomerList from "./routes/CustomerList";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	return (
		<Routes>
			<Route path="/" element={<CustomerList />} />
			<Route path="/customer/:customer_id" element={<TGPList />} />
			<Route path="/customer/:customer_id/:tgp_id" element={<TGPDetail />} />
		</Routes>
	);
}

export default App;
