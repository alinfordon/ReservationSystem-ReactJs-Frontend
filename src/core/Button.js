import styled from 'styled-components';

export const ButtonContainer = styled.button `
  text-transform:capitalize;
  font-size:1.4rem;
  background: transparent;
  border:none;
  border-color: var(--mainBlue);
  color: var(--darkYellow);
  border-radius:0.5rem;
  pading: 0.2rem 0.5rem;
  cursor:pointer;
  margin: 0.2rem 0.5rem 0.2rem 0;
  transition: all 0.5s ease-in-out;
  &:hover{
    background:var(--mainYellow);
    color:var(--mainWhite);
  }
  &:focus{
    outline:none;
  }
`;