import {popupOrder, popupSuccess} from './const';
import {disableScrolling} from './popups';

const inputs = document.querySelectorAll(`.form-js input`);
const nameInputs = document.querySelectorAll(`.form-js input[type=text]`);
const phoneInputs = document.querySelectorAll(`.form-js input[type=tel]`);
const borderPhone = document.querySelector(`.contacts__phone-border`);

const checkbox = document.querySelector(`.popup__checkbox input`);
const inputFeedbackPhone = document.querySelector(`.contacts__feedback-phone input[type=tel]`);


const inputsSuccessHandler = function () {
  Array.prototype.forEach.call(phoneInputs, function (i) {
    if (i.value.length === 16) {
      i.classList.add(`correct`);
    } else {
      i.classList.remove(`correct`);
    }
  });

  Array.prototype.forEach.call(nameInputs, function (i) {
    if (i.value.length > 0) {
      i.classList.add(`correct`);
    } else {
      i.classList.remove(`correct`);
    }
  });
};

const showBorderPhone = function () {
  if (inputFeedbackPhone.value.length >= 2) {
    borderPhone.classList.add(`contacts__phone-border--show`);

  } else {
    borderPhone.classList.remove(`contacts__phone-border--show`);
  }
};

if (inputFeedbackPhone) {

  inputFeedbackPhone.oninput = showBorderPhone;

  if (!inputFeedbackPhone) {
    inputFeedbackPhone.oninput = false;
  }
}

Array.prototype.forEach.call(inputs, function (i) {
  i.addEventListener(`input`, inputsSuccessHandler);
});

const removeStyle = function (evt) {
  evt.target.classList.remove(`error`);
};

const nameInputsChangeHandler = function (evt) {
  removeStyle(evt);
};

const phoneInputsChangeHandler = function (evt) {
  removeStyle(evt);
};

const checkboxChangeHandler = function () {
  checkbox.parentNode.classList.remove(`popup__checkbox--error`);
};

const addInputsListener = function () {
  checkbox.addEventListener(`change`, checkboxChangeHandler);

  Array.prototype.forEach.call(nameInputs, function (i) {
    i.addEventListener(`input`, nameInputsChangeHandler);
  });

  Array.prototype.forEach.call(phoneInputs, function (i) {
    i.addEventListener(`input`, phoneInputsChangeHandler);
  });
};

const checkNameInputsValidity = function (el) {
  let flag = true;
  if (el.value === `` || el.value.length < 1) {
    flag = false;
  }
  return flag;
};

const checkPhoneInputsValidity = function (el) {
  let flag = true;
  if (el.value.length < 16) {
    flag = false;
  }
  return flag;
};

const checkBoxValidity = function (el) {
  let flag = true;

  if (!el.checked) {
    flag = false;
  }

  return flag;
};

const checkPhoneInputValidity = function (el) {
  if (!checkPhoneInputsValidity(el)) {
    el.classList.add(`error`);
  }
};

const checkNameInputValidity = function (el) {
  if (!checkNameInputsValidity(el)) {
    el.classList.add(`error`);
  }
};

const checkBoxValidate = function (el) {
  if (!checkBoxValidity(el)) {
    el.parentNode.classList.add(`popup__checkbox--error`);
  }
};


const returnParent = function (el, cssClass) {
  let element = el;
  let cls = cssClass;
  while (!element.classList.contains(cls)) {
    element = element.parentElement;

    if (!element) {
      break;
    }
  }
  return element;
};

const showSuccessMessages = function () {
  popupOrder.classList.remove(`popup--show`);
  popupSuccess.classList.add(`popup--show`);
  disableScrolling();
};

export {
  borderPhone,
  addInputsListener,
  checkNameInputsValidity,
  checkPhoneInputsValidity,
  checkBoxValidity,
  checkNameInputValidity,
  checkPhoneInputValidity,
  checkBoxValidate,
  returnParent,
  showSuccessMessages,
  checkbox
};

// if (submitBtns) {
//   Array.prototype.forEach.call(submitBtns, function (el) {
//     let btn = el;

//     btn.addEventListener(`click`, function (evt) {
//       evt.preventDefault();
//       addInputsListener();

//       const parent = returnParent(evt.target, `form-js`);
//       const phoneInput = parent.querySelector(`input[type=tel]`);
//       const textInput = parent.querySelector(`input[type=text]`);
//       const checkboxInput = parent.querySelector(`input[type=checkbox]`);
//       const form = parent.querySelector(`form`);

//       if (!textInput) {
//         checkPhoneInputValidity(phoneInput);

//         if (checkPhoneInputsValidity(phoneInput)) {
//           setTimeout(function () {
//             form.reset();
//             phoneInput.classList.remove(`correct`);
//             showSuccessMessages();
//           }, 500);
//         }

//       } else if (!checkboxInput) {
//         checkPhoneInputValidity(phoneInput);
//         checkNameInputValidity(textInput);

//         if (checkNameInputsValidity(textInput) && checkPhoneInputsValidity(phoneInput)) {
//           setTimeout(function () {
//             form.reset();

//             phoneInput.classList.remove(`correct`);
//             textInput.classList.remove(`correct`);

//             borderPhone.classList.remove(`contacts__phone-border--show`);

//             showSuccessMessages();
//           }, 500);
//         }

//       } else {
//         checkBoxValidate(checkbox);
//         checkPhoneInputValidity(phoneInput);
//         checkNameInputValidity(textInput);

//         if (checkNameInputsValidity(textInput) && checkPhoneInputsValidity(phoneInput) && checkBoxValidity(checkbox)) {
//           setTimeout(function () {
//             form.reset();
//             phoneInput.classList.remove(`correct`);
//             textInput.classList.remove(`correct`);
//             showSuccessMessages();
//           }, 500);
//         }
//       }
//     });
//   });
// }
