import { useState } from "react";
import axios from "axios";
import { Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import './Signup.css';

const Signup = ({ handleSignUpCancel, showLoginModal }) => {
  const [form] = Form.useForm();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (values) => {
    try {
      const url = "http://localhost:5000/api/signup";
      const response = await axios.post(url, values);
      console.log(response.data.message);
      setSuccess(response.data.message);

      if (response.status === 201) {
        form.resetFields();
      }
    } catch (err) {
      console.log(err.response.data.message);
      setError(err.response.data.message);
    }
  };

  return (
    <>
      <div className="signup_container">
        <div className="signup_form_container">
          <div className="left-signUp">
            <h1>Have an Account</h1>
            <button
              type="button"
              className="white_btn"
              style={{ color: "#208854" }}
              onClick={() => {
                handleSignUpCancel();
                showLoginModal();
              }}
            >
              Login
            </button>
          </div>

          <div className="right-signUp">
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={(values) => {
                handleSubmit(values);
              }}
              autoComplete="off"
              form={form}
            >
              <h1 style={{ fontSize: "35px" }}>Create Your Account</h1>
              <Form.Item
                name="userName"
                rules={[
                  { required: true, message: "Please input your username" },
                  {
                    min: 5,
                    message: "Username should be at least 5 characters long",
                  },
                  { whitespace: true, message: "Username cannot be empty" },
                ]}
                hasFeedback
              >
                <Input
                  prefix={
                    <UserOutlined
                      style={{ color: "#208854", fontSize: "18px" }}
                    />
                  }
                  placeholder="Enter your Username"
                  className="input"
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email" },
                  { type: "email", message: "Please enter a valid email" },
                  { whitespace: true, message: "Email cannot be empty" },
                ]}
                hasFeedback
              >
                <Input
                  prefix={
                    <MailOutlined
                      style={{ color: "#208854", fontSize: "18px" }}
                    />
                  }
                  placeholder="Enter your email"
                  className="input"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password" },
                  {
                    whitespace: true,
                    message: "Password cannot be empty",
                    type: "password",
                  },
                  {
                    min: 9,
                    message: "Password must be at least 8 characters long",
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  prefix={
                    <LockOutlined
                      style={{ color: "#208854", fontSize: "18px" }}
                    />
                  }
                  placeholder="Enter your password"
                  className="input"
                />
              </Form.Item>

              <Form.Item>
                {success && <div className="success_msg">{success}</div>}
                {error && <div className="error_msg">{error}</div>}
                <Button
                  type="primary"
                  htmlType="submit"
                  className="green_btn"
                  style={{ backgroundColor: "#208854" }}
                >
                  Signup
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
