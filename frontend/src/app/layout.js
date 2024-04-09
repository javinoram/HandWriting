import TabComponent from "./componentes/menu_pestañas.js";

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
