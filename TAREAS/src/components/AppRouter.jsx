import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Tasks from './Tasks';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/tasks" element={<Tasks />} />
    </Routes>
  );
};

export default AppRouter;
