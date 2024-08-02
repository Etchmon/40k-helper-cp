import { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button",
    variant: "default",
  },
};

export const Secondary: Story = {
  args: {
    children: "Button",
    variant: "secondary",
  }
}

export const Destructive: Story = {
  args: {
    children: "Button",
    variant: "destructive",
  }
}

export const Yellow: Story = {
  args: {
    children: "Button",
    variant: "yellow",
  }
}
