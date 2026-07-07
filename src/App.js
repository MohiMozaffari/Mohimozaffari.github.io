import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import ScrollToTop from "./components/ScrollToTop";
import PageviewTracker from "./components/PageviewTracker";
import Home from './pages/Home';
import About from './pages/About';
import Research from './pages/Research';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Teaching from './pages/Teaching';
import Contact from './pages/Contact';
import Layout from './components/Layout';
import ParticleBackground from './components/ParticleBackground';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import './App.css';

const PublicLayout = () => (
  <Layout>
    <Outlet />
  </Layout>
);

function App() {
  return (
    <div className="App relative">
      <ParticleBackground />
      <BrowserRouter>
        <ScrollToTop behavior="smooth" />
        <PageviewTracker />
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/research" element={<Research />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/teaching" element={<Teaching />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
