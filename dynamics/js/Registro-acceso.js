//---------Registro---------//
function registro() {
  let data = new FormData(document.getElementById('miForm'));
  fetch('dynamics/registro.php', {
      method: 'POST',
      body: data
    })
    .then((response) => {
      return response.json();
    }).then((data) => {
      alert("Se ha creado el perfil con éxito");
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

//-----------Acceso------------//

function acceso() {
  fetch(`dynamics/Acceso.php`, {
    method: 'POST',
    body: data
  }).then((response) => {
    return response.json();
  }).then((data) => {
    if (data) {
      console.log("si entraste");
    }
  }).catch((message)=>
  console.log(message))
}
