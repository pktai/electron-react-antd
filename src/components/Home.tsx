import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { Button, Input } from 'antd';
import LayoutP from './Layout';
import { actionTest, actionClick } from '../actions';

class Home extends React.Component {
  constructor(props:any) {
    super(props);
    this.state = {
      valueOnchange: '',
      arrClick: [],
    };
  }

  handleOnchange = e => {
    const { value } = e.target;
    this.setState({
      valueOnchange: value,
    });
    this.props.reduxTest(value);
  };

  handeClick = () => {
    actionClick().then(res => {
      this.setState({
        arrClick: res.data,
      });
    });
  };

  render() {
    const { arrClick } = this.state;
    return (
      <LayoutP>
        <p>Hello World of React and Webpack!</p>
        <p>
          <input onChange={this.handleOnchange}></input>
          <Input></Input>
          <Link to="/dynamic">Navigate to Dynamic Page</Link>
        </p>
        <Button onClick={this.handeClick}>TEst</Button>
        <div>
          {arrClick.map((item, index) => (
            <span key={shortid.generate()}>{item.template}</span>
          ))}
        </div>
      </LayoutP>
    );
  }
}
const mapStateToProps = state => {
  return {
    test: state.test,
  };
};

const mapDispatchToProps = dispatch => ({
  reduxTest: data => {
    return dispatch(actionTest(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
