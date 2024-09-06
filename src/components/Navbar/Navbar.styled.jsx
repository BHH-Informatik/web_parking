import styled from 'styled-components';
import { TbMenuDeep } from "react-icons/tb";

export const SidebarContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 300px;
    height: 100vh;
    background-color: #0393a319;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    padding: 0 2% 0 0;
`;

export const IconContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 5% 0 0 0;
`

export const Icon = styled(TbMenuDeep)`
    font-size: 35px;
    color: #4E4E4E;
    cursor: pointer;
`;

export const LinkContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    gap: 20px;
`

export const SidebarLink = styled.a`
    position: relative;
    text-decoration: none;
    font-size: 1.5rem;
    color: #4E4E4E;
    display: flex;
    align-items: center;
    gap: 15px;
    width: 100%;
    padding: 5%;

    &:hover {
        background-color: #FC6D5C;
        color: white;
        border-radius: 15px;
        box-shadow: 3px 4px 20px 3px rgba(0, 0, 0, 0.35);
    }
`;

export const ProfileContainer = styled.div`
    width: 90%;
    padding: 0 0 5% 0;
`

export const ProfileLink = styled(SidebarLink)`
    padding: 5%;

    &:hover {
        background-color: #FC6D5C;
    }
`;