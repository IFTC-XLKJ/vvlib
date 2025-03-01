class NavBar extends HTMLElement {
    constructor() {
        super();
        this.render();
        console.log(this);
    }

    render() {
        const shadowRoot = this.attachShadow({ mode: 'open' });
        const nav = document.createElement('div');
        nav.className = 'navbar';
        const links = [
            { label: 'Home', href: '#home', active: true },
            { label: 'News', href: '#news' },
            { label: 'Contact', href: '#contact' },
            { label: 'About', href: '#about' }
        ];
        links.forEach(link => {
            const a = document.createElement('a');
            a.href = link.href;
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
        shadowRoot.appendChild(style);
        shadowRoot.appendChild(nav);
    }
}
customElements.define('nav-bar', NavBar);