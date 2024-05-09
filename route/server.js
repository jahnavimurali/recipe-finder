const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = require('./MainRoute');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});
