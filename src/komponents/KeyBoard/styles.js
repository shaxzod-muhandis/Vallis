import styled from "styled-components";

export const KeyBoardWrapper = styled.div`
  width: 240px;
  height: 250px;
  -webkit-box-shadow: 11px 5px 16px 3px rgba(208, 225, 216, 0.2);
  -moz-box-shadow: 11px 5px 16px 3px rgba(208, 225, 216, 0.2);
  box-shadow: 11px 5px 16px 3px rgba(208, 225, 216, 0.2);
  background-color: #fff;
  display: block;
  position: absolute;
  right: 30px;
  z-index: 100;
`;

export const KeyboardRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const KeyBox = styled.div`
  width: 80px;
  height: 50px;
  border: 2px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const KeyBoxTxt = styled.span`
  font-size: 18px;
  color: #000;
`;
