export default class DOMNodeCollection {
  constructor(HTMLElements) {
    this.HTMLElements = Array.from(HTMLElements);
  }

  each(callback) {
    this.HTMLElements.forEach(callback);
  }

  html(arg = null) {
    if (arg) {
      this.each( el => el.innerHTML = arg );
    } else {
      return this.HTMLElements[0].innerHTML;
    }

    return arg;
  }

  empty() {
    this.each( el => el.innerHTML = '' );
    return '';
  }

  append(content) {
    this.each( el => {

      if (content instanceof DOMNodeCollection) {

        content.each( newEl => {
          el.innerHTML += newEl.outerHTML;
        })

      } else {
        el.innerHTML += content;
      }
    })
  }

  attr(key, val) {
    if (typeof val === 'string') {
      this.each( el => {
        el.setAttribute(key, val);
      })
    } else {
      return this.HTMLElements[0].getAttribute(key);
    }
  }

  addClass(name) {
    this.each( el => el.classList.add(name) )
  }

  removeClass(name) {
    this.each( el => el.classList.remove(name) )
  }

  children() {
    let childrenList = [];

    this.each( el => {
      childrenList = childrenList.concat(Array.from(el.children))
    });

    return new DOMNodeCollection(childrenList);
  }

  parent() {
    let parents = [];

    this.each( el => {
      if (!parents.includes(el.parentNode)) parents.push(el.parentNode);
    })

    return new DOMNodeCollection(parents);
  }

  find(selector) {
    let result = [];

    this.each( el => {
      const found = el.querySelectorAll(selector);
      result = result.concat(Array.from(found));
    })

    return new DOMNodeCollection(result);
  }

  remove() {
    this.each( el => el.remove() );
  }

  on(eventType, callback) {
    const eventName = `total-${eventType}`;

    this.each( el => {
      el.addEventListener(eventType, callback);
      if (el[eventName] === undefined) el[eventName] = [];
      el[eventName].push(callback);
    });
  }

  off(eventType) {
    const eventName = `total-${eventType}`;

    this.each( el => {
      if (el[eventName]) {
        el[eventName].forEach( cb => {
          el.removeEventListener(eventType, cb);
        })

        delete el[eventName];
      }
    });
  }

}
