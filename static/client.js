const sock = io();

const escribirMensaje = (text) => {

    if (text.idEmisor == sock.id) {
        writeEvent(text.mensaje);
    }else{
        writeEventRecibido(text.mensaje);
    }

};

const writeEvent = (text) => {

    const parent = document.querySelector('#evento-enviado');

    const el = document.createElement('li');
    el.innerHTML = text;

    parent.appendChild(el);

};

const writeEventRecibido = (text) => {

    const parent = document.querySelector('#evento-recibido');

    const el = document.createElement('li');
    el.innerHTML = text;

    parent.appendChild(el);

};

const onFormSubmitted = (e) => {
    e.preventDefault();

    const input = document.querySelector('#chat');
    input.value = input.value;
    const text = {
        mensaje: input.value,
        idEmisor: sock.id,
    };

    input.value = '';
    
    sock.emit('message', text);
};

sock.on('message', escribirMensaje);



document.querySelector('#chat-form').addEventListener('submit', onFormSubmitted);


