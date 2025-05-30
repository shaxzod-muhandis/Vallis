import styled from "styled-components";

const StyleClient = styled.div`
  .modal-me {
    position: fixed;
    left: 0;
    z-index: 1;
    top: 112px;
    right: -67px;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
  }
  .modal-content {
    border-radius: 8px;
    width: 68%;
    height: 50%;
    overflow: auto;
    margin: auto;
    position: relative;
    padding: 0px 5px 6px 5px;
    text-align: left;
    vertical-align: middle;
    background: #2a3142;
  }
  .modal-head {
    padding: 0px 10px 0px 10px;
  }
  .modal-footer {
    padding: 10px;
    padding-top: none;
  }
  .modal-footer {
    display: flex;
    padding: 0px 10px 8px 10px;
    justify-content: space-between;
  }
  .modal-title {
    cursor: pointer;
    margin: 0;
    text-align: right;
    padding-right: 7px;
    padding-bottom: 5px;
    font-size: 26px;
    font-family: sans-serif;
  }
  .modal-body {
    padding: 10px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }

  .partiya {
    padding: 16px;
    border: 1px solid #4b4747;
    transition: background-color 0.5s ease-out;
    border-radius: 6px;
    border-color: black;
    height: 40px;
    outline: none;
    box-shadow: 0 -2px 1px rgb(0 0 0 / 5%), 2px 5px 4px rgb(0 0 0 / 5%);
  }
  .select-model {
    width: 69.4%;
    padding: 4px;
    font-size: 18px;
    border-radius: 7px;
    background: #0382bb;
    color: white;
    border: none;
    outline: none;
    color: black;
    border: 1px solid;
    margin: 0;
    font-family: inherit;
    cursor: inherit;
    background: white;
  }
  .inp-form {
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }
`;

export default StyleClient;
