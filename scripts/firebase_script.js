const API_KEY = 'AIzaSyAJOWQTAeS9YQKCVu59WHeQk3k4K5rZ2P4';
const FIREBASE_URL = 'https://tewst-landing-page.firebaseio.com';
const FIREBASE_SRC = 'https://www.gstatic.com/firebasejs/3.1.0/firebase.js';

/**
 * Загрузка скрипта Firebase
 * @return {Promise}
 */
export const createFirebaseScriptIfNeed = () => {
  return new Promise((resolve, reject) => {
    const scriptExist = document.querySelector('script#firebase');

    if (scriptExist) {
      return reject();
    }

    const firebaseScript = document.createElement('script');
    firebaseScript.src = FIREBASE_SRC;
    firebaseScript.id = 'firebase';
    document.body.appendChild(firebaseScript);
    firebaseScript.onerror = error => reject(error);
    firebaseScript.onload = () => resolve(window.firebase);
  });
};

export const config = {
  'apiKey': API_KEY,
  'databaseURL': FIREBASE_URL,
};
