import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import 'app/styles/index.scss'
import LoginForm from './LoginForm'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator'

export default {
  title: 'features/LoginForm',
  component: LoginForm,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof LoginForm>

const Template: ComponentStory<typeof LoginForm> = (args) => (
  <LoginForm {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.decorators = [
  StoreDecorator({
    loginForm: { username: '123', password: '123' },
  }),
]
export const withError = Template.bind({})
withError.args = {}
Primary.decorators = [
  StoreDecorator({
    loginForm: { username: '123', password: '123', error: 'ERR' },
  }),
]
export const Loading = Template.bind({})
Loading.args = {}
Primary.decorators = [
  StoreDecorator({
    loginForm: { isLoading: true },
  }),
]
