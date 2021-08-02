import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Content, Card } from './styles';
import cagece from '../../../assets/cagece.png';




export default function AuthLayout({ children }) {
  return (
    <Wrapper>
      <Card>
        <Content>
        <img src={cagece} width="300" height="250" />
         
         
          {children}
        </Content>
      </Card>
    </Wrapper>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
