import Landing from '../src/components/Landing/Landing.jsx';
import Home from '../src/components/Home/Home.jsx';
import Detail from '../src/components/Detail/Detail.jsx';
import Form from '../src/components/Form/Form.jsx';
import NavBar from '../src/components/NavBar/NavBar.jsx';
import { Route, Routes, useLocation } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from './utils/serverEndpoints.js';
axios.defaults.baseURL = BASE_URL;

function App() {
	const currentLocation = useLocation();

	return (
		<>
			{currentLocation.pathname !== '/' && <NavBar />}
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/countries" element={<Home />} />
				<Route path="/countries/:id" element={<Detail />} />
				<Route path="/activity/create" element={<Form />} />
			</Routes>
		</>
	);
}

export default App;
