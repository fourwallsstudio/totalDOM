import DOMNodeCollection from './dom_node_collection';

const DOCUMENT_READY_CALLBACKS = [];

window.$l = (arg) => {
  switch (typeof arg) {

    case 'string':
      return querySelectorAll(arg);

    case 'object':
      if (arg instanceof HTMLElement) {
        return new DOMNodeCollection([arg]);
      }
      break;

    case 'function':
      DOCUMENT_READY_CALLBACKS.push(arg);
      break;

    default:
      return null;
  }
};

$l.extend = (...args) => {
  return Object.assign({}, ...args);
}



$l.ajax = (opts = {}) => {
  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: 'GET',
    url: '',
    success: () => {},
    error: () => {},
    data: {},
  }
  const args = $l.extend(defaults, opts);
  const request = new XMLHttpRequest();

  args.method = args.method.toUpperCase();

  request.open(args.method, args.url, true);

  const response = new Promise((resolve, reject) => {
    request.onload = (e) => {
      if (request.status === 200) {
        resolve(request.response);
      } else {
        reject(request.response);
      }
    }
  })

  request.send(JSON.stringify(args.data));

  return response;
};

const querySelectorAll = (arg) => {
  const arr = Array.from(document.querySelectorAll(arg));
  return new DOMNodeCollection(arr);
}

document.addEventListener('DOMContentLoaded', () => {
  DOCUMENT_READY_CALLBACKS.forEach( cb => cb() );
})
