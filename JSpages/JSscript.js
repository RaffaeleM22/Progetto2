var inputNome = document.getElementById('nome');
var inputEmail = document.getElementById('email');
var inputDataArrivo = document.getElementById('data-arrivo');
var inputDataPartenza = document.getElementById('data-partenza');
var messaggioPrenotazione = document.getElementById('messaggio-prenotazione');
var datePrenotate = new Set();

function prenota() {
    var nome = inputNome.value;
    var email = inputEmail.value;
    var dataArrivo = inputDataArrivo.value;
    var dataPartenza = inputDataPartenza.value;

    if (!nome || !email || !dataArrivo || !dataPartenza) {
        messaggioPrenotazione.textContent = 'Per favore, inserisci il tuo nome, la tua email, la data di arrivo e la data di partenza valide.';
        return;
    }

    var dataInizio = new Date(dataArrivo);
    var dataFine = new Date(dataPartenza);

    var differenzaGiorni = Math.abs((dataFine - dataInizio) / (1000 * 60 * 60 * 24));

    if (differenzaGiorni < 1) {
        messaggioPrenotazione.textContent = 'La differenza tra la data di arrivo e partenza deve essere di almeno 1 giorno.';
        return;
    }

    for (var i = 0; i < differenzaGiorni; i++) {
        var dataCorrente = new Date(dataInizio);
        dataCorrente.setDate(dataCorrente.getDate() + i);
        var dataFormattata = dataCorrente.toISOString().slice(0, 10);
        if (datePrenotate.has(dataFormattata)) {
            alert(`La data ${dataFormattata} è già prenotata.`);
            return;
        }
    }

    for (var i = 0; i < differenzaGiorni; i++) {
        var dataCorrente = new Date(dataInizio);
        dataCorrente.setDate(dataCorrente.getDate() + i);
        var dataFormattata = dataCorrente.toISOString().slice(0, 10);
        datePrenotate.add(dataFormattata);
    }

    messaggioPrenotazione.textContent = `Prenotazione confermata: Nome - ${nome}, Email - ${email}, Data di Arrivo - ${dataArrivo}, Data di Partenza - ${dataPartenza}`;
    inputNome.value = '';
    inputEmail.value = '';
    inputDataArrivo.value = '';
    inputDataPartenza.value = '';
}



document.getElementById('prenota').addEventListener('click', prenota);

