import { ComponentMeta, ComponentStory } from '@storybook/react'
import 'app/styles/index.scss'
import img from './ava.jpg'
import { Avatar } from './Avatar'

export default {
  title: 'shared/Avatar',
  component: Avatar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Avatar>

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />

export const Primary = Template.bind({})
Primary.args = {
  size: 164,
  src: img,
}
export const SmallSize = Template.bind({})
SmallSize.args = {
  size: 100,
  src: img,
}
