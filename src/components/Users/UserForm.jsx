import React, { useState, useEffect } from 'react';
import { Grid, TextField } from '@material-ui/core';
import Controls from '../../components/controls/Controls';
import { useForm, Form } from '../../components/useForm/useForm';
// import * as employeeService from '../../services/employeeService';
import { Autocomplete } from '@material-ui/lab';
import callAPI from '../../utils/apiCaller';
import Creatable, { useCreatable } from 'react-select/creatable';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import FormatPrice from '../../utils/formatPrice/formatPrice';
import Axios from 'axios';
import * as ImageConfig from '../../constants/ImageConfig';
import InputAdornment from '@material-ui/core/InputAdornment';
import './userform.css';
import { setSnackbar } from '../redux/ducks/snackbar';
import { useDispatch } from 'react-redux';

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    // borderBottom: '1px dotted pink',
    // color: state.isSelected ? 'red' : 'blue',
    // padding: 20,
    // width: '300px',
  }),
  menu: (styles) => ({
    ...styles,
    width: '353px',
    margin: '0px 7px',
    zIndex: 9999,
  }),
  control: (styles) => ({
    // none of react-select's styles are passed to <Control />
    ...styles,
    width: '353px',
    margin: '10px 8px',
    minHeight: '50px',
    // width: 50,
  }),
  // singleValue: (provided, state) => {
  //   // const opacity = state.isDisabled ? 0.5 : 1;
  //   // const transition = 'opacity 300ms';
  //   // return { ...provided, opacity, transition };
  // },
};

const typeRole = [
  {
    id: 1,
    title: 'Admin',
  },
  {
    id: 0,
    title: 'Người dùng',
  },
];

const initialFValues = {
  username: '',
  role: 0,
  password: '',
  photo: '',
  name: '',
  phone: '',
  address: '',
  email: '',
};

const UserForm = (props) => {
  const dispatch = useDispatch();
  const { handleInfo } = props;
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ('username' in fieldValues)
      temp.username = fieldValues.username
        ? ''
        : 'Trường này không được để trống.';
    if ('password' in fieldValues)
      temp.password = fieldValues.password
        ? ''
        : 'Trường này không được để trống.';

    if ('email' in fieldValues) {
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ''
        : 'Định dạng email không hợp lệ.';
    }
    if ('phone' in fieldValues) {
      if (!fieldValues.phone) {
        temp.phone = '';
      } else {
        temp.phone =
          fieldValues.phone.length > 9 ? '' : 'Số điện thoại không hợp lệ.';
      }
    }

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == '');
  };
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    handleAutoCompleteChange,
    handleCreatableInput,
    handleInputPrice,
    resetForm,
  } = useForm(initialFValues, true, validate);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      let profile = localStorage.getItem('profile');
      let access_jwt_token = JSON.parse(profile).access_jwt_token;
      let isExistedAccount = false;
      const username = values.username;
      // handle to check account is existed or not
      await callAPI(`api/account/getAccount/${username}`, 'get', null, {
        authorization: access_jwt_token,
      }).then((res) => {
        // console.log(res);
        if (res.data.username) {
          isExistedAccount = true;
        }
      });

      if (isExistedAccount) {
        dispatch(setSnackbar(true, 'error', 'Tên đăng nhập đã tồn tại!'));
      } else {
        // addOrEdit(values, resetForm);
        // handle posts
        handleInfo(values, resetForm);
      }
    }
  };

  const uploadImage = (file) => {
    const formData = new FormData();
    formData.append('file', file[0]);

    formData.append('upload_preset', ImageConfig.NAME_UPLOAD_PRESET);

    Axios.post(ImageConfig.URL_UPLOAD_IMAGE, formData).then((res) => {
      setValues({
        ...values,
        ['photo']: res.data.url,
      });
    });
  };

  return (
    // onsubmit

    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="username"
            label="Tên đăng nhập"
            value={values.username}
            onChange={handleInputChange}
            error={errors.username}
          />
          <Controls.Select
            name="role"
            label="Vai trò"
            options={typeRole}
            value={values.role}
            onChange={handleInputChange}
            error={errors.role}
          />
          <Controls.Input
            name="password"
            type="password"
            label="Mật khẩu"
            value={values.password}
            onChange={handleInputChange}
            error={errors.password}
          />

          <label for="file-upload" class="custom-file-upload">
            <i class="fa fa-cloud-upload"></i> Tải ảnh lên
          </label>
          <input
            id="file-upload"
            name="photo"
            type="file"
            label="Ảnh người dùng"
            // value={values.photo}
            onChange={(e) => uploadImage(e.target.files)}
            // error={errors.address}
          />

          <div className="photo-user-info">
            {values.photo ? (
              <img
                src={values.photo}
                alt="Album Art"
                className="userImageInfo"
              />
            ) : (
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="Album Art"
                className="userImageInfo"
              />
            )}
          </div>
        </Grid>
        <Grid item xs={6}>
          <div>
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
            <Controls.Button type="submit" text="Đồng ý" />
            <Controls.Button
              text="Đặt lại"
              color="default"
              onClick={resetForm}
            />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};
export default UserForm;
