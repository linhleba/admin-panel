import React, { useState, useEffect } from 'react';
import Controls from '../components/controls/Controls';
import { Grid, TextField } from '@material-ui/core';
import { useForm, Form } from '../components/useForm/useForm';
import { useDispatch } from 'react-redux';
import { setSnackbar } from '../components/redux/ducks/snackbar';
import InputAdornment from '@material-ui/core/InputAdornment';
import callAPI from '../utils/apiCaller';

const Profile = () => {
  const dispatch = useDispatch();
  const [initialFValues, setInitialFValues] = useState({
    username: '',
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ('email' in fieldValues) {
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ''
        : 'Định dạng email không hợp lệ.';
    }
    if ('phone' in fieldValues)
      temp.phone =
        fieldValues.phone.length > 9 ? '' : 'Số điện thoại không hợp lệ.';

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == '');
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const payload = {
        name: values.name,
        email: values.email,
        telephone: values.phone,
        address: values.address,
      };
      await callAPI('api/account/update', 'put', payload).then((res) => {
        console.log(res);
        if (res.status == 200) {
          dispatch(
            setSnackbar(true, 'success', 'Cập nhật thông tin thành công!'),
          );
        } else {
          dispatch(setSnackbar(true, 'error', 'Đã có lỗi xảy ra!'));
        }
      });
    }
  };

  useEffect(async () => {
    await callAPI('api/account/info', 'get', null).then((res) => {
      console.log(res.data.name);
      setValues({
        username: res.data.username,
        name: res.data.name ? res.data.name : '',
        email: res.data.email ? res.data.email : '',
        phone: res.data.telephone ? res.data.telephone : '',
        address: res.data.address ? res.data.address : '',
      });
    });
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Thông tin cá nhân </h2>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            disabled
            name="username"
            label="Tên tài khoản"
            value={values.username}
            // variant="filled"
          />
          <Controls.Input
            name="name"
            label="Họ tên"
            value={values.name}
            onChange={handleInputChange}
            error={errors.name}
          />
          <Controls.Input
            name="email"
            label="Email"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <Controls.Input
            name="phone"
            type="tel"
            label="Số điện thoại"
            value={values.phone}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+84</InputAdornment>
              ),
            }}
            error={errors.phone}
          />
          <Controls.Input
            name="address"
            label="Địa chỉ"
            value={values.address}
            onChange={handleInputChange}
            error={errors.address}
          />
        </Grid>
        <Grid item xs={6}>
          Ảnh đại diện
        </Grid>
      </Grid>
      <Controls.Button type="submit" text="Lưu thay đổi" />
      {/* <Controls.Button
        text="Đặt lại"
        color="default"
        onClick={() => resetForm()}
      /> */}
    </Form>
  );
};

export default Profile;
