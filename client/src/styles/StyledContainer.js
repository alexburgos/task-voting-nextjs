import styled from 'styled-components';
export const StyledContainer = styled.div `
  flex: ${props => (props.flex ? props.flex : '1')};
  cursor: ${props => (props.onClick ? 'pointer' : 'inherit')};
  ${props =>
    props.display && {
      display: props.display
    }}

  ${props =>
    props.background && {
      background: props.background
    }}

  ${props =>
    props.alignItems && {
      alignItems: props.alignItems
    }}

  ${props =>
    props.justifyContent && {
      justifyContent: props.justifyContent
    }}

  ${props =>
    props.alignContent && {
      alignContent: props.alignContent
    }}

  
  ${props =>
    props.flexDirection && {
      flexDirection: props.flexDirection
    }}

  ${props =>
    props.position && {
      position: props.position
    }}

  ${props =>
    props.width && {
      width: props.width
    }}

  ${props =>
    props.height && {
      height: props.height
    }}

  ${props =>
    props.padding && {
      padding: props.padding
    }}

  ${props =>
    props.top && {
      top: props.top
    }}

  ${props =>
    props.right && {
      right: props.right
    }}

  ${props =>
    props.bottom && {
      bottom: props.bottom
    }}

  ${props =>
    props.left && {
      left: props.left
    }}
    
  ${props =>
    props.border && {
      border: props.border
    }}

  ${props =>
    props.boxShadow && {
      boxShadow: props.boxShadow
    }}

  ${props =>
    props.margin && {
      margin: props.margin
    }}
`;