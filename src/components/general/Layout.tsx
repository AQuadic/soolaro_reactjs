import { useOutlet, useLocation } from "react-router";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  hideHeader?: boolean;
}

const Layout = ({ hideHeader }: LayoutProps) => {
  const outlet = useOutlet();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname]);

  return (
    <div>
      {!hideHeader && <Header />}
      <div className="min-h-[80vh] ">{outlet}</div>
      <Footer />
    </div>
  );
};

export default Layout;
