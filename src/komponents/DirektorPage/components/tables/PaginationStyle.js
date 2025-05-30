import styled from 'styled-components';

const PaginationContainer = styled.div`
ul{
  display:flex;
  width: 100%;
  padding:20px 0 ;
  li{
    cursor:pointer ;
    a{
        color:#fff ;
        padding:5px 8px;
        text-decoration:none;
    }
    
}
.selected {
    a{
        background:blue;
        color:white;
    }
}
}
`

export {PaginationContainer}
