# Watermelon component guide

Use the existing homepage at `/` and its `landing-01` components as the visual reference for new screens. Start by checking the actual landing components and the nearest equivalent screen in this app. Look in the Watermelon registry when the repository lacks a suitable component, then adapt the chosen component to the app's real content and theme.

## Visual style

- Use the Geist fonts and the shared tokens from `src/app/globals.css`. Use Geist Sans with tight tracking for headings. Use Geist Mono for amounts, codes, compact labels, and action buttons.
- Match the landing page's near-black canvas in dark mode and use shared background and foreground tokens in light mode. Keep text readable in both themes. Use the existing lime primary for actions, active states, and meaningful icons.
- Use straight edges, thin borders, and the landing page's corner marks on dashboard panels. Use subtle dot grids, guide rings, and lime glow in the page header and shared shell. Keep form fields and dense activity rows quiet so the data stays legible.
- Use the same lime button treatment for primary actions and outlined controls for secondary actions. For short sets of options such as UPI and PayPal, use labeled selection tiles with a visible selected state and keyboard focus. Use visible labels, action feedback, and disabled states where the flow needs them.

## Dashboard

- Build pages inside `CreatorShell` in `src/components/watermelon/creator-shell.tsx`. It provides the dashboard masthead, theme toggle, desktop sidebar, and mobile drawer. Add dashboard destinations to its shared navigation.
- Use `CreatorPageHero` for page headers, `CreatorPanel` for content sections, and `CreatorFrameCorners` for custom framed surfaces. Follow Wallet for numeric summaries and forms, Profile for identity and detail sections, and Admin for compact lists and row actions.
- Arrange related sections in a grid on wide screens and stack them in reading order on mobile. Let long handles, codes, and payout destinations wrap. Use real data or clearly labeled sample data, and provide an empty state when a section can have no records.
- Review the rendered page against the homepage and its neighboring dashboard pages. Check a desktop and mobile width, light and dark themes, and keyboard focus before calling a visual change finished.

## Onboarding

- `OnboardingApplicationSetup` for the creator application, with the shared dashboard hero, framed progress, and form actions. `CreatorEntryShell` provides the shared masthead and background for onboarding and sign-in.
- `OnboardingSetupInput` for square, monospace fields in the creator application.
- `Checkbox13` for age confirmation and agreements with a selectable card.
- `RadioGroup7` for paired Yes/No choices.
- `OnboardingFields`, `OnboardingFieldLabel`, `OnboardingFieldError`, and `OnboardingStepHeading` for onboarding form layout and feedback.

Reuse Watermelon’s component styles and keep custom classes out of onboarding route files.