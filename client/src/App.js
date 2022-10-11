import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TGPDetail from "./routes/TGPDetail";
import TGPList from "./routes/TGPList";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	return (
		<Routes>
			<Route path="/" element={<TGPList />} />
			<Route path="/TGP/:id" element={<TGPDetail />} />
		</Routes>
	);
}

export default App;