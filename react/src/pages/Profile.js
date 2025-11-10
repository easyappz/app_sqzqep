import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, Typography, message, Spin } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getMemberProfile, updateMemberProfile } from '../api/auth';

const { Title } = Typography;

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setDataLoading(true);
    try {
      const data = await getMemberProfile();
      setProfileData(data);
      form.setFieldsValue({
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        message.error('Необходима авторизация');
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        message.error('Ошибка при загрузке профиля');
      }
    } finally {
      setDataLoading(false);
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const updateData = {
        first_name: values.first_name,
        last_name: values.last_name,
      };
      
      if (values.password && values.password.trim() !== '') {
        updateData.password = values.password;
      }

      const data = await updateMemberProfile(updateData);
      setProfileData(data);
      message.success('Профиль успешно обновлен!');
      form.setFieldValue('password', '');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        message.error('Необходима авторизация');
        localStorage.removeItem('token');
        navigate('/login');
      } else if (error.response && error.response.data) {
        const errorData = error.response.data;
        if (typeof errorData === 'object') {
          Object.keys(errorData).forEach(key => {
            const errorMessages = Array.isArray(errorData[key]) 
              ? errorData[key].join(', ') 
              : errorData[key];
            message.error(`${key}: ${errorMessages}`);
          });
        } else {
          message.error('Ошибка при обновлении профиля');
        }
      } else {
        message.error('Ошибка при обновлении профиля');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    message.success('Вы вышли из аккаунта');
    navigate('/login');
  };

  if (dataLoading) {
    return (
      <div 
        data-easytag="id1-react/src/pages/Profile.js"
        className="min-h-screen flex items-center justify-center bg-gray-100"
      >
        <Spin size="large" data-easytag="id2-react/src/pages/Profile.js" />
      </div>
    );
  }

  return (
    <div 
      data-easytag="id3-react/src/pages/Profile.js"
      className="min-h-screen flex items-center justify-center bg-gray-100 p-4"
    >
      <Card className="w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <Title level={2} className="m-0" data-easytag="id4-react/src/pages/Profile.js">
            Профиль
          </Title>
          <Button 
            icon={<LogoutOutlined />} 
            onClick={handleLogout}
            data-easytag="id5-react/src/pages/Profile.js"
          >
            Выйти
          </Button>
        </div>
        <Form
          form={form}
          name="profile"
          onFinish={onFinish}
          layout="vertical"
          size="large"
          data-easytag="id6-react/src/pages/Profile.js"
        >
          <Form.Item
            name="email"
            label="Электронная почта"
            data-easytag="id7-react/src/pages/Profile.js"
          >
            <Input 
              prefix={<MailOutlined />} 
              disabled
              data-easytag="id8-react/src/pages/Profile.js"
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
            data-easytag="id9-react/src/pages/Profile.js"
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Имя"
              data-easytag="id10-react/src/pages/Profile.js"
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
            data-easytag="id11-react/src/pages/Profile.js"
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Фамилия"
              data-easytag="id12-react/src/pages/Profile.js"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Новый пароль"
            rules={[
              {
                min: 6,
                message: 'Пароль должен быть не менее 6 символов!',
              },
            ]}
            data-easytag="id13-react/src/pages/Profile.js"
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="Оставьте пустым, если не хотите менять"
              data-easytag="id14-react/src/pages/Profile.js"
            />
          </Form.Item>

          <Form.Item data-easytag="id15-react/src/pages/Profile.js">
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading} 
              block
              data-easytag="id16-react/src/pages/Profile.js"
            >
              Сохранить изменения
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Profile;
