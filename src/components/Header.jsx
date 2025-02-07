import React from 'react';

const Header = () => {
    return (
        <header>
            <h1>Bienvenido a la Plataforma de Alojamiento</h1>
            <nav>
                <ul>
                    <li><a href="/">Inicio</a></li>
                    <li><a href="/dashboard">Dashboard</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;