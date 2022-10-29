import { ComponentMeta, ComponentStory } from '@storybook/react'
import 'app/styles/index.scss'
import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import img from 'shared/assets/tests/ava.jpg'
import { ProfileCard } from './ProfileCard'

export default {
  title: 'entity/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfileCard>

const Template: ComponentStory<typeof ProfileCard> = (args) => (
  <ProfileCard {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  data: {
    username: 'admin',
    age: 24,
    country: Country.Armenia,
    name: 'Alexey',
    lastname: 'Nevagno',
    currency: Currency.RUB,
    city: 'Spb',
    avatar: img,
  },
}

export const withError = Template.bind({})
withError.args = {
  error: 'true',
}

export const Loading = Template.bind({})
Loading.args = {
  isLoading: true,
}
