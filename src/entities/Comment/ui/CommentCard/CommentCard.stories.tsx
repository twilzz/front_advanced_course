import { ComponentMeta, ComponentStory } from '@storybook/react'
import 'app/styles/index.scss'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator'
import { CommentCard } from './CommentCard'

export default {
  title: 'entities/CommentCard',
  component: CommentCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentCard>

const Template: ComponentStory<typeof CommentCard> = (args) => (
  <CommentCard {...args} />
)

export const Normal = Template.bind({})
Normal.args = {
  comment: {
    id: '1',
    text: 'hello!',
    user: { id: '1', username: 'Vova' },
  },
  isLoading: false,
}
Normal.decorators = [StoreDecorator({})]

export const isLoading = Template.bind({})
Normal.args = {
  comment: {
    id: '1',
    text: 'hello!',
    user: { id: '1', username: 'Vova' },
  },
  isLoading: true,
}
Normal.decorators = [StoreDecorator({})]
