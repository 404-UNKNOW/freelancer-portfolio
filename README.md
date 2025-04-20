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
- [EmailJS](https://www.emailjs.com/) - Email API for contact form

## Getting Started

### Prerequisites

- Node.js 14.6.0 or newer
- npm or yarn
- [EmailJS](https://www.emailjs.com/) account (free tier available)

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

3. Configure EmailJS (see detailed instructions in `src/app/sections/README-EMAILJS.md`)
   - Create an EmailJS account
   - Set up email service and template
   - Update the config in `src/app/sections/ContactSection.tsx`

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Setting Up Email with EmailJS

This project uses [EmailJS](https://www.emailjs.com/) to handle contact form submissions. EmailJS is a service that allows you to send emails directly from client-side JavaScript code, without needing a backend.

### Key Benefits

1. **Simple to Set Up**: No server-side code required
2. **Generous Free Tier**: 200 emails per month on the free plan
3. **Secure**: Your email credentials are never exposed in your code
4. **Direct Integration**: Works with most email providers like Gmail, Outlook, etc.

### Quick Setup

1. **Create an EmailJS Account**
   - Sign up at [emailjs.com](https://www.emailjs.com/signup)
   - Verify your account

2. **Connect Your Email Service**
   - Add a new email service (Gmail, Outlook, etc.)
   - Follow the authentication steps

3. **Create an Email Template**
   - Create a template with variables for name, email, subject, and message
   - Note the template ID

4. **Update Your Config**
   - Set the service ID, template ID, and public key in the ContactSection component

For detailed instructions, see `src/app/sections/README-EMAILJS.md`.

## Deployment on Vercel

This project is optimized for deployment on Vercel. Follow these steps to deploy:

1. **Create a Vercel Account**
   - Sign up at [vercel.com](https://vercel.com) if you don't have an account

2. **Install Vercel CLI (Optional)**
   ```bash
   npm install -g vercel
   ```

3. **Deploy using GitHub Integration**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Configure the project:
     - Framework Preset: Next.js
     - Root Directory: `./` (default)
     - Build Command: `next build`
     - Output Directory: `.next`
   
4. **Deploy**
   - Click "Deploy" and wait for the build to complete
   - Your site will be accessible at a `.vercel.app` URL 

5. **Custom Domain (Optional)**
   - In project settings, navigate to "Domains"
   - Add your custom domain and follow the verification steps

The project includes a `vercel.json` configuration file with optimized settings for security headers and regional deployment.

## Security Considerations

This project includes several security measures:

1. **API Routes**: Contact form submissions are processed through a server-side API route for initial validation.

2. **Client-Side Email**: Email sending is handled securely by EmailJS on the client side.

3. **Honeypot Trap**: The contact form includes a hidden honeypot field to detect and prevent spam submissions from bots.

4. **Form Validation**: Input validation is performed on both client and server sides.

5. **gitignore**: Sensitive files are included in `.gitignore` to prevent accidentally committing them.

6. **Security Headers**: When deployed on Vercel, the application uses security headers to protect against common vulnerabilities.

### Important Setup for Deployment

When deploying this project, make sure to:

1. Configure EmailJS properly with your service and template IDs
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
- Email functionality powered by [EmailJS](https://www.emailjs.com/)
