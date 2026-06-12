# Web (Frontend)

Frontend for the real-time chat and video calling application built with React and Vite.

## Tech Stack

- React
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Cloudinary
- Stream Video SDK
- Stream Chat SDK

## Features

- Authentication
- User onboarding
- Profile management
- Friend system
- Real-time messaging
- Video calling
- Image uploads
- Protected routes
- Responsive design
- Modern UI/UX

## Environment Variables

Create a `.env` file inside the `web` directory:

```env
MODE=

VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=

VITE_STREAM_API_KEY=
```

### Environment Variable Details

| Variable | Description |
|----------|-------------|
| MODE | Current application environment |
| VITE_CLOUDINARY_CLOUD_NAME | Your Cloudinary cloud name |
| VITE_CLOUDINARY_UPLOAD_PRESET | Cloudinary upload preset |
| VITE_STREAM_API_KEY | Stream Video & Chat API key |

## Installation

Using npm:

```bash
npm install
```

Using Bun:

```bash
bun install
```

## Running Locally

Using npm:

```bash
npm run dev
```

Using Bun:

```bash
bun run dev
```

## Production Build

Using npm:

```bash
npm run build
```

Using Bun:

```bash
bun run build
```

## Folder Structure

```text
web/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── store/
│   ├── lib/
│   └── utils/
├── .env
├── package.json
├── vite.config.js
└── README.md
```

## Notes

- Make sure all environment variables are configured before starting the application.
- Cloudinary is used for image uploads and profile pictures.
- Stream powers the real-time chat and video calling functionality.
- The application is optimized for desktop, tablet, and mobile devices.
- Use the backend API server alongside the frontend for full functionality.

## License

This project is provided for learning and personal development purposes.