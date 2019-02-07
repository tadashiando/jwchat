class Usuarios {
    constructor() {
        this.persons = [];
    }
    addPerson(id, name, room) {
        let person = {
            id,
            name,
            room
        }

        this.persons.push(person);

        return this.persons;
    }
    getPerson(id) {
        let person = this.persons.filter(p => p.id === id)[0];
        return person;
    }

    getAll() {
        return this.persons;
    }

    getPersonsByRoom(room) {
        let roomPersons = this.persons.filter(p => p.room === room);
        return roomPersons;
    }

    deletePerson(id) {
        let deletedPerson = this.getPerson(id);
        this.persons = this.persons.filter(p => p.id !== id);

        return deletedPerson;
    }
}

module.exports = {
    Usuarios
}