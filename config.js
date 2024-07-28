let score = JSON.parse(localStorage.getItem('score'));
      
if(score === null){
  score = {
  Wins : 0,
  Losses : 0,
  Ties : 0
  };
}

document.querySelector('.js-rock-button').addEventListener('click',()=> {
  prediction('Rock');
});

document.querySelector('.js-paper-button').addEventListener('click',()=> {
  prediction('Paper');
});

document.querySelector('.js-scissor-button').addEventListener('click',()=> {
  prediction('Scissor');
});

function choice(){
const result = Math.random();
if(result < 1/3) return 'Rock';
else if(result >= 1/3 && result < 2/3) return 'Paper';
else return 'Scissor';
}

function prediction(yourGuess){
let finalResult;
let computerChoice = choice();
if(yourGuess === 'Rock'){
  if(computerChoice === 'Rock') finalResult = 'Tie.';
  else if(computerChoice === 'Paper') finalResult = 'You Lose.';
  else finalResult = 'You Win.';
}
else if(yourGuess === 'Paper'){
  if(computerChoice === 'Rock') finalResult = 'You Win.';
  else if(computerChoice === 'Paper') finalResult = 'Tie.';
  else finalResult = 'You Lose.';
}
else{
  if(computerChoice === 'Rock') finalResult = 'You Lose.';
  else if(computerChoice === 'Paper') finalResult = 'You Win.';
  else finalResult = 'Tie.';
}

if(finalResult === 'You Win.') score.Wins++;
else if(finalResult === 'You Lose.') score.Losses++;
else score.Ties++;

const resulty = document.querySelector('.js-result');
resulty.innerHTML = finalResult;

const moves = document.querySelector('.js-moves');
moves.innerHTML = ` You
<img src="images/${yourGuess}-emoji.png" class="image">
<img src="images/${computerChoice}-emoji.png" class="image">
Computer`;

localStorage.setItem('score',JSON.stringify(score));
resultDisplay();
}


function resultDisplay(){
const display = document.querySelector('.js-score-card');
display.innerHTML = `Wins: ${score.Wins}, Losses: ${score.Losses}, Ties: ${score.Ties}`;
}

document.querySelector('.js-reset-button').addEventListener('click', () => {
  reset();
})
function reset(){
score.Wins = 0;
score.Losses =0;
score.Ties =0;
resultDisplay();
localStorage.removeItem('score');
}

document.querySelector('.js-autoplay-button').addEventListener('click', ()=>{
  autoplay();
})
let running = false;
let intervalid;
function autoplay(){
  if(!running){
    document.querySelector('.js-autoplay-button').innerHTML = 'Stop Play';
      intervalid = setInterval(() =>{
      let mychoice = choice();
      prediction(mychoice);
      running = true;
  },1000);
  }
    else{
      document.querySelector('.js-autoplay-button').innerHTML = 'Auto Play';
      clearInterval(intervalid);
      running = false;
    }
}

document.body.addEventListener('keydown', (event)=>{
  if(event.key === 'r'){
    prediction('Rock');
  }
  else if(event.key === 'p'){
    prediction('Paper');
  }
  else if(event.key === 's'){
    prediction('Scissor');
  }
})