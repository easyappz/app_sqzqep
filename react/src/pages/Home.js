import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { HomeOutlined, UserAddOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

const Home = () => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">Главная</Link>,
    },
    {
      key: '/register',
      icon: <UserAddOutlined />,
      label: <Link to="/register">Регистрация</Link>,
    },
    {
      key: '/login',
      icon: <LoginOutlined />,
      label: <Link to="/login">Вход</Link>,
    },
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: <Link to="/profile">Профиль</Link>,
    },
  ];

  return (
    <Layout className="min-h-screen" data-easytag="id1-react/src/pages/Home.js">
      <Header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto">
          <Menu
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={menuItems}
            className="border-0"
          />
        </div>
      </Header>
      <Content className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Добро пожаловать!</h1>
            <p className="text-lg text-gray-600 mb-6">
              Это главная страница приложения с системой регистрации и авторизации.
            </p>
            {token ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800">
                  Вы авторизованы. Перейдите в <Link to="/profile" className="text-blue-600 hover:underline">профиль</Link> для настройки.
                </p>
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800">
                  Пожалуйста, <Link to="/login" className="text-blue-600 hover:underline">войдите</Link> или <Link to="/register" className="text-blue-600 hover:underline">зарегистрируйтесь</Link>.
                </p>
              </div>
            )}
          </div>
        </div>
      </Content>
      <Footer className="text-center bg-white border-t">
        <p className="text-gray-600">© 2024 Приложение</p>
      </Footer>
    </Layout>
  );
};

export default Home;
