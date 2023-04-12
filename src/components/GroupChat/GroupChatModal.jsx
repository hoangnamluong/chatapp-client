import { useState } from "react";
import { Modal } from "react-bootstrap";

const GroupChatModal = ({
  children = null,
  title = "",
  Form = "",
  formArg = {},
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const removeUserMatch = title === "Remove Member";

  return (
    <>
      <span onClick={handleShow}>{children}</span>

      <Modal show={show} centered onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Form ? <Form handleClose={handleClose} formArg={formArg} /> : ""}
        </Modal.Body>
      </Modal>
    </>
  );
};
export default GroupChatModal;
