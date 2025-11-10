import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { registerMember } from '../api/auth';

const { Title } = Typography;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await registerMember(values);
      if (response.tokens && response.tokens.access) {
        localStorage.setItem('token', response.tokens.access);
        message.success('Регистрация прошла успешно!');
        navigate('/profile');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        if (typeof errorData === 'object') {
          Object.keys(errorData).forEach(key => {
            const errorMessages = Array.isArray(errorData[key]) 
              ? errorData[key].join(', ') 
              : errorData[key];
            message.error(`${key}: ${errorMessages}`);
          });
        } else {
          message.error('Ошибка при регистрации');
        }
      } else {
        message.error('Ошибка при регистрации');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      data-easytag="id1-react/src/pages/Register.js"
      className="min-h-screen flex items-center justify-center bg-gray-100 p-4"
    >
      <Card className="w-full max-w-md shadow-lg">
        <div className="text-center mb-6">
          <Title level={2} data-easytag="id2-react/src/pages/Register.js">
            Регистрация
          </Title>
        </div>
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          layout="vertical"
          size="large"
          data-easytag="id3-react/src/pages/Register.js"
        >
          <Form.Item
            name="email"
            label="Электронная почта"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите email!',
              },
              {
                type: 'email',
                message: 'Введите корректный email!',
              },
            ]}
            data-easytag="id4-react/src/pages/Register.js"
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder="Email"
              data-easytag="id5-react/src/pages/Register.js"
            />
          </Form.Item>

          <Form.Item
            name="first_name"
            label="Имя"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите имя!',
              },
            ]}
            data-easytag="id6-react/src/pages/Register.js"
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Имя"
              data-easytag="id7-react/src/pages/Register.js"
            />
          </Form.Item>

          <Form.Item
            name="last_name"
            label="Фамилия"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите фамилию!',
              },
            ]}
            data-easytag="id8-react/src/pages/Register.js"
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Фамилия"
              data-easytag="id9-react/src/pages/Register.js"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Пароль"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите пароль!',
              },
              {
                min: 6,
                message: 'Пароль должен быть не менее 6 символов!',
              },
            ]}
            data-easytag="id10-react/src/pages/Register.js"
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="Пароль"
              data-easytag="id11-react/src/pages/Register.js"
            />
          </Form.Item>

          <Form.Item data-easytag="id12-react/src/pages/Register.js">
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading} 
              block
              data-easytag="id13-react/src/pages/Register.js"
            >
              Зарегистрироваться
            </Button>
          </Form.Item>

          <div className="text-center" data-easytag="id14-react/src/pages/Register.js">
            <span>Уже есть аккаунт? </span>
            <Button 
              type="link" 
              onClick={() => navigate('/login')}
              data-easytag="id15-react/src/pages/Register.js"
            >
              Войти
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
