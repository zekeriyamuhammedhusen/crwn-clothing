import React from 'react'

import './custem-button.styles.scss'

const CustemButton = ({children, ...otherprops}) =>(
    <button className='custom-button' {...otherprops}>
        {children}
    </button>
)

export default CustemButton