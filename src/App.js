import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AccountTable from './components/AccountTable';
import AccountForm from './components/AccountForm';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AccountTable />} />
        <Route path="/create" element={<AccountForm />} />
        <Route path="/report" element={<div className="p-8">Account Report Placeholder</div>} />
        <Route path="/upload" element={<div className="p-8">Account Upload Placeholder</div>} />
      </Routes>
    </Layout>
  );
}

export default App;
