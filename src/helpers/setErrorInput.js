export const setErrorInput = (input, errorMessage) => {
    const formControl = input.parentElement;
    const messageError = formControl.querySelector('small');
    const messageIcon = formControl.querySelector('img')

    messageError.innerText = errorMessage;

    messageIcon.classList.add("showError")
    messageIcon.classList.remove("hiddenError")
    messageError.classList.add("showError")
    messageError.classList.remove("hiddenError")

    formControl.addEventListener('click', () => {
      messageIcon.classList.remove("showError")
      messageIcon.classList.add("hiddenError")
      messageError.classList.remove("showError")
      messageError.classList.add("hiddenError")
      messageError.innerText = '';
    });
  };