import 'normalize.css';
import Handlebars from 'handlebars/dist/handlebars';

import doesNotExist from './pages/404/404.hbs';
import systemError from './pages/5xx/5xx.hbs';
import auth from './pages/auth/auth.hbs';
import registration from './pages/registration/registration.hbs';
import chats from './pages/chats/chats.hbs';
import personal from './pages/personal/personal.hbs';

import './components/registers';

import './index.pcss';
import './common.pcss';
import './pages/error-pages.pcss';
import './pages/small-form.pcss';

function bodyInsider(template) {
  document.body.innerHTML = Handlebars.compile(template)();
}

function route() {
  switch (location.pathname) {
    case '/':
      location.pathname = '/auth';

      break;

    case '/auth':
      bodyInsider(auth);

      break;

    case '/registration':
      bodyInsider(registration);

      break;

    case '/chats':
      bodyInsider(chats);

      break;

    case '/personal':
      bodyInsider(personal);

      break;

    case '/404':
    default:
      bodyInsider(doesNotExist);

      break;

    case '/500':
      bodyInsider(systemError);

      break;
  }
}

document.addEventListener('DOMContentLoaded', route);
