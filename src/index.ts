import 'normalize.css';

import { NotFound } from './pages/404';
import { ServerError } from './pages/5xx';
import { Auth } from './pages/auth';
import { Chats } from './pages/chats';
import { Personal } from './pages/personal';
import { Registration } from './pages/registration';
import { renderDOM } from './utils/DOM';

import './components/registers';

import './index.pcss';
import './common.pcss';
import './pages/error-pages.pcss';
import './pages/small-form.pcss';

enum Paths {
  core = '/',
  auth = '/auth',
  registration = '/registration',
  chats = '/chats',
  personal = '/personal',
  notFound = '/404',
  serverError = '/500',
}

function route(): void {
  switch (location.pathname) {
    case Paths.core:
      location.pathname = Paths.auth;

      break;

    case Paths.auth:
      renderDOM(new Auth);

      break;

    case Paths.registration:
      renderDOM(new Registration);

      break;

    case Paths.chats:
      renderDOM(new Chats);

      break;

    case Paths.personal:
      renderDOM(new Personal);

      break;

    case Paths.notFound:
    default:
      renderDOM(new NotFound);

      break;

    case Paths.serverError:
      renderDOM(new ServerError);

      break;
  }
}

document.addEventListener('DOMContentLoaded', route);
