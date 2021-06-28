const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand( new Band('TRI'));
bands.addBand( new Band('CAIFANES'));
bands.addBand( new Band('JAGUARES'));
bands.addBand( new Band('MANA'));

console.log(bands);

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente Conectado OK');
    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => { 
        console.log('Cliente Desconectado')
    });


    client.on('mensaje', (payload) => { 
        console.log('Mensaje:', payload);
        io.emit('mensaje', {admin: 'nuevo mensaje'});
    });


    client.on('vote-band', (payload) => { 
        console.log('VOTO:', payload); 
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());

    });

    client.on('add-band', (payload) => { 
        console.log('ADD_NOMBRE:', payload); 
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());

    });


    client.on('delet-band', (payload) => { 
        console.log('DELETE:', payload); 
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());

    });



    client.on('emitir-mensaje', (payload) => {
     //   console.log(payload);
	// io.emit('fromServer', payload); //EMITE A TODOS
	client.broadcast.emit('fromServer', payload); //EMITE A TODOS MENOS AL QUE LO EMITIO

	})



  });