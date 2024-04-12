import { Inter } from "next/font/google";
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Handwritting",
  description: "Web interface to read characters",
};

export default function RootLayout({ children }) {

  /* 
  First div contain the nav, the nav will remain in any component. To connect the component we use
  Link from next/link.
  The second one render the selected component.
  */
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <nav className="nav">
            <Link className="nav-link" href="/">Home</Link>
            <Link className="nav-link" href="/dibujo">Draw the character</Link>
            <Link className="nav-link" href="/subida">Upload an image</Link>
          </nav>
        </div>

        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
