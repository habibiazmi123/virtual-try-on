import React,{ useRef, useState, useEffect } from "react"
import handImages from "../public/handImages.svg"
import {
  Text,
  Button,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Link,
} from "@chakra-ui/react"

export default function About(image) {
  console.log(image)
  const { isOpen, onOpen, onClose } = useDisclosure()
  // const imagecapturess=image.state.image
  // const [imageCapture, setImageCapture]=useState(imagecapturess)
  //console.log(imageCapture)

  return (
    <div>
      <Button onClick={onOpen} colorScheme="orange">
        On Model
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered width={"100%"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Hasil Capture</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="sm">
              
            </Text>
            <Image src={ image.state.image } />
            <Text fontSize="sm">
              created by{" "}
              <Link
                href="https://arba.co.id"
                isExternal
                color="orange.300"
              >
                Arba.co.id
              </Link>
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
