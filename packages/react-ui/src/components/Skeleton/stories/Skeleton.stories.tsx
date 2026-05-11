import { Meta, StoryObj } from "@storybook/react";
import { Skeleton, TableSkeleton } from "../Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "```tsx\nimport { Skeleton, TableSkeleton } from '@openuidev/react-ui';\n```",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["!dev", "autodocs"],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: () => <Skeleton count={3} />,
  parameters: {
    docs: {
      description: {
        story: "A stack of generic skeleton bars with a pulsing opacity animation.",
      },
    },
  },
};

export const Table: Story = {
  render: () => <TableSkeleton rows={4} columns={3} />,
  parameters: {
    docs: {
      description: {
        story: "A table-shaped skeleton placeholder used while query data is loading.",
      },
    },
  },
};
