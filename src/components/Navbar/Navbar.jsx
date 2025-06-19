import React, { useContext, useEffect, useState } from 'react';
import { FaCog } from 'react-icons/fa';
import { LuParkingSquare } from "react-icons/lu";
import { Icon, SidebarContainer, SidebarLink, ProfileLink, IconContainer, LinkContainer, ProfileContainer } from './Navbar.styled';
import { SlCalender } from "react-icons/sl";
import { CiViewList } from "react-icons/ci";
import { GrContact } from "react-icons/gr";
import { RiUserLine } from "react-icons/ri";
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(prev => !prev);
  };

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {

  }, [isAuthenticated]);

  return (
    <>
      <SidebarContainer collapsed={collapsed}>
        <IconContainer collapsed={collapsed}>
          <span>Hallo {user?.first_name ?? ''}</span>
          <Icon onClick={toggleSidebar} />
        </IconContainer>
        <LinkContainer>
          <SidebarLink href="/" collapsed={collapsed}>
            <LuParkingSquare />
            <span>Parkplätze</span>
          </SidebarLink>
          <SidebarLink href="/kalender" collapsed={collapsed}>
            <SlCalender />
            <span>Kalender</span>
          </SidebarLink>
          <SidebarLink href="/kontakt" collapsed={collapsed}>
            <GrContact />
            <span>Kontakt</span>
          </SidebarLink>
          <SidebarLink href="/admin" collapsed={collapsed}>
            <CiViewList />
            <span>Admin Overview</span>
          </SidebarLink>
          <SidebarLink href="#" collapsed={collapsed}>
            <FaCog />
            <span>Einstellungen</span>
          </SidebarLink>
        </LinkContainer>
        <ProfileContainer>
          {isAuthenticated ? (
            <ProfileLink href="#" onClick={handleLogout} collapsed={collapsed}>
              <RiUserLine />
              <span>Abmelden</span>
            </ProfileLink>
          ) : (
            <ProfileLink href="/login" collapsed={collapsed}>
              <RiUserLine />
              <span>Einloggen</span>
            </ProfileLink>
          )}
        </ProfileContainer>
      </SidebarContainer>

    </>
  );
};

export default Navbar;
