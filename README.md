# Freelancer Portfolio

A modern, responsive portfolio website for freelancers built with Next.js, React, and Tailwind CSS.

## Features

- Responsive design that looks great on all devices
- Dark mode support
- Animated sections with Framer Motion
- Contact form with email integration
- Portfolio showcase with filtering
- FAQ section
- SEO optimized

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- FormSubmit.co for form handling

## Security Considerations

This project has been set up with security in mind:

1. **Environment Variables**: Sensitive information like email addresses and API keys are stored in environment variables (`.env.local`) and not committed to the repository.

2. **reCAPTCHA Integration**: The contact form includes Google reCAPTCHA to prevent spam and bot submissions.

3. **Form Protection**: The contact form uses FormSubmit.co which includes additional spam protection.

## Setup

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/freelancer-portfolio.git
cd freelancer-portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with the following variables:
```
NEXT_PUBLIC_EMAIL_ADDRESS=your-email@example.com
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Deployment

Before deploying to production:

1. Replace the test reCAPTCHA site key with an actual key from the [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Set up your environment variables on your hosting platform

## License

MIT
