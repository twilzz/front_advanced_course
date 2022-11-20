import { ComponentMeta, ComponentStory } from '@storybook/react'
import 'app/styles/index.scss'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator'
import { CommentList } from './CommentList'

export default {
  title: 'entities/CommentList',
  component: CommentList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentList>

const Template: ComponentStory<typeof CommentList> = (args) => (
  <CommentList {...args} />
)

export const Normal = Template.bind({})
Normal.args = {
  comments: [
    {
      id: '1',
      text: 'hello!',
      user: { id: '1', username: 'Vova' },
    },
    {
      id: '2',
      text: 'HI!',
      user: { id: '2', username: 'Gleb' },
    },
  ],
  isLoading: true,
}
Normal.decorators = [StoreDecorator({})]

export const isLoading = Template.bind({})
Normal.args = {
  comments: [],
  isLoading: true,
}
Normal.decorators = [StoreDecorator({})]
