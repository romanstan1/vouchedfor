import React, { Component, Fragment } from 'react';
import ThumbSvg from './ThumbSvg'
import Modal from '@material-ui/core/Modal';

export default class WasHelpful extends Component {
  state = {
    visible: true,
    modal: false,
    direction: null
  }
  handleOpen = (e) => {
    console.log(" e.target.value: ",  e.target.dataset.value)
    this.setState({ modal: true, visible: false, direction: e.target.dataset.value })
  }
  handleClose = () => {
    this.setState({ modal: false });
  }
  render() {
    const {direction, visible} = this.state
    return (
      <Fragment>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.modal}
          onClose={this.handleClose}
        >
        <div className='modal-content'>
          Thanks for your feedback!
        </div>
        </Modal>
        <div className="WasHelpful">
          <h4 className={visible? '' : 'hidden'}>Was this Helpful?</h4>
          <div className='icons'>
            <div >
              <ThumbSvg
                handleClick={this.handleOpen}
                value='up'
                active={direction ==='up'? true: null}
              />
            </div>
            <div>
              <ThumbSvg
                handleClick={this.handleOpen}
                value='down'
                active={direction ==='down'? true: null}
              />
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}
