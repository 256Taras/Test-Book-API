import express from 'express';
import { scopePerRequest, loadControllers } from 'awilix-express';

import { containerFactory } from './container/compositionRoot';
import { asValue } from 'awilix';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const container = containerFactory();

app.use(scopePerRequest(container));

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    container.register({
        req: asValue(req),
        res: asValue(res)
    });

    next();
})

app.use(loadControllers('./../build/controllers/*.js', { cwd: __dirname }));

app.listen(3000, () => console.log('Server is up on port 3000'));