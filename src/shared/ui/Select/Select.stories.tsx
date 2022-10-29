import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Select } from './Select'

export default {
  title: 'shared/Select',
  component: Select,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Select>

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />

export const Primary = Template.bind({})
Primary.args = {
  label: 'Значение',
  options: [
    { value: '123', content: '1 пункт' },
    { value: '456', content: '2 пункт' },
  ],
}
