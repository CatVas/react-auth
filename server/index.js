const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const morgan = require('morgan');

const router = require('./router');


// DB setup
mongoose.connect('mongodb://localhost:auth/auth');

// App setup
const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on port:', port);
