var winners = [];
var winnerNames= [];
var winnerNameContainer = document.querySelector('#name')
var containerWinners = document.querySelector('ul');
var searchButton = document.querySelector('button');
var inputUrl = document.querySelector('#q');
var imgWinner = document.querySelector('img.rounded-circle')

function getParticipants(){
  if (inputUrl.value === ""){
    return alert('Oops, parece que você se esqueceu do link do evento')
  }
  url = filterUrl(inputUrl.value);
  axios.get('https://cors-anywhere.herokuapp.com/https://api.meetup.com/'+url[0]+'/events/'+url[1]+'/attendance?access_token=4c6be9c3a21d7722b50fa173a0e53d40')
  .then(function(response){
    if(winnerNames.length === response.data.length){
      return alert('Todos os participantes foram sorteados')
    }
      do {
        winner = response.data[Math.floor((Math.random() * response.data.length))]
        winnerName = winner.member.name;
      } while (winnerNames.includes(winner.member.name));
      winnerNames.push(winner.member.name);
      winners.push(winner);
      console.log(winners)
      renderActualWinner(winner)
      renderListOfWinners();
  })
  .catch(function (error){
    alert('Parece que esse não é um link válido')
    console.log(error);
  })
}

function renderActualWinner(winner){
  winnerNameContainer.innerHTML = "";
  try {
    imgWinner.setAttribute('src', winner.member.photo.photo_link);
  } catch (error) {
    console.log(error)
    imgWinner.setAttribute('src', '0.png');
  }
  var winnerNameElement = document.createElement('h2');
  var winnerNameText = document.createTextNode(winner.member.name);
  winnerNameElement.appendChild(winnerNameText);
  winnerNameContainer.appendChild(winnerNameElement);
}

function renderListOfWinners(){
  containerWinners.innerHTML = '';
  for (winner of winners){
    var winnerItem = document.createElement('li');
    winnerItem.setAttribute('class', 'list-group-item')
    var winnerName = document.createTextNode(winner.member.name);
    winnerItem.appendChild(winnerName);
    containerWinners.appendChild(winnerItem);
  }
}

function filterUrl(url){
  if (url == '') {
      
  } else {
      url = url.replace('pt-BR/', '')
      url = url.replace('https://www.meetup.com', '')
      url = url.replace('/events/',' ')
      url = url.substring(0, url.length - 1)}
      
  return(url.split(" "))
}

searchButton.onclick = getParticipants;