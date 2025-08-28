import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import TechStack from "./pages/TechStack";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useState } from "react";
import { themeContext } from "./context/ThemeContext";

function App() {
	const [theme, setTheme] = useState("light");

	return (
		<themeContext.Provider value={theme}>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home setTheme={setTheme} />} />
					<Route path='/projects' element={<Projects />} />
					<Route path='/experience' element={<Experience />} />
					<Route path='/techstack' element={<TechStack />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</themeContext.Provider>
	);
}

export default App;
