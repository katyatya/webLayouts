import cardStyles from './Card.module.scss'
import { useContext, useEffect, useState } from 'react'
import ContentLoader from 'react-content-loader'
import AppContext from '../../context'

const Card = ({
	name,
	price,
	url,
	onAdd,
	onFavorite,
	isAddedToFavorite = false,
	isLoading,
	favorited,
	isOrder,
}) => {
	//Функция для проверки присутствия товара с определенным юрлом в корзине
	const { isItemAdded } = useContext(AppContext)
	//Если в корзине не найдется объекта с юрлом как у данной карточки, то иконка "добавлена в корзину" не отобразится
	const [isAdded, setIsAdded] = useState(isItemAdded(url))

	//При каждом изменении функции isItemAdded из контекста , мы меняем стейт
	useEffect(() => setIsAdded(isItemAdded(url)), [isItemAdded(url)])

	//стейт для отображения закладки
	const [isFavorite, setIsFavorite] = useState(favorited)

	const imgAddSrc = isAdded ? 'added.svg' : 'add.svg'

	const imgFavSrc = isAddedToFavorite
		? 'liked.svg'
		: isFavorite
		? 'liked.svg'
		: 'unliked.svg'

	const changeAddIcon = () => {
		onAdd({ name, price, url })
		setIsAdded(prev => !prev)
	}

	const changeFavoriteIcon = () => {
		onFavorite({ name, price, url })
		setIsFavorite(prev => !prev)
	}

	return (
		<div className={cardStyles.card}>
			{isLoading ? (
				<ContentLoader
					speed={2}
					width={150}
					height={200}
					viewBox='0 0 150 200'
					backgroundColor='#f3f3f3'
					foregroundColor='#ecebeb'
				>
					<rect x='1' y='116' rx='10' ry='10' width='150' height='15' />
					<rect x='1' y='137' rx='10' ry='10' width='93' height='15' />
					<rect x='118' y='168' rx='10' ry='10' width='32' height='32' />
					<rect x='1' y='174' rx='10' ry='10' width='80' height='24' />
					<rect x='1' y='12' rx='10' ry='10' width='150' height='93' />
				</ContentLoader>
			) : (
				<>
					<div className={cardStyles.like}>
						<img
							style={isOrder ? { display: 'none', cursor: 'default' } : {}}
							src={'/image/' + imgFavSrc}
							alt='will u get like it?'
							onClick={changeFavoriteIcon}
						/>
					</div>
					<img src={url} alt='url' />
					<p>{name}</p>
					<div className={cardStyles.cardPrice}>
						<div
							onClick={() => console.log(cardStyles.cardPrice)}
							className={cardStyles.cardPrice__info}
						>
							<p>Цена:</p>
							<span>{price + ' руб.'}</span>
						</div>
						<img
							style={isOrder ? { display: 'none', cursor: 'default' } : {}}
							src={'/image/' + imgAddSrc}
							alt='will add?'
							onClick={changeAddIcon}
						/>
					</div>
				</>
			)}
		</div>
	)
}

export default Card
