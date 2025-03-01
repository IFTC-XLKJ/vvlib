class NavBar extends HTMLElement {
    _labels = [];
    _hrefs = [];
    _current = '';

    static get observedAttributes() {
        return ['labels', 'hrefs', 'color', 'bgcolor'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
        console.log(this);
    }

    render() {
        this.shadowRoot.innerHTML = '';
        const nav = document.createElement('div');
        nav.className = 'navbar';
        const links = [];
        this._labels.forEach(label => {
            links.push({
                label,
                href: `${this._hrefs[this._labels.indexOf(label)]}`,
            });
        });
        links.forEach(link => {
            const a = document.createElement('a');
            a.href = `javascript:location.href='${link.href}';`;
            a.textContent = link.label;
            nav.appendChild(a);
        });
        const style = document.createElement('style');
        style.textContent = `
            .navbar {
                background-color: var(--bgcolor, #333);
                overflow: hidden;
                user-select: none;
            }
            .navbar a {
                float: left;
                display: block;
                color: var(--color, white);
                text-align: center;
                padding: 14px 20px;
                text-decoration: none;
            }
            .navbar a:hover {
                background-color: rgba(255, 255, 255, 0.2);
            }
        `;
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(nav);
    }


    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'labels') {
            this._labels = newValue.split(',').map(label => label.trim());
        } else if (name === 'hrefs') {
            this._hrefs = newValue.split(',').map(href => href.trim());
        } else if (name === 'current') {
            this._current = newValue;
        } else if (name === 'color') {
            this.style.setProperty('--color', newValue);
        } else if (name === 'bgcolor') {
            this.style.setProperty('--bgcolor', newValue);
        }
        this.render();
    }
}
customElements.define('nav-bar', NavBar);