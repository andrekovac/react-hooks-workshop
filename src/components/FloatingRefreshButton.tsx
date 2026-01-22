import { useRefresh } from '../contexts/RefreshContext';
import './FloatingRefreshButton.css';

const FloatingRefreshButton = () => {
  const { refresh } = useRefresh();

  return (
    <button className="floating-refresh-button" onClick={refresh} title="Reset Example State">
      🔄
    </button>
  );
};

export default FloatingRefreshButton;
