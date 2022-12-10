export function displayMessage(messageType, user, message,message2, targetElement) {
    const element = document.querySelector(targetElement);

    element.innerHTML = `<div class="message ${messageType}">${user}${message}${message2}</div>`;
}
export function displayMessageCreate(messageType, message, targetElement) {
    const element = document.querySelector(targetElement);

    element.innerHTML = `<div class="message ${messageType}">${message}</div>`;
}
