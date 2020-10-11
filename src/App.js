import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Item from './pages/Item';

// import './App.css';
import ItemList from './pages/ItemList';

function App(props) {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={ItemList} {...props} />
				<Route exact path='/item/:address/:tokenId' component={Item} {...props} />
			</Switch>
		</Router>
	);
}

export default App;
