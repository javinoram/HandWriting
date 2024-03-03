import TabComponent from "./componentes/menu_pestañas.js";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const metadata = {
  title: "HandWriting",
  description: "Machine learning prediction for hand writing",
};

export default function RootLayout() {

  return (
    <html lang="en">
      <body> 
        <TabComponent></TabComponent>
      </body>
    </html>
  );
}
