import React from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Text,
  AppState
} from 'react-native';
import _ from 'lodash';
import {sprintf} from 'sprintf-js';




class CounterDown extends React.Component {
  static propTypes = {
    until: PropTypes.number,
    onFinish: PropTypes.func,
  };

  state = {
    until: Math.max(this.props.until, 0),
    lastUntil: null,
  };

  constructor(props) {
    super(props);
    this.timer = setInterval(this.updateTimer, 1000);
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.until !== prevProps.until || this.props.id !== prevProps.id) {
      this.setState({
        lastUntil: prevState.until,
        until: Math.max(prevProps.until, 0)
      });
    }
  }


  _handleAppStateChange = currentAppState => {
    const {until} = this.state;
    if (this.props.running) {
      const diff = (Date.now() ) / 1000.0;
      this.setState({
        lastUntil: until,
        until: Math.max(0, until - diff)
      });
    }
  
  }

  getTimeLeft = () => {
    const {until} = this.state;
    return {
      seconds: until % 60,
      minutes: parseInt(until / 60, 10) % 60,
    
    };
  };

  updateTimer = () => {
    // Don't fetch these values here, because their value might be changed
    // in another thread
    // const {lastUntil, until} = this.state;

    if (this.state.lastUntil === this.state.until || !this.props.running) {
      return;
    }
    if (this.state.until === 1 || (this.state.until === 0 && this.state.lastUntil !== 1)) {
      if (this.props.onFinish) {
        this.props.onFinish();
      }
      // if (this.props.onChange) {
      //   this.props.onChange(this.state.until);
      // }
    }

    if (this.state.until === 0) {
      this.setState({lastUntil: 0, until: 0});
    } else {
      // if (this.props.onChange) {
      //   this.props.onChange(this.state.until);
      // }
      this.setState({
        lastUntil: this.state.until,
        until: Math.max(0, this.state.until - 1)
      });
    }
  };

  renderDigit = (digit) => {
    return (
      <View >
        <Text style={
          {fontSize: 25,color:'red'}}>
          {digit}
        </Text>
      </View>
    );
  };




  renderCountDown = () => {
    const { minutes, seconds} = this.getTimeLeft();
    const newTime = sprintf('%02d:%02d',  minutes, seconds).split(':');

    return (
      <View style={{flexDirection:'row',backgroundColor:'black',padding:10}}>
       
        { this.renderDigit(newTime[0])}
        <Text style={
          {fontSize: 25,color:'red'}}>:</Text>
        { this.renderDigit(newTime[1])}

      
      </View>
    );
  };

  render() {
    if(this.props.running=== false)
    {
      clearInterval(this.timer);

    }
    return (
      <View >
        {this.renderCountDown()}
      </View>
    );
  }
}

CounterDown.defaultProps = {
  until: 0,
  running: true,

};



export default CounterDown;

