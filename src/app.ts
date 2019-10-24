import express from 'express';
import { scopePerRequest, loadControllers } from 'awilix-express';

import { containerFactory } from './container/compositionRoot';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const container = containerFactory();

app.use(scopePerRequest(container));
app.use(loadControllers('./../build/controllers/*.js', { cwd: __dirname }));

app.listen(3000, () => console.log('Server is up on port 3000'));