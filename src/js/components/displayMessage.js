/**
 * Displays a styled message in a target container.
 * @param {string} messageType - "success" | "warning" | "error"
 * @param {string} user
 * @param {string} message
 * @param {string} message2
 * @param {string} targetElement - CSS selector
 */
export function displayMessage(messageType, user, message, message2, targetElement) {
    const element = document.querySelector(targetElement);
    if (!element) return;

    const icons = {
        success: "fa-circle-check",
        warning: "fa-triangle-exclamation",
        error: "fa-circle-xmark"
    };

    const icon = icons[messageType] || "fa-circle-info";

    element.innerHTML = `
        <div class="message ${messageType}">
            <i class="fa-solid ${icon}"></i>
            <span>${user}${message}${message2}</span>
        </div>`;
}

/**
 * Displays a message for create/update actions.
 * @param {string} messageType
 * @param {string} message
 * @param {string} targetElement
 */
export function displayMessageCreate(messageType, message, targetElement) {
    const element = document.querySelector(targetElement);
    if (!element) return;

    const icons = {
        success: "fa-circle-check",
        warning: "fa-triangle-exclamation",
        error: "fa-circle-xmark"
    };

    const icon = icons[messageType] || "fa-circle-info";

    element.innerHTML = `
        <div class="message ${messageType}">
            <i class="fa-solid ${icon}"></i>
            <span>${message}</span>
        </div>`;
}