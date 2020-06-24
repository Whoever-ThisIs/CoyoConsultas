function Recuperar() {
  let data = new FormData(document.getElementById('formy'));
  fetch(`../dynamics/php/Recuperar.php`, {
    method: 'POST',
    body: data
  }).then((response) => {
    return response.json();
  }).then((data) => {
    // lo que se va a hacer
    console.log(data);
  }).catch((message)=>{
  console.log(message)})
}

document.getElementById('formy').addEventListener('submit', (e) => {
  e.preventDefault();
  Recuperar();
})
