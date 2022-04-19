import React, {useContext, useState} from 'react';
import {Link} from "react-router-dom";
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarContent
} from 'react-pro-sidebar';
import {
    FiHome,
    FiLogOut,
    FiArrowLeftCircle,
    FiArrowRightCircle
} from "react-icons/fi";
import {FaRegUser} from "react-icons/fa";
import {RiAdminLine, RiPencilLine} from "react-icons/ri";
import {BiCog} from "react-icons/bi";
import DataContext from "../../dataStore/dataStore";
import Logo from "../navbar/Logo";

const AdminNavbar = ({setShowLogin}) => {

    //NAV COLLAPSING STATE
    const [menuCollapse, setMenuCollaspe] = useState(false);

    //CALLING IN DATASTORE -> USED FOR NAV BAR CONDITION STATEMENT
    const {setUser} = useContext(DataContext);

    //logout and send to login home
    function logout() {
        setUser(null);
        localStorage.removeItem("user");
        setShowLogin(true);
    }

    //NAV STRUCTURE SECTIONS
    const menuIconClick = () => {
        menuCollapse ? setMenuCollaspe(false) : setMenuCollaspe(true);
    }

    return (
        <>
            <div id="header">
                <ProSidebar collapsed={menuCollapse}>

                    {/*CONTAINS HEADER & RESPONSIVE LOGO*/}
                    <SidebarHeader>
                        <div className="logotext">
                            <p>{menuCollapse ? <Logo/> : <Logo/>}</p>
                        </div>
                        <div className="closemenu" onClick={menuIconClick}>
                            {menuCollapse ? <FiArrowRightCircle/> :
                                <FiArrowLeftCircle/>}
                        </div>

                        {/*CHANGE MENU ICON SHAPE*/}
                        <Menu iconShape="square">
                            <MenuItem active={true} icon={<FiHome/>}>
                                <Link to="/">Home</Link>
                            </MenuItem>
                            <MenuItem icon={<RiAdminLine />}>
                                <Link to="/admin">Admin Portal</Link>
                            </MenuItem>
                        </Menu>

                    </SidebarHeader>

                    {/*CONTAIN MAIN NAV CONTENT*/}
                    <SidebarContent>
                        <Menu iconShape="square">
                            <MenuItem icon={<FaRegUser/>}>
                                <Link to="/userpanel">User Panel</Link>
                            </MenuItem>
                            <MenuItem icon={<RiPencilLine/>}>
                                <Link to="/contentpanel">Content Panel</Link>
                            </MenuItem>

                        </Menu>
                    </SidebarContent>

                    {/*FOOTER SECTION*/}
                    <SidebarFooter>
                        <Menu iconShape="square">
                            <MenuItem icon={<BiCog />}>
                                <Link to="/account">Account</Link>
                            </MenuItem>
                            <MenuItem icon={<FiLogOut/>}>
                                <Link to="/" onClick={() => logout()}>Logout</Link>
                            </MenuItem>
                        </Menu>
                    </SidebarFooter>
                </ProSidebar>
            </div>
        </>
    );
};

export default AdminNavbar;