const cidadeEl = document.querySelector('#cidade');
const estadoEl = document.querySelector('#estado');
const paisEl = document.querySelector('#pais');
const dataEl = document.querySelector('#data');
const horaAtualizadaEl = document.querySelector('.bola.bola-3 .dados-hora');

function sucesso(posicao) {
  const lat = posicao.coords.latitude;
  const lon = posicao.coords.longitude;

  const urlTimezoneDB = `https://api.timezonedb.com/v2.1/get-time-zone?key=174POG5RGITL&format=json&by=position&lat=${lat}&lng=${lon}`;

  fetch(urlTimezoneDB)
    .then(response => response.json())
    .then(data => {
      const pais = data.countryName;
      const estado = data.regionName;
      const cidade = data.city;
      const hora = new Date(data.formatted);

      const localizacao = `${cidade}, ${estado}, ${pais}`;
      const horaFormatada = hora.toLocaleTimeString();

      cidadeEl.textContent = cidade;
      estadoEl.textContent = estado;
      paisEl.textContent = pais;
      dataEl.textContent = hora.toLocaleDateString();
      horaAtualizadaEl.textContent = horaFormatada;

      const bola1 = document.querySelector('.bola-1');
      const cidadeDiv = bola1.querySelector('#cidade');
      const estadoDiv = bola1.querySelector('#estado');
      const paisDiv = bola1.querySelector('#pais');

      cidadeDiv.textContent = cidade;
      estadoDiv.textContent = estado;
      paisDiv.textContent = pais;
    })
    .catch(error => console.log(error));
}

function erro(error) {
  console.log(error);
}

navigator.geolocation.getCurrentPosition(sucesso, erro);

setInterval(() => {
  const hora = new Date();
  const horaFormatada = hora.toLocaleTimeString();

  horaAtualizadaEl.textContent = horaFormatada;
}, 1000);
