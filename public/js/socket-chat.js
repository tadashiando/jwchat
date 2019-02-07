var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('name') || !params.has('room')) {
    window.location = 'index.html';
    throw new Error('Necesita poner un nombre o una sala');
}

var user = {
    name: params.get('name'),
    room: params.get('room')
}

//Escucha cuanndo conectado
socket.on('connect', function() {
    console.log('Conectado al Servidor');
    socket.emit('enterChat', user, function(resp) {
        console.log('Usuarios conectados', resp);
    });
})

//Escucha cuando se desconecta
socket.on('disconnect', function() {
    console.log('Perdimos conexion con el servidor');
})

//Enviar informacion.
// socket.emit('notify', {
//     usuario: 'Eduardo',
//     message: 'Hola mundo'
// }, function(resp) {
//     console.log('Respuesta del servidor: ', resp);
// });

//Escuchar informacion
socket.on('createMessage', function(message) {
    console.log('Servidor: ', message);
});

//Escuchar cambios de usuarios
//Cuando un usuario entra o sale del chat
socket.on('personList', function(message) {
    console.log(message);
});

//Mensajes privados
socket.on('privateMessage', function(message) {
    console.log('Mensaje privado: ', message);
})