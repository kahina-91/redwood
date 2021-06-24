import BlogLayout from "src/layouts/BlogLayout/BlogLayout"
import { Form, Label, TextField, Submit, TextAreaField, FieldError } from "@redwoodjs/forms/dist"
import { L } from "ts-toolbelt"
import { useMutation } from "@redwoodjs/web"
import { useForm } from 'react-hook-form'
import FormError from "@redwoodjs/forms/dist/FormError"

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const formMethods = useForm()

  const [create, { loading }, error] = useMutation(CREATE_CONTACT,{
    onCompleted: () => {
      formMethods.reset()
      alert('thank you for your message!')
    }
  })

  const onSubmit = (data) => {
    create({variables: { input: data }})
    console.log(data)  }
  return(
      <BlogLayout>
        <Form onSubmit={onSubmit} validation={{ mode: 'onBlur' }} formMethods={formMethods} error={error}>
          <FormError error={error} />
          <Label name="name" errorClassName="error" />
          <TextField name="name" validation={{ required: true }} errorClassName="error" />
          <FieldError name="name" style={{ color: 'red', display: 'block' }} />

          <Label name="email" />
          <TextField name="email" validation={{ required: true, pattern: { value: /[^@]+@[^.]+\..+/} }} errorClassName="error" />
          <FieldError name="email" style={{ color: 'red' }} />

          <Label name="message" />
          <TextAreaField name="message" validation={{ required: true }} errorClassName="error" />
          <FieldError name="name" style={{ color: 'red' }} />

          <Submit disbled={loading}>Save</Submit>
        </Form>
      </BlogLayout>
  ) 

}

export default ContactPage
