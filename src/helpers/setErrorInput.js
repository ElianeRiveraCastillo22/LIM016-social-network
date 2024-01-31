export const setErrorInput = (input, errorMessage) => {
    const formControl = input.parentElement;
    const messageError = formControl.querySelector('small');
    const messageIcon = formControl.querySelector('img')

    messageError.innerText = errorMessage;
    messageIcon.classList.add("showError")
    messageIcon.classList.remove("hiddenError")

    formControl.addEventListener('click', () => {
      messageIcon.classList.remove("showError")
      messageIcon.classList.add("hiddenError")
      messageError.innerText = '';
    });
  };