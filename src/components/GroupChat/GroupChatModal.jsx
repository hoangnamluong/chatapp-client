import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import GroupForm from "./GroupForm";

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
