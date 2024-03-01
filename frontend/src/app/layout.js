import Home  from "./page.js";
import "./globals.css";

export const metadata = {
  title: "HandWriting",
  description: "Machine learning prediction for hand writing hiragana",
};

export default function RootLayout() {
  return (
    <html lang="en">
      <body> 
        <Home></Home>
      </body>
    </html>
  );
}
