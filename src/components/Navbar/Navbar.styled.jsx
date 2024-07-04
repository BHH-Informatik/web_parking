import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';

export const SidebarContainer = styled.div`
    position: relative;
    top: 0;
    left: 0;
    width: 300px;
    height: 100vh;
    background-color: #0393a319;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-items: center;
    justify-content: center;
    gap: 30px;
    overflow: hidden;
    padding: 0 3% 0 3%;
`;

export const Icon = styled(FaBars)`
    font-size: 25px;
    color: white;
    position: absolute;
    top: 20px;
    right: 0;
    cursor: pointer;
`;

export const SidebarLink = styled.a`
    position: relative;
    text-decoration: none;
    font-size: 1.5rem;
    color: #4E4E4E;
    display: flex;
    align-items: center;
    gap: 15px;
    width: 100%;
    padding: 0 3% 0 3%;

    &:hover {
        background-color: #FC6D5C;
        color: white;
    }
`;