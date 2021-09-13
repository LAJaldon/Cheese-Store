import express = require('express');
import apiRouter from './routes';

const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

//use cors to allow cross origin resource sharing
app.use(
    cors({
        origin: 'http://localhost:9000',
        credentials: true,
    })
);

app.use(express.static('public'));
app.use(apiRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));