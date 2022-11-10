import styled, {css}  from 'styled-components';

export const ButtonContainer = styled.button`
    background: #565656;
    border-radius: 22px;
    position: relative;
    cursor: pointer;
    font-size: 1rem;
    height: 35px;
    color: #FFFFFF;
    padding: 2px 12px;
    min-width: 120px;
    width: 100%;

    &:hover {
      background: #7a7a7a;
    }
    
    ${({variant}) => variant !== "primary" && css`
        min-width: 167px;
        height: 33px;
        font-size: 1.1rem;
        background: #E4105D;

        &::after {
            content: '';
            position: absolute;
            border: 1px solid #E4105D;
            top: -5px;
            left: -6px;
            width: calc(100% + 10px);
            height: calc(100% + 10px);
            border-radius: 22px;
        }

        &:hover {
            background: #c71053;
        }
    `}
`