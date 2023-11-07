const images = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15]
const cards = []
let flippedCards = []
const modal = document.querySelector('.modal')
modal.addEventListener('click',init)


const gameState = {
	canFlip: false,
	acertos: 0
}

for(let i = 0; i < images.length; i++){
	const card = document.createElement('div')
	card.classList.add('card')
	
	const faceFront = newFace('front')
	card.appendChild(faceFront)
	
	const faceBack = newFace('back')
	card.appendChild(faceBack)
	
	document.querySelector('.game').appendChild(card)
	
	card.addEventListener('click',clickHandler)
	
	cards.push(card)
}

function newFace(className){
	const face = document.createElement('div')
	face.classList.add('face')
	face.classList.add('flipped')
	face.classList.add(className)
	
	return face
}

function init(){
	modal.style.opacity = 0
	modal.style.zIndex = -1
	modal.removeEventListener('click',init)
	gameState.acertos = 0
	gameState.canFlip = false
	const randomNumbers = createRandomNumbers(images.length)
	
	cards.forEach((card, i)=>{
		const id = images[randomNumbers[i]]
		card.setAttribute("id",id);
		card.childNodes[0].style.backgroundImage = `url('./img/${id}.png')`
		flippedCards.push(card)
		card.childNodes[0].classList.add('flipped')
		card.childNodes[1].classList.add('flipped')
	})
	
	setTimeout(()=>{
		clearFlippedCards()
		gameState.canFlip = true
	},1500)
}

function clickHandler(){
	if(gameState.canFlip && flippedCards.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('checked')){
		this.classList.add('flipped')
		
		gameState.canFlip = false
		setTimeout(()=> gameState.canFlip = true,1000)
		
		this.childNodes[0].classList.add('flipped')
		this.childNodes[1].classList.add('flipped')
		
		flippedCards.push(this)
	}
	
	if(flippedCards.length === 2){
		if(flippedCards[0].id === flippedCards[1].id){
			markCheckedCards()
			if(gameState.acertos === images.length/2){
				setTimeout(gameOver,1000)
			}
		} else {
			setTimeout(clearFlippedCards,1000)
		}
	}
}

function markCheckedCards(){
	gameState.acertos++
	
	flippedCards.forEach((card)=>{
		card.classList.add('checked')
		card.childNodes[0].classList.add('checked')
		card.childNodes[1].classList.add('checked')
	})
	
	clearFlippedCards()
}

function clearFlippedCards(){
	flippedCards.forEach((card)=>{
		card.classList.remove('flipped')
		card.childNodes[0].classList.remove('flipped')
		card.childNodes[1].classList.remove('flipped')
	})
	
	flippedCards = []
}

function gameOver(){
	modal.style.opacity = 1
	modal.style.zIndex = 2
	modal.addEventListener('click',init)
	
	cards.forEach((card)=>{
		card.classList.remove('checked')
		card.childNodes[0].classList.remove('checked')
		card.childNodes[1].classList.remove('checked')
	})
}

function createRandomNumbers(max){
	const newArray = []
	
	while(newArray.length < max){
		let min = 0
		const num = Math.floor(Math.random() * (max - min)) + min
	
		if(newArray.indexOf(num) < 0){
			newArray.push(num)
			min++
		}
	}
	
	return newArray
}
