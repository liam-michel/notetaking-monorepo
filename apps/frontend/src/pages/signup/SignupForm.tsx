import { SimpleForm, TextField } from '@/lib/FormContext'
import { z } from 'zod'

export interface SignupFormProps {
  onSubmit: (data: z.output<typeof SignUpFormSchema>) => Promise<void> 
}
const SignUpFormSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(20),
  password: z.string().min(6).max(20),
})

export const SignupForm = (props: SignupFormProps) => {
  return (
    <SimpleForm schema={SignUpFormSchema} onSubmit={props.onSubmit}>
      <TextField name="email" label="Email" placeholder="Enter your email" />
      <TextField name="username" label="Username" placeholder="Enter your username" />
      <TextField name="password" label="Password" placeholder="Enter your password" type="password" />
    </SimpleForm>
  )
}
