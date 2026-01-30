class SimpleGreeting extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'wrapper');

    const text = document.createElement('p');
    text.textContent = `Hello, ${this.getAttribute('name') || 'World'}! Welcome to your modern web app.`;

    const style = document.createElement('style');
    style.textContent = `
      .wrapper {
        padding: 15px;
        border: 2px solid var(--primary-color, #0866ff);
        border-radius: 8px;
        color: var(--primary-color, #0866ff);
        font-size: 1.2rem;
        font-weight: bold;
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(text);
  }
}

customElements.define('simple-greeting', SimpleGreeting);