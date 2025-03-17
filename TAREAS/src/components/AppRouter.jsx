import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Tasks from './Tasks';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tasks" element={<Tasks />} />
    </Routes>
  );
};

export default AppRouter;
