export class Button {
    constructor(text, type = 'primary') {
        this.text = text;
        this.type = type;
    }

    render() {
        const styles = {
            primary: {
                backgroundColor: '#007bff',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
            },
            secondary: {
                backgroundColor: '#6c757d',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
            },
            danger: {
                backgroundColor: '#dc3545',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
            }
        };

        return {
            type: 'button',
            text: this.text,
            style: styles[this.type] || styles.primary,
            attributes: {
                'data-testid': 'button',
                'aria-label': this.text
            }
        };
    }

    toHTML() {
        const { type, text, style, attributes } = this.render();
        const styleString = Object.entries(style)
            .map(([key, value]) => `${key}: ${value}`)
            .join('; ');
        
        const attrsString = Object.entries(attributes)
            .map(([key, value]) => `${key}="${value}"`)
            .join(' ');

        return `<button type="${type}" style="${styleString}" ${attrsString}>${text}</button>`;
    }
} 