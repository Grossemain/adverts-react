import React from 'react';
import { Routes, Route } from "react-router-dom"

import Register from '../../pages/public/Register'
import { Layout, Home, Adverts } from '../../pages/public/'
import Error from '../../_utils/Error'

const PublicRouter = () => {
    return (
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="adverts" element={<Adverts />} />
            <Route path="register" element={<Register />} />

            <Route path="*" element={<Error />} />
          </Route>

        </Routes>
    );
};

export default PublicRouter;