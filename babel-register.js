const register = require('@babel/register').default;
const { JSDOM } = require('jsdom');

register({ extensions: ['.ts', '.tsx', '.js', '.jsx'] });
