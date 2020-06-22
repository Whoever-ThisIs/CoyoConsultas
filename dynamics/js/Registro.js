//---------Registro---------//
function registro() {
  let data = new FormData(document.getElementById('miForm'));
  fetch('../dynamics/php/Registro.php', {
      method: 'POST',
      body: data
    })
    .then((response) => {
      return response.text();
    }).then((data) => {
      alert(data);
      document.getElementById('miForm').reset();
    }).catch((message)=>{
      alert(message);
    });
}
/////Añadimos un manejador de eventos para cuando el formulario se envíe/////
document.getElementById('miForm').addEventListener('submit', (e) => {
  e.preventDefault();
  registro();
})

