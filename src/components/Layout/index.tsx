import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppData } from 'context';

import Header from 'components/Header';

import './styles.css';

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
    <div className="layout">
      <Header />

      <Outlet />
    </div>
  );
};

export default Layout;
