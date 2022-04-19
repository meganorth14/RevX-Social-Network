import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import DataContext from "../../dataStore/dataStore";
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
import { 
    FaJava,
    FaReact,
    FaTable 
} from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import { IoLogoJavascript } from 'react-icons/io';
import { MdWebAsset } from 'react-icons/md';
import Logo from "./Logo";

const Navbar = ({setShowLogin}) => {

    //NAV COLLAPSING STATE
    const [menuCollapse, setMenuCollaspe] = useState(false);

    //CALLING IN DATASTORE -> USED FOR NAV BAR CONDITION STATEMENT
    const { user, setUser } = useContext(DataContext);

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
                            <Logo/>
                        </div>
                        <div className="closemenu" onClick={menuIconClick}>
                            {menuCollapse ? <FiArrowRightCircle /> :
                                <FiArrowLeftCircle />}
                        </div>

                        {/*CHANGE MENU ICON SHAPE*/}

                        <Menu >
                            <MenuItem active={true} icon={<FiHome />}>
                                <Link to="/">Home</Link>
                            </MenuItem>

                            {/* conditionally show the admin portal */}
                            {user && user.account === 'admin' ?
                                <MenuItem icon={<RiAdminLine />}>
                                 <Link to="/admin">Admin Portal</Link>
                            </MenuItem>
                            : ""}
                        </Menu>
                    </SidebarHeader>

                    {/*CONTAIN MAIN NAV CONTENT*/}

                    <SidebarContent>
                        <Menu iconShape="square">
                            <MenuItem icon={<FaJava/>}>
                                <Link to="/java">Java</Link>
                            </MenuItem>
                            <MenuItem icon={<FaReact/>}>
                                <Link to="/react">React</Link>
                            </MenuItem>
                            <MenuItem icon={<FaTable />}>
                                <Link to="/sql">SQL</Link>
                            </MenuItem>
                            <MenuItem icon={<IoLogoJavascript />}>
                                <Link to="/javascript">JavaScript</Link>
                            </MenuItem>
                            <MenuItem icon={<MdWebAsset />}>
                                <Link to="/html">HTML</Link>
                            </MenuItem>
                        </Menu>
                    </SidebarContent>

                    {/*FOOTER SECTION*/}
                    <SidebarFooter>
                        <Menu iconShape="square">

                          <MenuItem icon={<BiCog/>}>
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

export default Navbar;