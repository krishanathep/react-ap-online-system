import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";

import WithNavbar from "./layouts/WithNavbar";
import WithOutnavbar from "./layouts/WithOutnavbar";

import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";

import Home from './pages/home'

import Overtime from './pages/overtime'
import OvertimeCreate from './pages/overtime/create'
import OvertimeView from './pages/overtime/view'
import OvertimeEdit from './pages/overtime/edit'
import PettyCash from "./pages/pettycash";
import PettyCashCreate from "./pages/pettycash/create";
import TestFunctions from "./pages/test";

const RoutesPage = () => {
  return (
    <Router>
      <Routes>
        <Route element={<WithOutnavbar />}>
          <Route exact  path="/auth/signin" element={<Signin />} />
          <Route path="/auth/signup" element={<Signup />} />
        </Route>
        <Route
          element={
            <RequireAuth loginPath={"/auth/signin"}>
              <WithNavbar />
            </RequireAuth>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/overtime" element={<Overtime />} />
          <Route path="/overtime/create" element={<OvertimeCreate />} />
          <Route path="/overtime/view/:id" element={<OvertimeView />} />
          <Route path="/overtime/edit/:id" element={<OvertimeEdit />} />

          <Route path="/pettycash" element={<PettyCash />} />
          <Route path="/pettycash/create" element={<PettyCashCreate/>}/>
          <Route path='/test' element={<TestFunctions/>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default RoutesPage;
