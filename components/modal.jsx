import React, { useState, useEffect } from 'react';
/*
Original source code can be found here.
https://kaloraat.com/articles/how-to-create-a-popup-modal-in-react
*/
const Modal = (message) => {
  // return isShown ? <h3>Modal content</h3> : null;
  return (
    <div className="modal alert"  id="channelModal">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-light">Result of your order submission.</h5>

            <button
              style={{ color: '#fff' }}
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body">
            <div className="row">

              <div className="col-6">
                <p className="lead text-light">
                    {message}
                  Lorem ipsum dolor sit amet,
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Modal;