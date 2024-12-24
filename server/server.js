import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyparser from 'body-parser';
import path from 'path';
import router from './routes/router.js';

import connectDB from './database/connection.js';

// Erstellen einer Instanz der Express-Anwendung
const app = express();

// Lädt Umgebungsvariablen aus einer 'config.env'-Datei in process.env
dotenv.config({ path: 'config.env' });
// Legt den Port für den Server fest, Standardwert ist 3000, wenn er nicht in der Umgebung definiert ist
// const PORT = process.env.PORT || 3000

// Log-Anfragen
app.use(morgan('tiny'));

// mongoDB Verbindung
connectDB();

// Parsen der Anfrage an den Body-Parser
app.use(bodyparser.urlencoded({ extended: true }));

// Ansicht-Engine setzen
app.set('view engine', 'ejs'); // oder kann man auch statt ejs html benutzen

const __dirname = path.dirname(new URL(import.meta.url).pathname);

// assets laden
app.use('/css', express.static(path.resolve(__dirname, '../assets/css')));
app.use('/img', express.static(path.resolve(__dirname, '../assets/img')));
app.use('/js', express.static(path.resolve(__dirname, '../assets/js')));

// alle routes laden
app.use('/', router);

// Den Port des Servers anhand des Befehlszeilenarguments oder der Umgebungsvariablen festlegen
const PORT = process.argv[2] || process.env.PORT;

app.set('port', PORT);
// Starten den Server auf Port 8080 oder gewählte port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export { app };
