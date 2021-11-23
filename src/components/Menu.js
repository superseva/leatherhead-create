import React from "react";
import MenuBtn from "./MenuBtn";

const Menu = () => {
    const menuButtons = [{ title: 'Avatars' }, { title: 'Stickers' }];
    return (
        <>
            {menuButtons.map((btn) => (
                <MenuBtn key={btn.title} btn={btn} />
            ))}
        </>
    )
}

export default Menu
