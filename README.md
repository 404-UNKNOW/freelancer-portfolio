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
- [Resend](https://resend.com) - Email API for contact form

## Getting Started

### Prerequisites

- Node.js 14.6.0 or newer
- npm or yarn
- [Resend](https://resend.com) account (free tier available)

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
EMAIL_ADDRESS=your-email@example.com
RESEND_API_KEY=re_xxxxxxxxxxxx  # Get this from Resend dashboard
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Setting Up Email with Resend

This project uses [Resend](https://resend.com) to handle contact form submissions. Resend is a modern email API service with a generous free tier (100 emails/month).

1. **Create a Resend Account**
   - Sign up at [resend.com](https://resend.com/signup)
   - Verify your account and domain (if desired)

2. **Get your API Key**
   - Go to the [API Keys](https://resend.com/api-keys) section in your Resend dashboard
   - Create a new API key
   - Copy the API key and add it to your `.env.local` file as `RESEND_API_KEY`

3. **Understanding Email Sending**
   - During development or when first deploying, emails will be sent from `onboarding@resend.dev`
   - For production use, you can verify your domain in the Resend dashboard
   - The contact form is set up to use your `EMAIL_ADDRESS` as the recipient

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
   
4. **Configure Environment Variables**
   - In the Vercel project settings, add environment variables:
   - Add `EMAIL_ADDRESS` with your email address (this will only be available server-side)
   - Add `RESEND_API_KEY` with your Resend API key

5. **Deploy**
   - Click "Deploy" and wait for the build to complete
   - Your site will be accessible at a `.vercel.app` URL 

6. **Custom Domain (Optional)**
   - In project settings, navigate to "Domains"
   - Add your custom domain and follow the verification steps

The project includes a `vercel.json` configuration file with optimized settings for security headers and regional deployment.

## Security Considerations

This project includes several security measures:

1. **Environment Variables**: Sensitive information like email addresses and API keys are stored in environment variables that are only accessible on the server side.

2. **API Routes**: Contact form submissions are processed through a server-side API route, keeping your email address hidden from client-side code.

3. **Honeypot Trap**: The contact form includes a hidden honeypot field to detect and prevent spam submissions from bots.

4. **Form Validation**: Input validation is performed on both client and server sides.

5. **gitignore**: Sensitive files like `.env.local` are included in `.gitignore` to prevent accidentally committing them.

6. **Security Headers**: When deployed on Vercel, the application uses security headers to protect against common vulnerabilities.

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
- Email functionality powered by [Resend](https://resend.com)
