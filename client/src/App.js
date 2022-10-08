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
			{/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
		</Routes>
	);
}

export default App;