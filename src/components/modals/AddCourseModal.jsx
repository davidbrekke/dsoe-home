// modal component to add a course

import { useState } from 'react'
import Modal from 'react-modal'
import { useMutation } from '@apollo/client'

import { Wrapper, modalStyles } from '../../styles/containers'
import { Btn, Input, Label, Title, TextArea } from '../../styles/items'
import useForm from '../../hooks/useForm'
import { CREATE_COURSE } from '../../api/mutations'
import { GET_COURSES } from '../../api/queries'
Modal.setAppElement('#root')

export default ({ isOpen, closeModal }) => {
  const [createCourse, { error }] = useMutation(CREATE_COURSE, {
    refetchQueries: [{ query: GET_COURSES }],
  })
  const [required, setRequired] = useState(false)
  const [{ title, code, credits, description }, handleChange, reset] = useForm({
    title: '',
    code: '',
    credits: 0,
    description: '',
  })

  const handleAdd = () => {
    createCourse({
      variables: {
        course_title: title,
        course_code: code,
        credits: parseInt(credits),
        course_description: description,
        required: required,
      },
    })
    if (error) console.log(error)

    console.log(`successssfully added`)
    closeModal()
    setRequired(false)
    reset()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="add course"
      style={modalStyles}
    >
      <Title>Add a Course</Title>
      <Wrapper
        glass
        padding="0 1rem 1rem 1rem"
        radius=".5rem"
        width="auto"
        margin="1rem"
        column
      >
        <Label modal>title</Label>
        <Input
          name="title"
          fontSize="1.25rem"
          placeholder="title..."
          modal
          value={title}
          onChange={handleChange}
        />
      </Wrapper>
      <Wrapper
        glass
        padding="0 1rem 1rem 1rem"
        radius=".5rem"
        width="auto"
        margin="1rem"
        column
      >
        <Label modal>code</Label>
        <Input
          name="code"
          fontSize="1.25rem"
          placeholder="code..."
          modal
          value={code}
          onChange={handleChange}
        />
      </Wrapper>
      <Wrapper
        glass
        padding="0 1rem 1rem 1rem"
        radius=".5rem"
        width="min-content"
        margin="1rem"
        column
      >
        <Label modal>credits</Label>
        <Input
          name="credits"
          fontSize="1.25rem"
          type="number"
          min="0"
          max="4"
          modal
          value={credits}
          onChange={handleChange}
        />
      </Wrapper>
      <Wrapper
        glass
        padding="1rem "
        radius=".5rem"
        width="auto"
        margin="1rem"
        alignItems="center"
        justifyContent="center"
      >
        <Input
          name="required"
          type="checkbox"
          modal
          checked={required}
          onChange={(evt) => setRequired(evt.target.checked)}
        />
        <Label modal>required</Label>
      </Wrapper>
      <Wrapper
        glass
        padding="0 1rem 1rem 1rem"
        radius=".5rem"
        width="auto"
        margin="1rem"
        column
      >
        <Label modal>description</Label>
        <TextArea
          name="description"
          placeholder="description..."
          modal
          value={description}
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
