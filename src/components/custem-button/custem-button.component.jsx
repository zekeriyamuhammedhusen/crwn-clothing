    import React from 'react';
    import './custem-button.styles.scss';

    const CustemButton = ({ children, isGoogleSignIn, ...otherProps }) => (
    <button
        className={`${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`}
        {...otherProps}
    >
        {children}
    </button>
    );

    export default CustemButton;