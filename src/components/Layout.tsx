import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useAppData } from "context";
import { useEffect } from "react";

const Layout = () => {
  const { items } = useAppData();
  const navigate = useNavigate();

  useEffect(() => {
    const isSomeoneLegacy = (items as any[]).some(({ fullPrice }) => fullPrice);
    if (isSomeoneLegacy) {
      navigate('/legacy-items');
      console.log('redirect');
    }
  }, [items]);
  return (
    <>
      <Header />

      <Outlet />
    </>
  );
};

export default Layout;
