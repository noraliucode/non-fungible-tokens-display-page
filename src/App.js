import React from 'react';
import { BrowserRouter as Router, Switch, Route, HashRouter } from 'react-router-dom';
import Item from './pages/Item';

// import './App.css';
import ItemList from './pages/ItemList';

function App(props) {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={ItemList} {...props} />
				<Route exact path='/item' component={Item} />
			</Switch>
		</Router>
	);
}

export default App;
