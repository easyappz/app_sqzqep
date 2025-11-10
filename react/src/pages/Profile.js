import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Input, Button, Typography, Space, message, Spin } from 'antd';
import { UserOutlined, LockOutlined, LogoutOutlined, EditOutlined } from '@ant-design/icons';
import { getProfile, updateProfile } from '../api/profile';

const { Title, Text } = Typography;

function Profile() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      message.warning('Пожалуйста, войдите в систему');
      navigate('/login', { replace: true });
      return;
    }
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await getProfile();
      setProfileData(data);
      form.setFieldsValue({
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
      });
    } catch (error) {
      console.error('Profile fetch error:', error);
      
      if (error.response) {
        const status = error.response.status;
        const errorData = error.response.data;
        
        if (status === 401 || status === 403) {
          const isTokenError = errorData?.code === 'token_not_valid' || 
                              errorData?.detail?.includes('token') || 
                              errorData?.detail?.includes('Token');
          
          if (isTokenError) {
            message.error('Сессия истекла. Пожалуйста, войдите снова');
            handleLogout();
          } else {
            message.error('Ошибка авторизации');
          }
        } else if (status === 404) {
          message.error('Профиль не найден');
          handleLogout();
        } else if (status >= 500) {
          message.error('Ошибка сервера. Попробуйте позже');
        } else {
          message.error('Не удалось загрузить профиль');
        }
      } else if (error.request) {
        message.error('Ошибка сети. Проверьте подключение к интернету');
      } else {
        message.error('Произошла ошибка при загрузке профиля');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      const updateData = {
        first_name: values.first_name,
        last_name: values.last_name,
      };
      
      if (values.password) {
        updateData.password = values.password;
      }

      const data = await updateProfile(updateData);
      setProfileData(data);
      message.success('Профиль успешно обновлен');
      setEditMode(false);
      form.setFieldsValue({
        password: '',
      });
    } catch (error) {
      console.error('Profile update error:', error);
      
      if (error.response) {
        const status = error.response.status;
        const errorData = error.response.data;
        
        if (status === 401 || status === 403) {
          const isTokenError = errorData?.code === 'token_not_valid' || 
                              errorData?.detail?.includes('token') || 
                              errorData?.detail?.includes('Token');
          
          if (isTokenError) {
            message.error('Сессия истекла. Пожалуйста, войдите снова');
            handleLogout();
          } else {
            message.error('Ошибка авторизации');
          }
        } else if (status === 400) {
          message.error('Некорректные данные. Проверьте введенные значения');
        } else {
          message.error('Не удалось обновить профиль');
        }
      } else {
        message.error('Ошибка сети. Попробуйте позже');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    navigate('/login', { replace: true });
  };

  const handleCancel = () => {
    setEditMode(false);
    form.setFieldsValue({
      first_name: profileData.first_name,
      last_name: profileData.last_name,
      password: '',
    });
  };

  if (loading) {
    return (
      <div data-easytag="id1-react/src/pages/Profile.js" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div data-easytag="id2-react/src/pages/Profile.js" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card
          data-easytag="id3-react/src/pages/Profile.js"
          className="shadow-lg rounded-lg"
          title={
            <div className="flex items-center justify-between">
              <Title level={3} className="mb-0">
                Профиль
              </Title>
              <Button
                type="primary"
                danger
                icon={<LogoutOutlined />}
                onClick={handleLogout}
              >
                Выйти
              </Button>
            </div>
          }
        >
          <Form
            data-easytag="id4-react/src/pages/Profile.js"
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            size="large"
          >
            <Form.Item
              data-easytag="id5-react/src/pages/Profile.js"
              label="Email"
              name="email"
            >
              <Input
                data-easytag="id6-react/src/pages/Profile.js"
                prefix={<UserOutlined />}
                disabled
                className="bg-gray-50"
              />
            </Form.Item>

            <Form.Item
              data-easytag="id7-react/src/pages/Profile.js"
              label="Имя"
              name="first_name"
              rules={[
                { required: true, message: 'Пожалуйста, введите имя' },
              ]}
            >
              <Input
                data-easytag="id8-react/src/pages/Profile.js"
                prefix={<UserOutlined />}
                disabled={!editMode}
                placeholder="Введите имя"
              />
            </Form.Item>

            <Form.Item
              data-easytag="id9-react/src/pages/Profile.js"
              label="Фамилия"
              name="last_name"
              rules={[
                { required: true, message: 'Пожалуйста, введите фамилию' },
              ]}
            >
              <Input
                data-easytag="id10-react/src/pages/Profile.js"
                prefix={<UserOutlined />}
                disabled={!editMode}
                placeholder="Введите фамилию"
              />
            </Form.Item>

            {editMode && (
              <Form.Item
                data-easytag="id11-react/src/pages/Profile.js"
                label="Новый пароль (необязательно)"
                name="password"
              >
                <Input.Password
                  data-easytag="id12-react/src/pages/Profile.js"
                  prefix={<LockOutlined />}
                  placeholder="Введите новый пароль"
                />
              </Form.Item>
            )}

            <Form.Item data-easytag="id13-react/src/pages/Profile.js">
              {!editMode ? (
                <Button
                  data-easytag="id14-react/src/pages/Profile.js"
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => setEditMode(true)}
                  block
                >
                  Редактировать профиль
                </Button>
              ) : (
                <Space className="w-full" direction="horizontal" size="middle">
                  <Button
                    data-easytag="id15-react/src/pages/Profile.js"
                    type="primary"
                    htmlType="submit"
                    loading={submitting}
                    className="flex-1"
                  >
                    Сохранить
                  </Button>
                  <Button
                    data-easytag="id16-react/src/pages/Profile.js"
                    onClick={handleCancel}
                    className="flex-1"
                  >
                    Отмена
                  </Button>
                </Space>
              )}
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default Profile;
