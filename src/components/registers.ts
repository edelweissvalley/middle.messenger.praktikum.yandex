import Handlebars from 'handlebars/dist/handlebars';

import formInput from './text-input';

import ChatDetails from '../pages/chats/chat-details/index.hbs';
import ChatList from '../pages/chats/chat-list/index.hbs';

Handlebars.registerPartial('formInput', formInput);
Handlebars.registerPartial('ChatList', ChatList);
Handlebars.registerPartial('ChatDetails', ChatDetails);
