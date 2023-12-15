import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppData } from "context";

import Header from "./Header";

const Layout = () => {
  const { items } = useAppData();
  const navigate = useNavigate();

  useEffect(() => {
    const isSomeoneLegacy = (items as any[]).some(({ fullPrice }) => fullPrice);
    if (isSomeoneLegacy) {
      navigate('/legacy-items');
    }
  }, [items, navigate]);

  return (
    <>
      <Header />

      <Outlet />
    </>
  );
};

export default Layout;
