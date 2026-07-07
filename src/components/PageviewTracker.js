import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { recordPageview } from '../api/analytics';

const PageviewTracker = () => {
  const location = useLocation();

  useEffect(() => {
    recordPageview(location.pathname);
  }, [location.pathname]);

  return null;
};

export default PageviewTracker;
