import React from 'react';
import { Dropdown, DropdownButton, DropdownButtonProps } from 'react-bootstrap';
import { Span } from '../Common';
import styled from '@emotion/styled';

export interface DropDownItem {
  title: string;
  action: () => void;
}

interface Props extends DropdownButtonProps {
  title: string | HTMLElement;
  items: DropDownItem[];
}

export function DropDown(props: Props) {
  const { title, items } = props;
  return (
    <DropDownButtonStyled title={<Span variant="bodyBold">{title}</Span>}>
      {items.map((item, index) => {
        return (
          <Dropdown.Item onClick={item.action} key={index}>
            {item.title}
          </Dropdown.Item>
        );
      })}
    </DropDownButtonStyled>
  );
}

const DropDownButtonStyled = styled(DropdownButton)<any>`
  outline: none !important;
  button,
  button:hover {
    background-color: transparent !important;
    border-color: transparent !important;
    color: ${props => props.theme.colors.primaryBlack} !important;
    outline: none !important;
    box-shadow: none !important;
  }
`;
