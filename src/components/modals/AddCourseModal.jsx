import Modal from 'react-modal'

import { Wrapper } from '../../styles/containers'
import { Btn, Input, Label, Text } from '../../styles/items'
import useForm from '../hooks/useForm'
Modal.setAppElement('#root')

export default ({ isOpen, closeModal }) => {
  const [{ title, code, credits }, handleChange] = useForm({
    title: '',
    code: '',
    credits: '',
  })

  const handleAdd = () => {
    /**
     * TODO
     */
    console.log(`"${title}" added`)
    closeModal()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="add course"
      style={modalStyles}
    >
      <Text color="white" fontSize="2rem">
        add course
      </Text>
      <Wrapper width="auto" margin="1rem" column>
        <Label modal>title</Label>
        <Input
          name="title"
          fontSize="1.25rem"
          border
          placeholder="title"
          modal
          value={title}
          onChange={handleChange}
        />
      </Wrapper>
      <Wrapper width="auto" margin="1rem" column>
        <Label modal>code</Label>
        <Input
          name="code"
          fontSize="1.25rem"
          border
          placeholder="code"
          modal
          value={code}
          onChange={handleChange}
        />
      </Wrapper>
      <Wrapper width="auto" margin="1rem" column>
        <Label modal>credits</Label>
        <Input
          name="credits"
          fontSize="1.25rem"
          border
          placeholder="credits"
          modal
          value={credits}
          onChange={handleChange}
        />
      </Wrapper>
      {title && code && credits ? (
        <Btn secondary onClick={handleAdd}>
          add
        </Btn>
      ) : (
        <Btn secondaryDisabled>add</Btn>
      )}
    </Modal>
  )
}

const modalStyles = {
  content: {
    margin: 'auto',
    width: 'max-content',
    height: 'max-content',
    position: 'absolute',
    borderRadius: '1em',
    border: 'none',
    background: '#9e2933',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '2px 2px 20px 3px rgba(0,0,0,.45)',
  },
  overlay: {
    background: 'rgba(255, 255, 255, 0.85)',
  },
}
