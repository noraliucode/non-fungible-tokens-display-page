import React from 'react';
import { BrowserRouter as Router, Switch, Route, HashRouter } from 'react-router-dom';

// import './App.css';
import ItemList from './pages/ItemList';

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={ItemList} />
			</Switch>
		</Router>
	);
}

export default App;
