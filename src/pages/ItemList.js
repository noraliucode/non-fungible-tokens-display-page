import React, { useEffect, useState } from 'react';
import '../styles/App.css';
import { Link } from 'react-router-dom';

const ItemList = () => {
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
		} else {
			setIsBottom(false);
		}
	};

	const fetchList = (value = 0) => {
		fetch(`https://api.opensea.io/api/v1/assets?owner=0x960DE9907A2e2f5363646d48D7FB675Cd2892e91&offset=${value}&limit=20`)
			.then((response) => response.json())
			.then((data) => {
				const result = data.assets.map((item) => ({
					imageUrl: item.image_url,
					name: item.name,
					tokenId: item.token_id,
					address: item.asset_contract.address,
				}));
				const temp = list.concat(result);
				setList(temp);
			})
			.catch((e) => console.log(e.message));
	};

	return (
		<div className='App'>
			<div className='container'>
				<div className='title'>NFT Collections</div>
				{list.map((item, index) => (
					<Link to={`/item/${item.address}/${item.tokenId}`} className='list-item' key={`${item.name}_${index}`}>
						<img className='list-img' src={item.imageUrl} alt={'Item'} />
						<div>{item.name}</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default ItemList;
