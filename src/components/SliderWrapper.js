import React, { Component, Fragment } from 'react';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={true}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  )
}

export default class SliderWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: parseInt(props.data.amount)
    }
  }

  handleChange = (value) => {
    this.setState({value})
    this.props.updateSliderValue(value, this.props.data.name)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data !== this.props.data) {
      this.setState({value: parseInt(nextProps.data.amount)})
    }
  }

  render() {
    const {data} = this.props
    const {value} = this.state
    return (
      <div className='Slider-wrapper'>
        <h4>{data.name}</h4>
        <Slider min={0} max={5000}
          value={value}
          onChange={this.handleChange}
          handle={handle}
        />
      </div>
    )
  }
}
