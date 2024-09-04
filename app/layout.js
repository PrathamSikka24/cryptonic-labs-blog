"use client"; // Marks the component as Client-side

import { Inter } from "next/font/google";
import '../styles/globals.scss';  // Make sure this is the correct path to your SCSS file
import React from "react";
import { Layout } from "../components";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
