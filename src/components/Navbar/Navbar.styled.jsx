import styled from 'styled-components';
import { TbMenuDeep } from "react-icons/tb";

export const SidebarContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: ${props => (props.collapsed ? '60px' : '300px')};
    height: 100vh;
    background-color: #0393a319;
    display: flex;
    flex-direction: column;
    align-items: ${props => (props.collapsed ? 'center' : 'flex-start')};
    justify-content: space-between;
    overflow: hidden;
    align-items: ${props => (props.collapsed ? 'center' : 'flex-start')};
`;

export const IconContainer = styled.div`
    display: flex;
    justify-content: ${props => (props.collapsed ? 'space-around' : 'space-between')};
    align-items: center;
    width: 100%;
    padding: 5% 0 0 0;

    span{
        font-size: 1.2rem;
        color: #4E4E4E;
        padding: 0 0 0 5%;
        display: ${props => (props.collapsed ? 'none' : 'inline')};

    }
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
    gap: ${props => (props.collapsed ? '0' : '15px')};
    justify-content: ${props => (props.collapsed ? 'center' : 'flex-start')};
    width: 100%;
    padding: ${props => (props.collapsed ? '40% 5% 40% 5%' : '5%')};

    span {
        display: ${props => (props.collapsed ? 'none' : 'inline')};
    }

    &:hover {
        background-color: #FC6D5C;
        color: white;
        border-radius: ${props => (props.collapsed ? '5px' : '15px')};
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