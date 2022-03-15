import React from 'react';
import Controls from '../components/controls/Controls';
import { Grid, TextField } from '@material-ui/core';
import { useForm, Form } from '../components/useForm/useForm';

const Profile = () => {
  const handleSubmit = () => {
    console.log('hehe');
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h2>Thông tin cá nhân </h2>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="name"
            label="Họ tên"
            value="234"
            //   onChange={handleInputChange}
            //   error={errors.name}
          />
          <Controls.Input
            name="email"
            label="Email"
            value="bab@gmail.com"
            //   onChange={handleInputChange}
            //   error={errors.name}
          />
          <Controls.Input
            name="phone"
            label="Số điện thoại"
            value="034533"
            //   onChange={handleInputChange}
            //   error={errors.name}
          />
          <Controls.Input
            name="address"
            label="Địa chỉ"
            value="034533"
            //   onChange={handleInputChange}
            //   error={errors.name}
          />
        </Grid>
        <Grid item xs={6}>
          Ảnh đại diện
        </Grid>
      </Grid>
      <Controls.Button type="submit" text="Lưu thay đổi" />
      <Controls.Button
        text="Đặt lại"
        color="default"
        onClick={() => console.log('click')}
      />
    </Form>
  );
};

export default Profile;
