import React, { useContext } from 'react';
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

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  return (
    <>
      <SidebarContainer>
        <IconContainer>
          <Icon />
        </IconContainer>
        <LinkContainer>
          <SidebarLink href="/">
              <LuParkingSquare />
              <span>Parkplätze</span>
          </SidebarLink>
          <SidebarLink href="#">
              <SlCalender />
              <span>Kalender</span>
          </SidebarLink>
          <SidebarLink href="/kontakt">
              <GrContact />
              <span>Kontakt</span>
          </SidebarLink>
          <SidebarLink href="/admin">
              <CiViewList />
              <span>Admin Overview</span>
          </SidebarLink>
          <SidebarLink href="#">
              <FaCog />
              <span>Einstellungen</span>
          </SidebarLink>
        </LinkContainer>
        <ProfileContainer>
        {isAuthenticated ? (
          <ProfileLink href="#" onClick={handleLogout}>
            <RiUserLine />
            <span>Abmelden</span>
          </ProfileLink>
        ) : (
          <ProfileLink href="/login">
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
