var mainPosterImg = document.querySelector('.poster-img')
var posterTitle = document.querySelector('.poster-title')
var posterQuote = document.querySelector('.poster-quote')
var showFormBtn = document.querySelector('.show-form')
var mainPoster = document.querySelector('.main-poster')
var posterForm = document.querySelector('.poster-form')
var showSaved = document.querySelector('.show-saved')
var savedPosterPage = document.querySelector('.saved-posters')
var backToMain = document.querySelector('.back-to-main')
var showMain = document.querySelector('.show-main')
var posterImgInput = document.querySelector('#poster-image-url')
var posterTitleInput = document.querySelector('#poster-title')
var posterQuoteInput = document.querySelector('#poster-quote')
var makePosterBtn = document.querySelector('.make-poster')
var savePosterBtn = document.querySelector('.save-poster')
var savedPosterGrid = document.querySelector('.saved-posters-grid')
var showRandomBtn = document.querySelector('.show-random')

var images = [
  "./assets/bees.jpg",
  "./assets/bridge.jpg",
  "./assets/butterfly.jpg",
  "./assets/cliff.jpg",
  "./assets/elephant.jpg",
  "./assets/flock.jpg",
  "./assets/fox.jpg",
  "./assets/frog.jpg",
  "./assets/horse.jpg",
  "./assets/lion.jpg",
  "./assets/mountain.jpg",
  "./assets/pier.jpg",
  "./assets/puffins.jpg",
  "./assets/pug.jpg",
  "./assets/runner.jpg",
  "./assets/squirrel.jpg",
  "./assets/tiger.jpg",
  "./assets/turtle.jpg"
];

var titles = [
  "determination",
  "success",
  "inspiration",
  "perspiration",
  "grit",
  "empathy",
  "feelings",
  "hope",
  "believe",
  "try",
  "conviction",
  "accomplishment",
  "achievement",
  "ambition",
  "clarity",
  "challenge",
  "commitment",
  "confidence",
  "action",
  "courage",
  "focus",
  "breathe",
  "gratitude",
  "imagination",
  "kindness",
  "mindfulness",
  "knowledge",
  "opportunity",
  "passion",
  "patience",
  "practice",
  "smile",
  "trust",
  "understanding",
  "wisdom"
];

var quotes = [
  "Don’t downgrade your dream just to fit your reality, upgrade your conviction to match your destiny.",
  "You are braver than you believe, stronger than you seem and smarter than you think.",
  "You are confined only by the walls you build yourself.",
  "The one who has confidence gains the confidence of others.",
  "Act as if what you do makes a difference. It does.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Never bend your head. Always hold it high. Look the world straight in the eye.",
  "What you get by achieving your goals is not as important as what you become by achieving your goals.",
  "Believe you can and you're halfway there.",
  "When you have a dream, you've got to grab it and never let go.",
  "I can't change the direction of the wind, but I can adjust my sails to always reach my destination.",
  "No matter what you're going through, there's a light at the end of the tunnel.",
  "It is our attitude at the beginning of a difficult task which, more than anything else, will affect its successful outcome.",
  "Life is like riding a bicycle. To keep your balance, you must keep moving.",
  "Just don't give up trying to do what you really want to do. Where there is love and inspiration, I don't think you can go wrong.",
  'Limit your "always" and your "nevers."',
  "You are never too old to set another goal or to dream a new dream.",
  "Try to be a rainbow in someone else's cloud.",
  "You do not find the happy life. You make it.",
  "Inspiration comes from within yourself. One has to be positive. When you're positive, good things happen.",
  "Sometimes you will never know the value of a moment, until it becomes a memory.",
  "The most wasted of days is one without laughter.",
  "You must do the things you think you cannot do.",
  "It isn't where you came from. It's where you're going that counts.",
  "It is never too late to be what you might have been.",
  "Happiness often sneaks in through a door you didn't know you left open.",
  "We must be willing to let go of the life we planned so as to have the life that is waiting for us.",
  "Never limit yourself because of others’ limited imagination; never limit others because of your own limited imagination.",
  "Be the change that you wish to see in the world.",
  "Let us make our future now, and let us make our dreams tomorrow's reality.",
  "You don't always need a plan. Sometimes you just need to breathe, trust, let go, and see what happens.",
  "If I cannot do great things, I can do small things in a great way.",
  "Don't wait. The time will never be just right.",
  "With the right kind of coaching and determination you can accomplish anything.",
  "If you have good thoughts they will shine out of your face like sunbeams and you will always look lovely.",
  "No matter what people tell you, words and ideas can change the world.",
  "Each person must live their life as a model for others.",
  "A champion is defined not by their wins but by how they can recover when they fall."
];

