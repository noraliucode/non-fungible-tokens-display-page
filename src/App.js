import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
	const [list, setList] = useState([]);

	useEffect(() => {
		fetch('https://api.opensea.io/api/v1/assets?owner=0x960DE9907A2e2f5363646d48D7FB675Cd2892e91&offset=0&limit=20')
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				const list = data.assets.map((item) => ({
					imageUrl: item.image_original_url,
					name: item.name,
					collectionName: item.collection.name,
					description: item.description,
					permalink: item.permalink,
				}));
				setList(list);
				console.log('list', list);
			});
	}, []);
	return (
		<div className='App'>
			<div className='container'>
				{list.map((item, index) => (
					<div key={`${item.name}_${index}`}>
						<img className='listImg' src={item.imageUrl} alt={'Item'} />
						<div>{item.name}</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
