import React, { useEffect, useState } from 'react';
import '../styles/App.css';

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
				console.log('data!', data);

				const result = {
					imageUrl: data.image_url,
					name: data.name,
					collectionName: data.collection.name,
					description: data.description,
					permalink: data.permalink,
				};
				setItem(result);
			});
	};

	return (
		<div className={'container'}>
			<div>{item.name}</div>
			<img calssName={'item-img'} src={item.imageUrl} />
			<div>{item.name}</div>
			<div>{item.description}</div>
		</div>
	);
};

export default Item;
