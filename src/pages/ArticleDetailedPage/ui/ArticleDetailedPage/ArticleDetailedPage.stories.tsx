import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Theme } from 'app/providers/ThemeProvider'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import ArticleDetailedPage from './ArticleDetailedPage'

export default {
  title: 'pages/ArticleDetailedPage',
  component: ArticleDetailedPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleDetailedPage>

const Template: ComponentStory<typeof ArticleDetailedPage> = (args) => <ArticleDetailedPage />

export const Normal = Template.bind({})
Normal.args = {}

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK)]
