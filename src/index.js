const express = require('express');
const compression = require('compression');
const helmet = require('helmet');

const { apolloServerBuilder } = require('./graphql');
require('./db');

const app = express();

app.use(helmet());
app.use(compression());
app.disable('x-powered-by');

apolloServerBuilder(app);

app.listen(4000, () => console.log('server listening...'));
