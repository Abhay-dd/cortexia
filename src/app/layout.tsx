import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cortexia AI — Engineering Intelligence. Empowering Businesses.",
  description:
    "Cortexia AI is an Artificial Intelligence company focused on developing intelligent software, AI-powered automation, custom web applications, cloud solutions, and innovative digital products. We help businesses adopt AI through modern engineering, automation, and scalable software.",
  keywords: [
    "AI company",
    "artificial intelligence",
    "machine learning",
    "AI automation",
    "AI chatbots",
    "AI agents",
    "computer vision",
    "NLP",
    "SaaS development",
    "cloud solutions",
    "enterprise software",
    "Cortexia AI",
  ],
  authors: [{ name: "Cortexia AI" }],
  creator: "Cortexia AI",
  publisher: "Cortexia AI",
  metadataBase: new URL("https://cortexia.ai"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cortexia.ai",
    siteName: "Cortexia AI",
    title: "Cortexia AI — Engineering Intelligence. Empowering Businesses.",
    description:
      "We build AI solutions, intelligent automation, modern software, and scalable digital platforms that help businesses innovate faster.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cortexia AI — Engineering Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cortexia AI — Engineering Intelligence. Empowering Businesses.",
    description:
      "We build AI solutions, intelligent automation, modern software, and scalable digital platforms that help businesses innovate faster.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Cortexia AI",
  url: "https://cortexia.ai",
  logo: "https://cortexia.ai/logo.png",
  description:
    "Cortexia AI is an Artificial Intelligence company focused on developing intelligent software, AI-powered automation, custom web applications, cloud solutions, and innovative digital products.",
  sameAs: [
    "https://linkedin.com/company/cortexia-ai",
    "https://github.com/cortexia-ai",
    "https://instagram.com/cortexia.ai",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@cortexia.ai",
    contactType: "customer service",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Francisco",
    addressRegion: "CA",
    addressCountry: "US",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground noise-overlay">
        {children}
      </body>
    </html>
  );
}
