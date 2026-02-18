import { SimpleForm, TextField } from '@/lib/FormContext'
import { z } from 'zod'

export interface LoginFormProps {
  onSubmit: (data: z.output<typeof LoginFormSchema>) => Promise<void>
}

const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(20),
})

export const LoginForm = (props: LoginFormProps) => {
  return (
    <SimpleForm schema={LoginFormSchema} onSubmit={props.onSubmit}>
      <TextField name="emailOrUsername" label="Email or Username" placeholder="Enter your email or username" />
      <TextField name="password" label="Password" placeholder="Enter your password" type="password" />
    </SimpleForm>
  )
}
