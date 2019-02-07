const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { notify } = require('../utils/utils');

const usuarios = new Usuarios();


io.on('connection', (client) => {

    client.on('enterChat', (user, callback) => {

        if (!user.name || !user.room) {
            return callback({
                error: true,
                message: 'El nombre o sala es necesario'
            });
        }

        client.join(user.room);

        usuarios.addPerson(client.id, user.name, user.room);

        client.broadcast.to(user.room).emit('personList', usuarios.getPersonsByRoom(user.room));

        callback(usuarios.getPersonsByRoom(user.room));
    });

    client.on('createMessage', (data) => {
        let person = usuarios.getPerson(client.id);
        let message = notify(person.name, data.message);
        client.broadcast.to(person.room).emit('createMessage', message);
    });

    client.on('disconnect', () => {
        let deletedPerson = usuarios.deletePerson(client.id);

        if (deletedPerson) {
            client.broadcast.to(deletedPerson.room).emit('createMessage', notify('Administrator', `${ deletedPerson.name } salió`));
            client.broadcast.to(deletedPerson.room).emit('personList', usuarios.getPersonsByRoom(deletedPerson.room));
        }
    });

    //Mensajes privados
    client.on('privateMessage', data => {
        let person = usuarios.getPerson(client.id);
        client.broadcast.to(data.to).emit('privateMessage', notify(person.name, person.message));
    })

});