import React from 'react';
import { Button, Typography, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LoginOutlined, UserAddOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Home = () => {
  const navigate = useNavigate();

  return (
    <div 
      data-easytag="id1-react/src/pages/Home.js"
      className="min-h-screen flex items-center justify-center bg-gray-100 p-4"
    >
      <Card className="w-full max-w-2xl shadow-lg text-center">
        <div className="mb-8" data-easytag="id2-react/src/pages/Home.js">
          <Title level={1} data-easytag="id3-react/src/pages/Home.js">
            Добро пожаловать!
          </Title>
          <Paragraph className="text-lg" data-easytag="id4-react/src/pages/Home.js">
            Это главная страница приложения. Пожалуйста, войдите или зарегистрируйтесь.
          </Paragraph>
        </div>
        <div className="flex gap-4 justify-center" data-easytag="id5-react/src/pages/Home.js">
          <Button 
            type="primary" 
            size="large"
            icon={<LoginOutlined />}
            onClick={() => navigate('/login')}
            data-easytag="id6-react/src/pages/Home.js"
          >
            Войти
          </Button>
          <Button 
            size="large"
            icon={<UserAddOutlined />}
            onClick={() => navigate('/register')}
            data-easytag="id7-react/src/pages/Home.js"
          >
            Регистрация
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Home;
