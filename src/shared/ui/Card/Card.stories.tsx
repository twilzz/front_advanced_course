import { ComponentMeta, ComponentStory } from '@storybook/react'
import 'app/styles/index.scss'
import { Text } from '../Text/Text'
import { Card } from './Card'

export default {
  title: 'shared/Button',
  component: Card,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Card>

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: <Text title="title" />,
}
