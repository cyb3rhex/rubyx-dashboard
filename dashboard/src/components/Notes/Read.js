import React from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@windmill/react-ui";
import MDEditor from "@uiw/react-md-editor";

function Read({
  seeModal,
  closeModal,
  title,
  content
}) {

  return (
    <Modal isOpen={seeModal} onClose={closeModal}>
    <ModalHeader>{title}</ModalHeader>
    <ModalBody>
      <div data-color-mode="light">
        <MDEditor.Markdown
          source={content}
          style={{ whiteSpace: "pre-wrap" }}
        />
      </div>
    </ModalBody>
    <ModalFooter>
      <div className="hidden sm:block">
        <Button layout="outline" onClick={closeModal}>
          Close
        </Button>
      </div>
    </ModalFooter>
  </Modal>
  )
}

export default Read;
