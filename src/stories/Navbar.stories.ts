import Navbar from "@/components/navbar/Navbar";
import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Components/Navbar",
  component: Navbar,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
// export const navbarComponent = () => <Navbar />;
