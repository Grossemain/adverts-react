import React, { useEffect, useRef, useState } from 'react';
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import { Link } from 'react-router-dom'
import { userService } from '../../../_services/user.service';

const Users = () => {
    const [Users, setUsers] = useState([])
    const flag = useRef(false)

    // Récupération de la liste des utilisateurs à l'affichage
    useEffect(() => {
        if(flag.current === false){
            userService.getAllUsers()
                .then(res => {
                    // Liste dans le state
                    setUsers(res.data)
                })
                .catch(err => console.log(err))
        }

        return () => flag.current = true
        
    }, [])

    // Gestion du bouton de suppression d'un utilisateur
    const delUser = (UserId) => {
        userService.deleteUser(UserId)
            .then(res => {
                // Mise à jour du state pour affichage
                setUsers((current) => current.filter(User => User.id !== UserId))
            })
            .catch(err => console.log(err))
    }

    return (        
        <div>
            <div className="container mt-5">
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>id</th>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Created</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Users.map((User) => (
                            <tr key={User.id}>
                                <td>{User.id}</td>
                                <td>{User.name}</td>
                                <td>{User.email}</td>
                                <td>{User.createdAt}</td>
                                <td>
                                    <span className="m-1">
                                    <Button
                                            variant="primary">
                                            <Link className="text-light text-decoration-none"to={`/admin/user/edit/${User.id}`}>Edit</Link>
                                        </Button>
                                    </span>
                                    <span className="m-1">
                                        <Button
                                            variant="danger"
                                            onClick={() => delUser(User.id)}
                                        >
                                            Supprimer
                                        </Button>
                                    </span>
                                    </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            </div>
        </div>
    );
};

export default Users;