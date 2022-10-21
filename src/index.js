import './style.css';

const form = document.querySelector('form');
const refresh = document.querySelector('.refresh-btn');

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
const gameID = 'JShZvm7cAFqsSmGIRLe0';

const displayScores = (scores) => {
  const scoresContainer = document.querySelector('.scores-container');
  scoresContainer.innerHTML = '';
  scores.sort((a, b) => b.score - a.score);
  scores.forEach((element) => {
    const row = document.createElement('tr');
    row.className = 'score-row';
    row.innerHTML = `<td class="name">${element.user} : </td>
    <td class="name">${element.score}</td>`;
    scoresContainer.appendChild(row);
  });
};

const getScores = async () => {
  const response = await fetch(`${url}${gameID}/scores/`);
  const data = await response.json();
  if (response.ok) {
    displayScores(data.result);
  }
};

const addScore = async (username, score) => {
  const newScore = {
    user: username,
    score,
  };
  const response = await fetch(`${url}${gameID}/scores/`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(newScore),
  });
  const data = await response.json();
  getScores();
  return data;
};

getScores();

refresh.addEventListener('click', getScores);

form.addEventListener('submit', async (event) => {
  const name = document.querySelector('#name').value;
  const score = document.querySelector('#score').value;
  event.preventDefault();
  addScore(name, score);
  document.querySelector('#name').value = '';
  document.querySelector('#score').value = '';
});
