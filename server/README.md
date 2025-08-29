# Fanos Lehulu Server

This is the backend server for the Fanos Lehulu Charity Organization website.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Update the following variables in `.env`:
     - `EMAIL_USER`: Your Gmail address
     - `EMAIL_PASS`: Your Gmail App Password (not your regular password)
     - `ADMIN_EMAIL`: Where contact form messages should be sent (defaults to EMAIL_USER if not set)

3. **Enable Less Secure Apps in Gmail**
   - Go to your Google Account settings
   - Enable "Less secure app access" or create an App Password
   - Use the App Password in the `EMAIL_PASS` variable

4. **Start the Server**
   ```bash
   # Development (with auto-restart)
   npm run dev

   # Production
   npm start
   ```

## API Endpoints

- `POST /api/contact` - Handle contact form submissions

## Security Notes

- Rate limiting is enabled (100 requests per 15 minutes per IP)
- Input validation is performed on both client and server
- Sensitive data is stored in environment variables
