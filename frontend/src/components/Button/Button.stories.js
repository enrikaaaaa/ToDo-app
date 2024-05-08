import Button from './Button';

export default {
  title: 'Components/Button',
  component: Button,
};

export const DefaultButton = {
  args: {
    children: 'Button',
  },
};

export const PrimaryButton = {
  args: {
    children: 'Primary button',
    primary: true,
  },
};

export const DangerButton = {
  args: {
    children: 'Danger button',
    danger: true,
  },
};

export const InfoButton = {
  args: {
    children: 'Info button',
    info: true,
  },
};
