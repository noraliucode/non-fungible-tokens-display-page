import React, { useEffect, useState } from 'react';
import '../styles/App.css';
import { Link } from 'react-router-dom';
import arrow from '../images/arrow.svg';

const Item = (props) => {
	const [item, setItem] = useState({});

	useEffect(() => {
		const { tokenId, address } = props.match.params;
		fetchList(tokenId, address);
	}, []);

	const fetchList = (tokenId, address) => {
		fetch(`https://api.opensea.io/api/v1/asset/${address}/${tokenId}`)
			.then((response) => response.json())
			.then((data) => {
				const result = {
					imageUrl: data.image_url,
					name: data.name,
					collectionName: data.collection.name,
					description: data.description,
					permalink: data.permalink,
				};
				setItem(result);
			})
			.catch((e) => console.log(e.message));
	};

	return (
		<div className={'container'}>
			<div className='item'>
				<div className='navigate'>
					<Link to='/'>
						<img src={arrow} className='arrow' alt='arrow' />
					</Link>
					<div className='item-title'>{item.name}</div>
				</div>

				<img className='item-img' src={item.imageUrl} />
				<div className='item-name'>{item.name}</div>
				<div className='description'>{item.description}</div>
			</div>
			<a href={item.permalink} target='blank'>
				<button className='button'>Permaillink</button>
			</a>
		</div>
	);
};

export default Item;
