<submit-form>

  <style type="text/scss">
    @import "../styles/colors";

    :scope {
      display: block;
      width: inherit;
      max-width: inherit;
    }

    form {
      position: relative;
      align-items: center;
      justify-content: center;
      height: 100%;
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 640px;
      margin: auto;
      z-index: 2;

      & > * {
        z-index: 1;
      }

      > .userSubmitButton {
        line-height: 2.2;
        width: 100%;
        border: none;
        border-radius: 0;
        outline: none;
        font-size: 20px;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;

        &:not([disabled]) {
         background: $complement-color-light;
         color: $white-color;

          &:hover {
           cursor: pointer;
          }
        }

        &:active {
         background: $complement-color-darkest;
       }
      }

    }

    input {
      box-sizing: border-box;
      outline: none;

      &:disabled {
        background-color: hsl(0, 0%, 87%);
      }
      &:invalid {
        box-shadow: none;
        border: 1px solid $complement-color-darkest;
      }
      &:disabled {
        cursor: default;
      }
    }

    .input-container {
      width: 100%;
      background: $white-color;
      margin: 12px 0 0;

      > label,
      > input {
        text-indent: 8px;
      }

      > label {
        display: block;
        width: 100%;
        color: $black-color-light;
        line-height: 26px;
        font-size: 14px;
        cursor: auto;
      }

      > input {
        display: block;
        width: 100%;
        line-height: 2;
        border: none;
      }

    }

  </style>

  <form ref="submitForm" onsubmit="{onSubmitUserSubmitForm}">
    <div class="input-container">
      <label for="userEmail">Email</label>
      <input id="userEmail"
             ref="input"
             type="email"
             placeholder="Enter your email"
             required/>
    </div>
    <input class="userSubmitButton"
           type="submit"
           ref="submit"
           title="Submit news"
           value="Subscribe news"/>
  </form>

  <script>
    import {createFirebaseScriptIfNeed, config} from './../scripts/firebase_script';

    /**
     * @param e {Event}
     * @return {void}
     */
    this.onSubmitUserSubmitForm = (e) => {
      e.preventDefault();

      if (!localStorage._mailSended) {
        submitDataToServer();
      }
    };
    /**
     * Блокирование кнопок отправки
     * @return {void}
     */
    const disableSubmit = () => {
      this.refs.input.disabled = this.refs.submit.disabled = true;
    };
    /**
     * Загрузка данных на сервер
     * @return {void}
     */
    const submitDataToServer = async () => {
      const inputValue = this.refs.input.value;
      if (!(inputValue && inputValue.length)) {
        return;
      }
      const firebase = await createFirebaseScriptIfNeed();
      firebase.initializeApp(config);
      firebase.database().ref('/users').push({
        email: inputValue,
      });
      await firebase.auth().signOut();

      this.refs.submit.value = 'Thank You!';
      localStorage._mailSended = 'sended';
      disableSubmit();
    };

    this.on('mount', () => {
      if (localStorage._mailSended) {
        disableSubmit();
        this.refs.submit.value = 'Your email is processed';
      }
    });
  </script>

</submit-form>