var savedPosters = [
  makePoster(
    "https://i.giphy.com/media/5LU6ZcEGBbhVS/giphy.gif",
    "Optimism",
    "Keep a joyful heart!"
  )
];

var currentPoster;

window.addEventListener('load', initialRandomPoster)
showFormBtn.addEventListener('click', displayPosterForm)
showSaved.addEventListener('click', displaySavedPosterPage)
backToMain.addEventListener('click', returnToMain)
showMain.addEventListener('click', returnToMain)
makePosterBtn.addEventListener('click', makePosterHandler)
savePosterBtn.addEventListener('click', savePoster)
savedPosterGrid.addEventListener('dblclick', deleteSavedPoster)
showRandomBtn.addEventListener('click', initialRandomPoster)
mainPosterImg.addEventListener('click', changeImage)
posterTitle.addEventListener('click', changeTitle)
posterQuote.addEventListener('click', changeQuote)


function changeImage() {
  var imgSrc = images[getRandomIndex(images)]
  var title = currentPoster.title
  var quote = currentPoster.quote
  currentPoster = new Poster(imgSrc, title, quote)
  setPoster()
}

function changeQuote() {
  var imgSrc = currentPoster.imageURL
  var title = currentPoster.title
  var quote = quotes[getRandomIndex(quotes)]
  currentPoster = new Poster(imgSrc, title, quote)
  setPoster()
}

function changeTitle() {
  var imgSrc = currentPoster.imageURL
  var title = titles[getRandomIndex(titles)]
  var quote = currentPoster.quote
  currentPoster = new Poster(imgSrc, title, quote)
  setPoster()
}

function clearFormInputs() {
	posterImgInput.value = ''
	posterTitleInput.value = ''
	posterQuoteInput.value = ''
}

function createAPoster(imgSrc, title, quote) {
  currentPoster = new Poster(imgSrc, title, quote)
  images.push(imgSrc)
  titles.push(title)
  quotes.push(quote)
  posterTitle.innerText = title
  posterQuote.innerText = quote
  mainPosterImg.setAttribute('src', imgSrc)
  returnToMain()
  clearFormInputs()
}

function deleteSavedPoster(e) {
  var posterToDelete = e.target.closest('.mini-poster')
  savedPosters = savedPosters.filter(poster => poster.id != posterToDelete.dataset.id)
  displaySavedPoster()
}

function displayPosterForm() {
  mainPoster.classList.add('hidden')
  posterForm.classList.remove('hidden')
}

function displaySavedPoster() {
  savedPosterGrid.innerText = ''
  for (var i = 0; i < savedPosters.length; i++) {
    savedPosterGrid.insertAdjacentHTML('beforeend', `<div class="mini-poster" data-id="${savedPosters[i].id}">
      <img src= "${savedPosters[i].imageURL}">
      <h2>${savedPosters[i].title}</h2>
      <h4>${savedPosters[i].quote}</h4>
    </div>`)
  }
}

function displaySavedPosterPage() {
  mainPoster.classList.add('hidden')
  savedPosterPage.classList.remove('hidden')
  displaySavedPoster()
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function initialRandomPoster() {
  var imgSrc = images[getRandomIndex(images)]
  var title = titles[getRandomIndex(titles)]
  var quote = quotes[getRandomIndex(quotes)]
  currentPoster = new Poster(imgSrc, title, quote)
  setPoster()
}

function makePoster(imgSrc, title, quote) {
  return new Poster(imgSrc, title, quote)
}

function makePosterHandler(e) {
  e.preventDefault()
  createAPoster(posterImgInput.value, posterTitleInput.value, posterQuoteInput.value)
}

function noDuplicatePoster() {
  for (var i = 0; i < savedPosters.length; i++) {
    if (savedPosters[i].id === currentPoster.id) {
      return false
    }
  }
  return true
}

function returnToMain() {
  savedPosterPage.classList.add('hidden')
  posterForm.classList.add('hidden')
  mainPoster.classList.remove('hidden')
}

function savePoster() {
  if (noDuplicatePoster()) {
    savedPosters.push(currentPoster)
  }
}

function setPoster() {
  mainPosterImg.src = currentPoster.imageURL
  posterTitle.innerHTML = currentPoster.title
  posterQuote.innerHTML = currentPoster.quote
}
