import React from 'react'
import Branding from '../Branding/Branding'
import ShoppingCartPreview from '../shoppingCartPreview/shoppingCartPreview'

export default function Navigation() {
    return (
        <nav>
            <ul>
                <li>
                    <Branding/>
                </li>
                <li>
                    <ShoppingCartPreview/>
                </li>
            </ul>
        </nav>
    )
}
