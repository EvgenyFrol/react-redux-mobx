import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import PageReact from './components/PageReact';
import PageMobx from './components/PageMobx';
import './App.css';

const App: React.FC = () => {
	return (
		<Router>
			<div>
				<Navbar />
				<Switch>
					{/* <Route path="/about">
            <About />
          </Route> */}
					<Route path="/pageredux">
						<PageReact />
					</Route>
					<Route path="/pagemobx">
						<PageMobx />
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
