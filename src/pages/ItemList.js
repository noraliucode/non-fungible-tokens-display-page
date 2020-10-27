import React, { useEffect, useState } from 'react';
import '../styles/App.css';
import { Link } from 'react-router-dom';
import getWeb3 from '../ethereum/getWeb3';

const ItemList = () => {
	const [list, setList] = useState([]);
	const [isBottom, setIsBottom] = useState(false);
	const [offset, setOffect] = useState(0);
	const [accounts, setAccounts] = useState([]);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		const _getAccount = async () => await getAccount();
		_getAccount().then((result) => {
			fetchList(0, result);
		});

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	useEffect(() => {
		if (isBottom) {
			const temp = offset + 20;
			fetchList(temp, accounts);
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

	const fetchList = (value = 0, _accounts, isCleanList) => {
		const owner = _accounts ? _accounts[0] : '0x960DE9907A2e2f5363646d48D7FB675Cd2892e91';
		fetch(`https://api.opensea.io/api/v1/assets?owner=${owner}&offset=${value}&limit=20`)
			.then((response) => response.json())
			.then((data) => {
				const result = data.assets.map((item) => ({
					imageUrl: item.image_url,
					name: item.name,
					tokenId: item.token_id,
					address: item.asset_contract.address,
				}));
				const _list = isCleanList ? [] : list;
				const temp = _list.concat(result);
				setList(temp);
			})
			.catch((e) => console.log(e.message));
	};

	const getAccount = async () => {
		try {
			// Get network provider and web3 instance.
			const web3 = await getWeb3();
			// Use web3 to get the user's accounts.
			const accounts = await web3.eth.getAccounts();
			console.log('accounts', accounts);
			setAccounts(accounts);
			return accounts;
		} catch (error) {
			// Catch any errors for any of the above operations.
			alert(`Failed to load web3, accounts, or contract. Check console for details.`);
			console.error(error);
		}
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
				{list.length <= 1 && (
					<div className='description-index'>
						The NFT collections seems less than 1 in account you choose, use other account instead?{' '}
						<button
							className='button-index'
							onClick={() => {
								fetchList(0, null, true);
							}}
						>
							Use other account
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default ItemList;
