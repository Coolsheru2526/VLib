import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardAdmin from "./components/DashboardAdmin";
import DashboardUser from "./components/DashboardUser";
import { FlashMessageProvider } from "./context/FlashMessageContext";
import FlashMessage from "./components/FlashMessage";
import "bootstrap/dist/css/bootstrap.min.css";
import BookState from "./context/books/BookState";
import ShowBook from "./components/ShowBook";
import BorrowBook from "./components/BorrowBook";


function App() {
  return (
    <FlashMessageProvider>
      <BookState>
        <Router>
          <Navbar />
          <FlashMessage />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute
                  roleBasedRoutes={{
                    admin: <DashboardAdmin />,
                    student: <DashboardUser />,
                  }}
                />
              }
            />
            <Route
              path="/allBooks"
              element={
                <ProtectedRoute
                  roleBasedRoutes={{
                    student: <ShowBook />,
                  }}
                />
              }
            />
            <Route
              path="/borrowBooks"
              element={
                <ProtectedRoute
                  roleBasedRoutes={{
                    student: <BorrowBook />,
                  }}
                />
              }
            />
          </Routes>
        </Router>
      </BookState>
    </FlashMessageProvider>
  );
}

export default App;
