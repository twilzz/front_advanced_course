import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Text, TextTheme } from './Text'

export default {
  title: 'shared/Text',
  component: Text,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Text>

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />

export const Normal = Template.bind({})
Normal.args = {
  title: 'Lorem',
  text: 'Ipsum',
}

export const onlyTitle = Template.bind({})
onlyTitle.args = {
  title: 'Lorem',
}

export const onlyText = Template.bind({})
onlyText.args = {
  text: 'Ipsum',
}
export const ErrorText = Template.bind({})
ErrorText.args = {
  title: 'Lorem',
  text: 'Ipsum',
  theme: TextTheme.ERROR,
}
