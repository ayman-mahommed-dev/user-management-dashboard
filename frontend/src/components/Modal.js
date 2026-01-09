import "./Modal.css";

function Modal({ isOpen, onClose, onConfirm, title, message, type }) {
  if (!isOpen) return null;

  const icons = {
    danger: "fa-trash-can",
    warning: "fa-triangle-exclamation",
    info: "fa-circle-info"
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal modal-${type}`} onClick={(e) => e.stopPropagation()}>
        <div className={`modal-icon modal-icon-${type}`}>
          <i className={`fas ${icons[type]}`}></i>
        </div>
        <h3 className="modal-title">{title}</h3>
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <button className="modal-btn modal-btn-cancel" onClick={onClose}>
            <i className="fas fa-xmark"></i>
            Cancel
          </button>
          <button 
            className={`modal-btn modal-btn-confirm modal-btn-${type}`} 
            onClick={onConfirm}
          >
            <i className={`fas ${type === "danger" ? "fa-trash" : "fa-check"}`}></i>
            {type === "danger" ? "Delete" : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
