import React from 'react';
import { Routes, Route } from "react-router-dom"
import { ALayout, Dashboard } from '../admin'
import {Books, CreateBook} from '../admin/books'
import { User, UEdit, UAdd } from '../admin/user'
import {Adverts, CreateAdverts} from '../admin/adverts'

import Error from '../../_utils/Error'

const AdminRouter = () => {
    return (
        <Routes>
            <Route element={<ALayout/>}>
                <Route index element={<Dashboard/>}/>
                <Route path="dashboard" element={<Dashboard/>}/>
                <Route path="users">
                    <Route path="index" element={<User/>}/>
                    <Route path="edit/:uid" element={<UEdit/>}/>
                    <Route path="add" element={<UAdd/>}/>
                </Route>
                <Route path="books">
                    <Route path="index" element={<Books/>}/>
                    <Route path="/books/create" element={<CreateBook/>}/>
                </Route>
                <Route path="adverts">
                    <Route path="index" element={<Adverts/>}/>
                    <Route path="/adverts/create" element={<CreateAdverts/>}/>
                </Route>

                <Route path="*" element={<Error/>}/>
            </Route>
        </Routes>
    );
};

export default AdminRouter;