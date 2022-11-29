import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Flex } from './Flex'

export default {
  title: 'shared/Flex',
  component: Flex,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Flex>

const Template: ComponentStory<typeof Flex> = (args) => <Flex {...args} />

export const Row = Template.bind({})
Row.args = {
  children: (
    <>
      <div>1 row</div>
      <div>2 row</div>
      <div>3 row</div>
      <div>4 row</div>
    </>
  ),
}
export const Column = Template.bind({})
Column.args = {
  direction: 'column',
  children: (
    <>
      <div>1 row</div>
      <div>2 row</div>
      <div>3 row</div>
      <div>4 row</div>
    </>
  ),
}

export const RowGap4 = Template.bind({})
Row.args = {
  gap: '4',
  children: (
    <>
      <div>1 row</div>
      <div>2 row</div>
      <div>3 row</div>
      <div>4 row</div>
    </>
  ),
}

export const RowGap16 = Template.bind({})
Row.args = {
  gap: '16',
  children: (
    <>
      <div>1 row</div>
      <div>2 row</div>
      <div>3 row</div>
      <div>4 row</div>
    </>
  ),
}

export const ColumnGap4 = Template.bind({})
ColumnGap4.args = {
  direction: 'column',
  gap: '4',
  children: (
    <>
      <div>1 row</div>
      <div>2 row</div>
      <div>3 row</div>
      <div>4 row</div>
    </>
  ),
}

export const ColumnGap16 = Template.bind({})
ColumnGap16.args = {
  direction: 'column',
  gap: '16',
  children: (
    <>
      <div>1 row</div>
      <div>2 row</div>
      <div>3 row</div>
      <div>4 row</div>
    </>
  ),
}
