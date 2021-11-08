import React, { Component } from 'react'
import './Header.css'
import { MdShoppingCart } from "react-icons/md";

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <h1>ProMarket</h1>
                <span className="cart-item">1</span>
                <button><MdShoppingCart /></button>
            </div>
        )
    }
}
