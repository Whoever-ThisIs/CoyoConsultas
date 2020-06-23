//-----------Acceso------------//

function acceso() {
  let data = new FormData(document.getElementById('formAcceso'));
  fetch(`../dynamics/php/Acceso.php`, {
    method: 'POST',
    body: data
  }).then((response) => {
    console.log(response);
    return response.json();
  }).then((respuesta) => {
    console.log(respuesta);
    if (respuesta) {
      console.log("si entraste");
      window.location = "../index.html"
    }
  })
  .catch((message) =>
    console.log(message))
}
document.getElementById('formAcceso').addEventListener('submit', (e) => {
  e.preventDefault();
  acceso();
})
