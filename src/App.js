import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
	const [list, setList] = useState([]);
	const [isBottom, setIsBottom] = useState(false);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

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

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const handleScroll = () => {
		const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
		const body = document.body;
		const html = document.documentElement;
		const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
		const windowBottom = windowHeight + window.pageYOffset;
		if (windowBottom >= docHeight) {
			setIsBottom(true);
			console.log('isBottom');
		} else {
			setIsBottom(false);
			console.log('notBottom');
		}
	};
	return (
		<div className='App'>
			<div className='container'>
				{list.map((item, index) => (
					<div className='list-item' key={`${item.name}_${index}`}>
						<img className='list-img' src={item.imageUrl} alt={'Item'} />
						<div>{item.name}</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
