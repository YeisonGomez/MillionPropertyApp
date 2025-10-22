export const theme = {
  colors: {
    primary: '#FF385C',
    primaryHover: '#ff1744',
    secondary: '#f0f2f5',
    text: '#262626',
    textSecondary: '#8c8c8c',
    border: '#d9d9d9',
    background: '#ffffff',
  },
  spacing: {
    borderRadius: 8,
  },
} as const;

export const antdTheme = {
  token: {
    colorPrimary: theme.colors.primary,
    colorLink: theme.colors.primary,
    colorLinkHover: theme.colors.primaryHover,
    borderRadius: theme.spacing.borderRadius,
  },
};

export const cssVariables = {
  '--primary-color': theme.colors.primary,
  '--primary-color-hover': theme.colors.primaryHover,
  '--secondary-color': theme.colors.secondary,
  '--text-color': theme.colors.text,
  '--text-secondary': theme.colors.textSecondary,
  '--border-color': theme.colors.border,
  '--background-color': theme.colors.background,
} as const;

