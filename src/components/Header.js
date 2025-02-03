// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const userInfo = useSelector((state) => state.user.userInfo);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="header">
      <Link to="/" className="logo">
        Hoodlum Mentality
      </Link>
      <nav>
        <Link to="/cart">Cart ({cartCount})</Link>
        {userInfo ? (
          <span>Welcome, {userInfo.name}</span>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;

