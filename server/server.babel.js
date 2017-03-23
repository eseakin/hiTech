import express from 'express';

const app = express();

app.use('/', express.static('public'));
const port = process.env.PORT || 3000
app.listen(port);
console.log('listening on', port)
console.log('ENVIRONMENT', process.env)