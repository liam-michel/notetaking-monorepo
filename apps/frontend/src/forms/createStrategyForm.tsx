import { AddStrategySchema, EconomySchema, MapSchema, SideSchema, type AddStrategyInput } from '@cs2monorepo/shared'
import { createForm } from '@/lib/FormContext'

const { Form, TextField, TextAreaField, SelectField } = createForm(AddStrategySchema)

export const CreateStrategyForm = ({ onSubmit }: { onSubmit: (data: AddStrategyInput) => Promise<void> }) => (
  <Form onSubmit={onSubmit}>
    <TextField name="name" label="Title" placeholder="Enter strategy title" />
    <SelectField name="map" label="Map" options={MapSchema.options.map((opt) => ({ value: opt, label: opt }))} />
    <SelectField name="side" label="Side" options={SideSchema.options.map((opt) => ({ value: opt, label: opt }))} />
    <SelectField
      name="economy"
      label="Economy"
      options={EconomySchema.options.map((opt) => ({ value: opt, label: opt }))}
    />
    <TextAreaField name="description" label="Description" placeholder="Describe your strategy in detail" />
  </Form>
)
