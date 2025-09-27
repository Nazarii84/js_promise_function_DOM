'use strict';

function waitFor(element, eventName) {
  return new Promise((resolve, reject) => {
    if (!element || typeof element.addEventListener !== 'function') {
      return reject(new TypeError('waitFor: invalid element'));
    }

    if (typeof eventName !== 'string' || !eventName) {
      return reject(new TypeError('waitFor: invalid eventName'));
    }

    const handler = () => {
      resolve(
        `It was ${eventName} on the element: ${element.nodeName}, id: ${element.id}.`,
      );
    };

    element.addEventListener(eventName, handler, { once: true });
  });
}

function printMessage(message) {
  const div = document.createElement('div');

  div.className = 'message';
  div.textContent = message;
  document.body.appendChild(div);
}

if (typeof window !== 'undefined') {
  window.waitFor = waitFor;
  window.printMessage = printMessage;
}

function wireUp() {
  [loginField, passwordField, button].forEach((el) => {
    if (el) {
      waitFor(el, 'click').then(printMessage);
      waitFor(el, 'blur').then(printMessage);
    }
  });

  if (loginField) {
    waitFor(loginField, 'input').then(printMessage);
  }

  if (passwordField) {
    waitFor(passwordField, 'input').then(printMessage);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', wireUp, { once: true });
} else {
  wireUp();
}

const loginField = document.getElementById('login');
const passwordField = document.getElementById('password');
const button = document.getElementById('submit');

waitFor(loginField, 'click').then(printMessage);
waitFor(passwordField, 'click').then(printMessage);
waitFor(button, 'click').then(printMessage);

waitFor(loginField, 'input').then(printMessage);
waitFor(passwordField, 'input').then(printMessage);

waitFor(loginField, 'blur').then(printMessage);
waitFor(passwordField, 'blur').then(printMessage);
waitFor(button, 'blur').then(printMessage);
