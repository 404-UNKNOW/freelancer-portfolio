# Freelancer Portfolio Website

A modern portfolio website for freelancers built with Next.js and TailwindCSS. This project showcases a professional portfolio with sections for services, projects, testimonials, and contact information.

## Features

- Responsive design for all devices
- Dark mode support
- Animated UI elements using Framer Motion
- Contact form with email integration
- Portfolio showcase with filtering
- FAQ section
- SEO optimized

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library

## Getting Started

### Prerequisites

- Node.js 14.6.0 or newer
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/freelancer-portfolio.git
cd freelancer-portfolio
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with the following variables:
```
NEXT_PUBLIC_EMAIL_ADDRESS=your-email@example.com
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Security Considerations

This project includes several security measures:

1. **Environment Variables**: Sensitive information like email addresses are stored in environment variables rather than being hardcoded.

2. **Honeypot Trap**: The contact form includes a hidden honeypot field to detect and prevent spam submissions from bots.

3. **Form Validation**: Input validation is performed on both client and server sides.

4. **gitignore**: Sensitive files like `.env.local` are included in `.gitignore` to prevent accidentally committing them.

### Important Setup for Deployment

When deploying this project, make sure to:

1. Set up environment variables on your hosting platform
2. Consider adding additional security measures such as reCAPTCHA for the contact form
3. Keep your dependencies updated to address any security vulnerabilities

## Customization

You can customize the portfolio by:

1. Updating project information in the `projects` array in `PortfolioSection.tsx`
2. Modifying services in the `services` array in `ServicesSection.tsx`
3. Changing the FAQ content in the `faqs` array in `FAQSection.tsx`
4. Updating personal information and contact details in `ContactSection.tsx` and `AboutSection.tsx`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- All icons provided by [React Icons](https://react-icons.github.io/react-icons/)
- Design inspiration from various sources on Dribbble and Behance
