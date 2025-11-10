import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { loginMember } from '../api/auth';

const { Title } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await loginMember(values);
      if (response.tokens && response.tokens.access) {
        localStorage.setItem('token', response.tokens.access);
        message.success('Вход выполнен успешно!');
        
        setTimeout(() => {
          navigate('/profile', { replace: true });
        }, 100);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        message.error('Неверный email или пароль');
      } else {
        message.error('Ошибка при входе');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      data-easytag="id1-react/src/pages/Login.js"
      className="min-h-screen flex items-center justify-center bg-gray-100 p-4"
    >
      <Card className="w-full max-w-md shadow-lg">
        <div className="text-center mb-6">
          <Title level={2} data-easytag="id2-react/src/pages/Login.js">
            Вход
          </Title>
        </div>
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          layout="vertical"
          size="large"
          data-easytag="id3-react/src/pages/Login.js"
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
            data-easytag="id4-react/src/pages/Login.js"
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder="Email"
              data-easytag="id5-react/src/pages/Login.js"
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
            ]}
            data-easytag="id6-react/src/pages/Login.js"
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="Пароль"
              data-easytag="id7-react/src/pages/Login.js"
            />
          </Form.Item>

          <Form.Item data-easytag="id8-react/src/pages/Login.js">
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading} 
              block
              data-easytag="id9-react/src/pages/Login.js"
            >
              Войти
            </Button>
          </Form.Item>

          <div className="text-center" data-easytag="id10-react/src/pages/Login.js">
            <span>Нет аккаунта? </span>
            <Button 
              type="link" 
              onClick={() => navigate('/register')}
              data-easytag="id11-react/src/pages/Login.js"
            >
              Зарегистрироваться
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;