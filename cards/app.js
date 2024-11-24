let flag = false
const el = document.querySelector('nraw')
function like(el) {
	if (!flag) {
		el.style.backgroundColor = '#F87575'
		flag = true
	} else {
		el.style.backgroundColor = '#D1D1D1'
		flag = false
	}
}

function genrate() {
	// Очистить старый ввод
	document.querySelector('#capcha').value = ''
	// Доступ к элементу для сохранения
	// сгенерированная капча

	let uniquechar1, uniquechar2

	for (let i = 1; i < 5; i++) {
		uniquechar1 = Math.round(Math.random() * 10)
		uniquechar2 = Math.round(Math.random() * 10)
	}
	// Сохранить сгенерированный ввод
	document.getElementById('firstNumber').innerHTML = uniquechar1
	document.getElementById('secondNumber').innerHTML = uniquechar2
	let sum = uniquechar1 + uniquechar2
}

function printmsg() {
	document.querySelector('#capcha').value = ''
	// Доступ к элементу для сохранения
	// сгенерированная капча

	let uniquechar1, uniquechar2

	for (let i = 1; i < 5; i++) {
		uniquechar1 = Math.round(Math.random() * 10)
		uniquechar2 = Math.round(Math.random() * 10)
	}
	// Сохранить сгенерированный ввод
	document.getElementById('firstNumber').innerHTML = uniquechar1
	document.getElementById('secondNumber').innerHTML = uniquechar2
	let sum = uniquechar1 + uniquechar2

	const usr_input = document.getElementById('capcha')

	if (Number(usr_input) == sum) {
		let s = (document.querySelector('#key').innerHTML = 'Соответствует')
		alert('good')
		genrate()
	} else {
		let s = (document.querySelector('#key').innerHTML = 'не соответствует')
		alert('bad')
		genrate()
	}
}
