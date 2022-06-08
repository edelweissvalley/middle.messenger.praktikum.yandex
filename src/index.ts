import 'normalize.css';

import { authController } from 'src/controllers/Auth.controller';
import { chatsController } from 'src/controllers/Chats.controller';
import { NotFoundPage } from 'src/pages/404';
import { ServerErrorPage } from 'src/pages/5xx';
import { AuthPage } from 'src/pages/auth';
import { ChatsPage } from 'src/pages/chats';
import { PersonalPage } from 'src/pages/personal';
import { RegistrationPage } from 'src/pages/registration';
import { Paths, Router } from 'src/utils/Router';

import './index.pcss';
import './common.pcss';
import './pages/error-pages.pcss';
import './pages/small-form.pcss';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.createElement('div');
  root.setAttribute('id', 'root');
  document.body.appendChild(root);

  new Router('#root')
    .setNotFound(Paths.notFound, NotFoundPage)
    .redirect(Paths.core, Paths.auth)
    .redirect(Paths.coreEmpty, Paths.auth)
    .use(Paths.auth, AuthPage)
    .use(Paths.registration, RegistrationPage)
    .use(Paths.notFound, NotFoundPage)
    .use(Paths.serverError, ServerErrorPage);

  void Promise.all([authController.getUser(), chatsController.get()])
    .then(() => {
      Router
        .instance
        .use(Paths.chats, ChatsPage)
        .use(Paths.personal, PersonalPage)
        .start();

      // eslint-disable-next-line promise/always-return
      if ([
        Paths.auth, Paths.registration, Paths.core, Paths.coreEmpty,
      ].includes(location.pathname as Paths)) {
        Router.instance.go(Paths.chats);
      }
    })
    .catch((e) => {
      console.error(e);
      Router.instance.start();
    });
});
