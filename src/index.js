import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Header from './components/Header';
import './scss/app.scss';

const Page = (props) => {
  const { message } = props;
  return (
    <div>
      <Header />
      <div className="container">
        <h1>{message}</h1>
      </div>
    </div>
  );
};

Page.propTypes = { message: PropTypes.string };
Page.defaultProps = { message: 'Developing Calendar' };
const App = document.getElementById('app');

ReactDOM.render(<Page />, App);
