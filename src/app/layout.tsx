import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ThemeProvider } from "next-themes";
import type { Viewport } from "next";

const APP_NAME = "Splitwiser";
const APP_DEFAULT_TITLE = "Splitwiser";
const APP_TITLE_TEMPLATE = "%s - Splitwiser";
const APP_DESCRIPTION = "Splitwise, but better!";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startupImage: []
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [
      { url: "/icons/apple-icon-180.png", sizes: "180x180", type: "image/png" },
      { url: "/icons/apple-icon-152.png", sizes: "152x152", type: "image/png" },
      { url: "/icons/apple-icon-120.png", sizes: "120x120", type: "image/png" },
    ],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider attribute="class" enableSystem defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
