
import React from "react";

export const DeleteConfirmation = ({ contact, actions }) => {
  return (
    <div
      className="modal fade"
      id={`deleteModal${contact.id}`}
      tabIndex="-1"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="deleteModalLabel">
              Delete Contact
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            Are you sure you want to permanently delete{" "}
            <strong>{contact.full_name}</strong> from your contact list? This
            step is irreversible.
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={() => actions.deleteContact(contact.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
