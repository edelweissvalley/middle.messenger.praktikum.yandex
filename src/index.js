import 'normalize.css';
import Handlebars from 'handlebars/dist/handlebars';

import doesNotExist from './pages/404/404.hbs';
import systemError from './pages/5xx/5xx.hbs';
import auth from './pages/auth/auth.hbs';
import registration from './pages/registration/registration.hbs';
import chats from './pages/chats/chats.hbs';
import personal from './pages/personal/personal.hbs';

import './index.pcss';
import './pages/pages.pcss';

function route() {
  switch (location.pathname) {
    case '/':
      location.pathname = '/auth';

      break;

    case '/auth':
      document.body.innerHTML = Handlebars.compile(auth)();

      break;

    case '/registration':
      document.body.innerHTML = Handlebars.compile(registration)();

      break;

    case '/chats':
      document.body.innerHTML = Handlebars.compile(chats)();

      break;

    case '/personal':
      document.body.innerHTML = Handlebars.compile(personal)();

      break;

    case '/404':
    default:
      document.body.innerHTML = Handlebars.compile(doesNotExist)();

      break;

    case '/500':
      document.body.innerHTML = Handlebars.compile(systemError)();

      break;
  }
}

document.addEventListener('DOMContentLoaded', route);
