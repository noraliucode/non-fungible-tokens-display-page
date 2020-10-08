import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
	const [list, setList] = useState([]);
	const [isBottom, setIsBottom] = useState(false);
	const [offset, setOffect] = useState(0);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		fetchList();

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	useEffect(() => {
		if (isBottom) {
			const temp = offset + 20;
			fetchList(temp);
			setOffect(temp);
		}
	}, [isBottom]);

	const handleScroll = () => {
		const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
		const body = document.body;
		const html = document.documentElement;
		const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
		const windowBottom = windowHeight + window.pageYOffset;
		if (windowBottom >= docHeight - 10) {
			setIsBottom(true);
			console.log('isBottom');
		} else {
			setIsBottom(false);
			console.log('notBottom');
		}
	};

	const fetchList = (value = 0) => {
		console.log('fetchList value', value);
		fetch(`https://api.opensea.io/api/v1/assets?owner=0x960DE9907A2e2f5363646d48D7FB675Cd2892e91&offset=${value}&limit=20`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				const result = data.assets.map((item) => ({
					imageUrl: item.image_original_url,
					name: item.name,
					collectionName: item.collection.name,
					description: item.description,
					permalink: item.permalink,
				}));
				const temp = list.concat(result);
				setList(temp);
				console.log('list', list);
			});
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
