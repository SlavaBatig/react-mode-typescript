import { Request, Response } from 'express';
import { CrudService } from '../services/crud';

const crudService = new CrudService();

export class Routes {
    public routes(app: any): void {
        app.route('/')
        .get((req: Request, res: Response) => {
            console.log(new Date(), 'redirecting from main page');
            res.redirect('/users');
        });

        app.route('/api/users')
        .get(crudService.getUsers);

        app.route('/api/user')
        .post()

        app.route('/api/user/:id')
        .get(crudService.getUser)
        .put()
        .delete()
    }
}