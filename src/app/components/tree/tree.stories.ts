import { TreeComponent } from './tree.component';
import { Story, Meta } from '@storybook/angular/types-6-0';
export default {
  title: 'UI/Tree',
  component: TreeComponent,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<TreeComponent> = (args: TreeComponent) => ({
  component: TreeComponent,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Button',
};
