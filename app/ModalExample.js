import React from 'react'
import { Popover, Tooltip, Button , Modal, OverlayTrigger } from 'react-bootstrap'
import InputForm from './InputForm';

  const ModalExample = React.createClass({
    getInitialState() {
      return { showModal: false };
    },

    close() {
      this.setState({ showModal: false });
    },

    open() {
      this.setState({ showModal: true });
    },

    render() {
      const popover = (
        <Popover id="modal-popover" title="popover">
          very popover. such engagement
        </Popover>
      );
      const tooltip = (
        <Tooltip id="modal-tooltip">
          wow.
        </Tooltip>
      );

      return (
        <div>
          <p>Click to get the full Modal experience!</p>

          <Button
            bsStyle="primary"
            bsSize="large"
            onClick={this.open}
          >
            + New Item
          </Button>

          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <InputForm />
            
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  });

export default ModalExample;