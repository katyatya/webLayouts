import drawer from './Drawer.module.scss'
import { useContext, useState } from 'react'
import AppContext from '../../context'
import Info from '../Info/Info'
import axios from 'axios'

const delay = ms => {
	return new Promise(resolve => setTimeout(resolve, ms))
}

const Drawer = ({ totalPrice, setIsOpenDrawer }) => {
	//Фильтрованный массив элементов корзины из контекста, установщик стейта элементов корзины из контекста, сами элементы корзины, установщик стейта массива покупок
	const { arrMapForDrawer, setDrawerCards, drawerCards, setOrderCards } =
		useContext(AppContext)

	const [isOrderComplete, setIsOrderComplete] = useState(false)

	const [isLoading, setIsLoading] = useState(false)

	const [countOfOrder, setCountOfOrder] = useState(0)

	const onClickToCompleteOrder = async () => {
		setIsLoading(prevState => (prevState = true))
		try {
			const { data } = await axios.post(
				'https://652fe5f06c756603295de4fc.mockapi.io/Orders',
				{
					items: drawerCards,
				}
			)

			axios
				.get('https://652fe5f06c756603295de4fc.mockapi.io/Orders')
				.then(res => setOrderCards(prevState => res.data))

			setIsOrderComplete(prevState => (prevState = true))

			setDrawerCards(prevState => (prevState = []))

			setCountOfOrder(prevState => (prevState = data.id))

			for (let i = 0; i < drawerCards.length; i++) {
				await axios.delete(
					`https://652acf604791d884f1fd6097.mockapi.io/Drawer/${drawerCards[i].id}`
				)
				await delay(100)
			}
		} catch (e) {
			alert(`Не удалось создать заказ ${e}`)
		}

		setIsLoading(prevState => (prevState = false))
	}

	const onCloseDrawer = () => {
		setIsOpenDrawer(prevState => !prevState)
		document.querySelector('body').style.overflow = 'auto'
	}
	return (
		<div className={drawer.drawerOverlay}>
			<div className={drawer.drawer}>
				<div className={drawer.drawer__inner}>
					{arrMapForDrawer.length === 0 ? (
						<Info
							onCloseDrawer={onCloseDrawer}
							isOrderComplete={isOrderComplete}
							title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пуста'}
							description={
								isOrderComplete
									? `Ваш заказ #${countOfOrder} скоро будет передан курьерской доставке`
									: 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
							}
							url={
								isOrderComplete
									? '/image/order-complete.svg'
									: '/image/emptyBox.svg'
							}
						/>
					) : (
						<>
							<div className={drawer.drawer__title}>
								<h2>Корзина</h2>
								<img
									src='/image/delete.svg'
									alt='CloseDrawer'
									onClick={onCloseDrawer}
								/>
							</div>
							<div className={drawer.drawerCards}>{arrMapForDrawer}</div>
							<div className={drawer.drawerTotalPrice}>
								<div>
									<span>Итого: </span>
									<div></div>
									<span>{totalPrice} руб.</span>
								</div>
								<div>
									<span>Налог 5%: </span>
									<div></div>
									<span>{totalPrice / 20} руб. </span>
								</div>
								<button onClick={onClickToCompleteOrder} disabled={isLoading}>
									Оформить заказ
									<img src='/image/arrow.svg' alt='arrow' />
								</button>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default Drawer
