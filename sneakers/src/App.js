import Card from './components/Cards/Card'
import Header from './components/Header/Header'
import Drawer from './components/Drawer/Drawer'
import React, { useEffect, useState } from 'react'
import axios, { options, post } from 'axios'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import AppContext from './context'
import DrawerCard from './components/Drawer/DrawerCards/DrawerCard'
import Orders from './pages/Orders'

function App() {
	const [items, setItems] = useState([])
	const [isOpenDrawer, setIsOpenDrawer] = useState(false)
	const [drawerCards, setDrawerCards] = useState([])
	const [searchValue, setSearchValue] = useState('')
	const [favoriteCards, setFavoriteCards] = useState([])
	const [orderCards, setOrderCards] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const price = drawerCards.reduce((sum, curr) => sum + curr.price, 0)

	useEffect(() => {
		;(async function () {
			const mainItems = await axios.get(
				'https://652acf604791d884f1fd6097.mockapi.io/mainItems'
			)
			const drawerItems = await axios.get(
				'https://652acf604791d884f1fd6097.mockapi.io/Drawer'
			)
			const favoriteItems = await axios.get(
				'https://652fe5f06c756603295de4fc.mockapi.io/Favorite'
			)
			const orderItems = await axios.get(
				'https://652fe5f06c756603295de4fc.mockapi.io/Orders'
			)

			if (mainItems.status === 200) {
				setIsLoading(prevState => (prevState = false))
			}
			setDrawerCards(prevState => drawerItems.data)
			setFavoriteCards(prevState => favoriteItems.data)
			setOrderCards(prevState => orderItems.data)
			// new Promise(resolve => {setItems(prevState => mainItems.data)});
			setTimeout(() => setItems(prevState => mainItems.data), 0)
		})()
	}, [])

	const searchChange = event => {
		setSearchValue(prevState => event.target.value)
	}

	const onAddToDrawer = async obj => {
		console.log(obj)

		let isCopy = true
		drawerCards.forEach(item => {
			if (item.url === obj.url) isCopy = false
		})
		if (isCopy) {
			await axios.post(
				'https://652acf604791d884f1fd6097.mockapi.io/Drawer',
				obj
			)

			axios
				.get('https://652acf604791d884f1fd6097.mockapi.io/Drawer')
				.then(res => {
					setDrawerCards(prevState => res.data)
				})
			setDrawerCards(prevState => [...prevState, obj])
		} else {
			console.log(drawerCards.find(item => item.url === obj.url).id, 'objID')
			onDeleteFromDrawer(drawerCards.find(item => item.url === obj.url).id)
		}
	}

	const onDeleteFromDrawer = id => {
		console.log(drawerCards)
		console.log(id, '!_!_!_!_!_!_!')
		axios.delete(`https://652acf604791d884f1fd6097.mockapi.io/Drawer/${id}`)
		setDrawerCards(prevState => prevState.filter(item => item.id !== id))
	}
	const onDeleteFromFavorites = id => {
		console.log(id, '------')
		axios.delete(`https://652fe5f06c756603295de4fc.mockapi.io/Favorite/${id}`)
		setFavoriteCards(prevState => prevState.filter(item => item.id !== id))
	}

	const onAddToFavorite = async obj => {
		let isCopy = true
		favoriteCards.forEach(item => {
			if (item.url === obj.url) isCopy = false
		})
		if (isCopy) {
			await axios.post(
				'https://652fe5f06c756603295de4fc.mockapi.io/Favorite',
				obj
			)

			axios
				.get('https://652fe5f06c756603295de4fc.mockapi.io/Favorite')
				.then(res => {
					setFavoriteCards(prevState => res.data)
				})

			setFavoriteCards(prevState => [...prevState, obj])
		} else {
			onDeleteFromFavorites(favoriteCards.find(item => item.url === obj.url).id)
		}
	}

	const arrMapForHome = (
		isLoading
			? [...Array(12)]
			: items.filter(item =>
					item.name.toLowerCase().includes(searchValue.toLowerCase())
			  )
	).map((item, index) => (
		<Card
			key={index}
			onFavorite={onAddToFavorite}
			onAdd={onAddToDrawer}
			isLoading={isLoading}
			favorited={favoriteCards.some(obj => obj.url === item.url)}
			{...item}
		/>
	))

	const arrMapForFavorites = favoriteCards.map((item, index) => (
		<Card
			key={index}
			uniqId={item.id}
			name={item.name}
			price={item.price}
			url={item.url}
			onFavorite={onAddToFavorite}
			onAdd={onAddToDrawer}
			isAddedToFavorite={true}
		/>
	))

	let arrayForOrders = []

	const arrMapForOrders = orderCards.forEach(
		item =>
			(arrayForOrders = [
				...arrayForOrders,
				item.items.map((item, index) => (
					<Card
						key={index}
						uniqId={item.id}
						name={item.name}
						price={item.price}
						url={item.url}
						isOrder
					/>
				)),
			])
	)
	console.log(arrayForOrders)

	const arrMapForDrawer = drawerCards.map((item, index) => (
		<DrawerCard key={index} props={item} onDelete={onDeleteFromDrawer} />
	))

	const isItemAdded = url => {
		return drawerCards.some(obj => obj.url === url)
	}

	return (
		<AppContext.Provider
			value={{
				arrMapForHome,
				arrMapForFavorites,
				arrMapForDrawer,
				isItemAdded,
				setDrawerCards,
				drawerCards,
				arrayForOrders,
				setOrderCards,
			}}
		>
			<div className='wrapper'>
				{isOpenDrawer ? (
					<Drawer totalPrice={price} setIsOpenDrawer={setIsOpenDrawer} />
				) : null}
				<Header price={price} setIsOpenDrawer={setIsOpenDrawer} />
				<Routes>
					<Route
						path='/'
						element={
							<Home
								searchValue={searchValue}
								searchChange={searchChange}
								arrMap={arrMapForHome}
							/>
						}
					/>
					<Route path='/favorites' element={<Favorites />} />
					<Route path='/profile' element={<Orders />} />
				</Routes>
			</div>
		</AppContext.Provider>
	)
}

export default App
