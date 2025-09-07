import React from 'react';
import './Button.css';

/**
 * A reusable button component.
 * @param {object} props
 * @param {function} props.onClick - The click handler.
 * @param {string} props.children - The text or elements inside the button.
 * @param {string} [props.type='button'] - The button type (e.g., 'button', 'submit').
 * @param {string} [props.variant='primary'] - The style variant (e.g., 'primary', 'secondary').
 * @param {boolean} [props.disabled=false] - Whether the button is disabled.
 */
const Button = ({ children, onClick, type = 'button', variant = 'primary', disabled = false }) => {
    const className = `btn btn-${variant}`;

    return (
        <button
            type={type}
            className={className}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;