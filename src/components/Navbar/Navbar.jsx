import React from 'react';
import { FaCog } from 'react-icons/fa';
import { LuParkingSquare } from "react-icons/lu";
import { Icon, SidebarContainer, SidebarLink } from './Navbar.styled';
import { SlCalender } from "react-icons/sl";
import { CiViewList } from "react-icons/ci";
import { GrContact } from "react-icons/gr";

const Navbar = () => {
  return (
    <>
      <SidebarContainer>
        <Icon />
        <SidebarLink href="/">
            <LuParkingSquare  />
            <span>Parkplätze</span>
        </SidebarLink>
        <SidebarLink href="#">
            <SlCalender  />
            <span>Kalender</span>
        </SidebarLink>
        <SidebarLink href="#">
            <GrContact  />
            <span>Kontakt</span>
        </SidebarLink>
        <SidebarLink href="/admin">
            <CiViewList  />
            <span>Admin Overview</span>
        </SidebarLink>
        <SidebarLink href="#">
            <FaCog />
            <span>Einstellungen</span>
        </SidebarLink>
      </SidebarContainer>
    </>
  );
};

export default Navbar;
