// modal component to edit a course

import { useState } from 'react'
import Modal from 'react-modal'
import { useMutation, gql } from '@apollo/client'

import { Wrapper, modalStyles } from '../../styles/containers'
import { Btn, Input, Label, Title, TextArea } from '../../styles/items'
import useForm from '../../hooks/useForm'
// import { CREATE_COURSE } from '../../api/mutations'
Modal.setAppElement('#root')

export default ({ isOpen, closeModal, course }) => {
  // const [createCourse] = useMutation(CREATE_COURSE)
  const [required, setRequired] = useState(false)
  const [{ title, code, credits, description }, handleChange] = useForm({
    title: course.course_title,
    code: course.course_code,
    credits: course.credits,
    description: course.course_description,
  })

  return (
    course && (
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="edit course"
        style={modalStyles}
      >
        <Title>Edit Course</Title>
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
            value={course.course_title}
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
            value={course.course_code}
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
            value={course.credits}
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
            checked={course.required}
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
            value={course.course_description}
            onChange={handleChange}
          />
        </Wrapper>
        {title && code && credits ? (
          <Btn
            secondary
            onClick={async () => {
              await createCourse({
                variables: {
                  course_title: title,
                  course_code: code,
                  credits: credits,
                  course_description: description,
                  required: required,
                },
              }).catch((err) => console.log(err))
              console.log(`"${title}" added`)
              closeModal()
            }}
            type="submit"
          >
            save
          </Btn>
        ) : (
          <Btn secondaryDisabled>save</Btn>
        )}
      </Modal>
    )
  )
}
