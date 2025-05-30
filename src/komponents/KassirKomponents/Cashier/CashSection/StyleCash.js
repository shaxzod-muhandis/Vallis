import styled from "styled-components";

const StyleCash = styled.div`
  .kassa-card {
    width: 195px;
    height: 125px;
    margin: 10px 0;
    border-radius: 5px;
    background: #626ed4;
    padding-top: 10px;
  }
  .cash-icon {
    top: 20px;
    left: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 5px;
    background: hsla(0, 0%, 100%, 0.15);
    color: #fff;
    font-size: 23px;
  }
  .sum {
    top: 20px;
    left: 80px;
    font-size: 15px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #bcd7f5;
  }
  .sum-cash {
    top: 20px;
    left: 80px;
    font-size: 15px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #bcd7f5;
    padding-left: 35px;
    padding-top: 11px;
  }
  .tab-me table tr {
    border: 2px solid #343b51;
  }
  td:nth-child(2) {
    border-left: 1px solid #343b51;
    border-right: 1px solid #343b51;
  }
  .table td,
  .table th {
    padding: 0.75rem;
    vertical-align: top;
    border-bottom: 1px solid #343b51;
    border-top: 1px solid #343b51;
  }

  .table tbody {
    border-top: 1px solid #dee2e6;
  }
  table tr {
    border: 1px solid #343b51;
  }
  .kassa-box {
    overflow-y: scroll;
  }

  /* .sum-cash{
    padding-top: 15px;
    padding-left: 15px;
    top: 20px;
    left: 80px;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #bcd7f5;
  } */
`;

export default StyleCash;
