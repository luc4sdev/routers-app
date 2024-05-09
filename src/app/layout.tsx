import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Sidebar } from "./components/Sidebar";
import { ThemeProvider } from "next-themes";
import { Header } from "./components/Header";
import { Providers } from "@/providers/Providers";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const inter = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Routers App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (


    <html lang="en" suppressHydrationWarning className="antialiased">
      <body className={inter.className}>
        <Providers>
          <ThemeProvider attribute="class">
            <div className="lg:grid min-h-screen lg:grid-cols-app dark:bg-zinc-900">
              <Sidebar />
              <main className="max-w-[100vw] px-4 pb-12 pt-24 lg:col-start-2 lg:px-8 lg:pt-8">
                <Header />
                {children}
              </main>
            </div>
          </ThemeProvider>
          <ToastContainer stacked />
        </Providers>
      </body>

    </html>
  );
}