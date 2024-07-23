import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiTwotoneEyeInvisible } from "react-icons/ai";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";


import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";


import "./auth.css";

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" } });

  const email = watch("email", "");
  const password = watch("password", "");

  let navigate = useNavigate();
  let location = useLocation();
  let from = location.pathname || "/"; //travail sur la redirection

  let login = async () => {
    try {
      let formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      let res = await axios.post("http://127.0.0.1:8000/api/login/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.status === 200) {
        localStorage.setItem("access_token", res.data.data.access_token);
        
        navigate("/admin/dashboard", { replace: true });
      }
    } catch (err) {}
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Connection</h4>
              <hr />
              <div className="form-wrapper">
                <Form onSubmit={handleSubmit(login)}>
                  <Row>
                    <Col>
                      <Form.Group controlId="email">
                        <Form.Label>Identifiant</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="email@email.com"
                          {...register("email", {
                            required: "Mail obligatoire",
                          })}
                          name="email"
                        />
                        {errors.email && (
          <Form.Text className="text-danger">{errors.email.message}</Form.Text>
        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="password">
                        <Form.Label>Mot de passe</Form.Label>
                        <InputGroup>
          <InputGroup.Text>

          </InputGroup.Text>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          placeholder="Mot de passe"
            {...register("password", {
              required: "Mot de passe est obligatoire",
            })}
                          name="password"
                        />
                        </InputGroup>
                        {errors.password && (
          <Form.Text className="text-danger">{errors.password.message}</Form.Text>
        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button
                    variant="primary"
                    className="mt-2"
                    size="lg"
                    block="block"
                    type="submit"
                  >
                    Se connecter
                  </Button>
                  <p className="forgot-password text-right mt-2">
        Mot de passe <a href="#">oublié?</a>
      </p>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
