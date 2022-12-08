import { ComponentMeta, ComponentStory } from '@storybook/react'
import 'app/styles/index.scss'
import { ArticleView } from 'entities/Article'

import { ArticleList } from './ArticleList'

export default {
  title: 'entity/ArticleDetailed',
  component: ArticleList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleList>

const Template: ComponentStory<typeof ArticleList> = (args) => (
  <ArticleList {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}

export const isLoadingBig = Template.bind({})
isLoadingBig.args = {
  isLoading: true,
  articles: [],
  view: ArticleView.BIG,
}

export const isLoadingSmall = Template.bind({})
isLoadingSmall.args = {
  isLoading: true,
  articles: [],
  view: ArticleView.SMALL,
}
