// document.addEventListener('DOMContentLoaded', () => {
//     const addSongForm = document.getElementById('addSongForm');
//     addSongForm.addEventListener('submit', (event) => {
//         event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

//         const formData = new FormData(addSongForm);
//         fetch('/addSong', {
//             method: 'POST',
//             body: formData
//         })
//         .then(response => {
//             if (response.ok) {
//                 console.log('Canción agregada correctamente');
//                 // Puedes actualizar la página o realizar alguna otra acción si lo deseas
//             } else {
//                 console.error('Error al agregar canción');
//             }
//         })
//         .catch(error => {
//             console.error('Error de red:', error);
//         });
//     });
// });



