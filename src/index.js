import './style.css';

const form = document.querySelector('form');
const refresh = document.querySelector('.refresh-btn');
const scoresContainer = document.querySelector('.scores-container');
const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/`;
const gameID = 'Pk5uoKBoacOJcYrWGAJB';

const addScore = async (username, score) => {
  const response = await fetch(`${url}${gameID}/scores/`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ username, score }),
  });
  const res = await response.json();
  return res;
};

const getScores = async () => {
  const response = await fetch(`${url}${gameID}/scores/`);
  const data = await response.json();
  return data;
};

const displayScores = (scores) => {
  scores.forEach(score => {
    const scoreRow = document.createElement('tr');
    scoreRow.className = 'score-row';
    scoreRow.innerHTML = `<td class="name">${score.user}: ${score.score}</td>`;
    scoresContainer.appendChild(scoreRow);
  });
}