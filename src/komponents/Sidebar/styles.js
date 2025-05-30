import styled from "styled-components";

export const LeftSideBar = styled.div`
  position: fixed;
  width: 60px;
  height: 100vh;
  left: 0;
  top: 0;
  padding-top: 71px;
  background-color: #2a3142;
  @media (max-height: 400px) {
    overflow-y: scroll;
    overflow-x: hidden;
  }
  z-index: 100;
`;

export const LeftSideBarHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: sart;
  height: 71px;
  width: 100%;
  border-bottom: 1px solid #5a828f;
  padding-top: 5px;
  img {
    width: 65px;
    height: 56px;
  }
  @media (max-width: 550px) {
    padding-top: 110px;
  }
`;

export const LeftSideBarList = styled.ul`
  width: 100%;
`;

export const LeftSideBarItem = styled.li`
  height: 60px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  position: relative;
  z-index: 1000;
  :hover {
    border-top: 1px solid #5a828f;
    border-bottom: 1px solid #5a828f;
    p {
      display: flex;
    }
  }

  .fa-truck {
    color: rgb(134 153 173);
    font-size: 19px;
  }
  .fa-warehouse {
    font-size: 19px;
    color: rgb(134 153 173);
  }

  .fa-box {
    font-size: 21px;
    color: rgb(134 153 173);
  }
  .fa-arrow-right-to-bracket {
    font-size: 21px;
    color: rgb(134 153 173);
  }
  .fa-basket-shopping {
    font-size: 21px;
    color: rgb(134 153 173);
  }
  .fa-car-rear {
    font-size: 21px;
    color: rgb(134 153 173);
  }
  .fa-truck {
    font-size: 21px;
    color: rgb(134 153 173);
  }
  .fa-history {
    font-size: 21px;
    color: rgb(134 153 173);
  }
  .fa-exchange-alt {
    font-size: 21px;
    color: rgb(134 153 173);
  }
`;

export const LeftSidebarPopover = styled.p`
  display: none;
  height: 50px;
  position: absolute;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 100%;
  width: 200px;
  color: #fff;
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 8px;
  line-height: 12px;
  text-transform: uppercase;
  background-color: #2a3142;
  z-index: 2000;
  border: 1px solid #5a828f;
  transition: all 0.6s ease;
  :hover {
    background: #5a828f;
  }
`;

export const LeftSideBarImg = styled.img`
  display: inline-block;
  width: 28px;
  img {
    width: 100%;
  }
`;

export const LeftSideBarText = styled.p`
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 8px;
  line-height: 12px;
  color: #ffffff;
  text-transform: uppercase;
  padding-top: 10px;
`;
