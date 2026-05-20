import "./globals.css";

export const metadata = {
  title: "Login - ConhecendoIA",
  description: "Entre no maior fórum de Inteligência Artificial",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}
