class NavBar extends HTMLElement {
    _labels = [];
    _hrefs = [];
    _active = true;
    _current = '';

    static get observedAttributes() {
        return ['active', 'labels', 'hrefs', 'current'];
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
                active: this._active,
            });
        });
        links.forEach(link => {
            const a = document.createElement('a');
            a.href = `javascript:location.href='${link.href}';`;
            a.textContent = link.label;
            if (link.active) {
                a.className = 'active';
            }
            nav.appendChild(a);
        });
        const style = document.createElement('style');
        style.textContent = `
            .navbar {
                background-color: #333;
                overflow: hidden;
            }
            .navbar a {
                float: left;
                display: block;
                color: white;
                text-align: center;
                padding: 14px 20px;
                text-decoration: none;
            }
            .navbar a:hover {
                background-color: rgba(255, 255, 255, 0.5);
                color: #333;
            }
            .navbar a.active {
                background-color:rgb(0, 157, 255);
                color: white;
            }
        `;
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(nav);
    }


    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'active') {
            this._active = !!newValue;
        } else if (name === 'labels') {
            this._labels = newValue.split(',').map(label => label.trim());
        } else if (name === 'hrefs') {
            this._hrefs = newValue.split(',').map(href => href.trim());
        } else if (name === 'current') {
            this._current = newValue;
        }
        this.render();
    }
}
customElements.define('nav-bar', NavBar);