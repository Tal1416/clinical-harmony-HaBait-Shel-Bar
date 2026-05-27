import Sidebar from './Sidebar.jsx';
import TopNav from './TopNav.jsx';

export default function Layout({ title, activeTab, children }) {
  return (
    <>
      <Sidebar />
      <TopNav title={title} activeTab={activeTab} />
      {children}
    </>
  );
}
