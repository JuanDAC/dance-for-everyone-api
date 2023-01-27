import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import { MediaRoute } from '@/routes/media.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new MediaRoute(), new AuthRoute()]);

app.listen();
