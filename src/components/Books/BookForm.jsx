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
import './bookform.css';

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

const BookForm = (props) => {
  const { dataBooks, handleInfo } = props;
  // const [isAddingForm, setIsAddingForm] = useState(null);
  let initialFValues;
  if (dataBooks) {
    console.log(dataBooks);
    initialFValues = {
      name: dataBooks.name,
      categories: dataBooks.category,
      authors: dataBooks.author,
      quantity: dataBooks.quantity,
      displayPrice: dataBooks.price.toLocaleString(),
      price: '',
      description: dataBooks.description,
      photo: dataBooks.image_url,
    };
    // setIsAddingForm(false);
  } else {
    initialFValues = {
      name: '',
      categories: [],
      authors: [],
      quantity: '10',
      displayPrice: '',
      price: '',
      description: '',
      photo: '',
    };
    // setIsAddingForm(true);
  }
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ('name' in fieldValues)
      temp.name = fieldValues.name ? '' : 'Trường này không được để trống.';
    if ('categories' in fieldValues)
      temp.categories =
        fieldValues.categories.length != 0
          ? ''
          : 'Trường này không được để trống.';
    if ('authors' in fieldValues)
      temp.authors =
        fieldValues.authors.length != 0
          ? ''
          : 'Trường này không được để trống.';
    if ('quantity' in fieldValues) {
      temp.quantity = fieldValues.quantity
        ? ''
        : 'Trường này không được để trống.';
      temp.quantity =
        fieldValues.quantity > 0 ? '' : 'Số lượng là số nguyên dương.';
    }
    if ('price' in fieldValues) {
      temp.price = fieldValues.price ? '' : 'Trường này không được để trống.';
      temp.price = fieldValues.price > 0 ? '' : 'Giá là số nguyên dương.';
    }
    if ('displayPrice' in fieldValues) {
      temp.displayPrice = fieldValues.displayPrice
        ? ''
        : 'Trường này không được để trống.';
    }
    if ('description' in fieldValues)
      temp.description = fieldValues.description
        ? ''
        : 'Trường này không được để trống.';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle price value first
    values.price = parseInt(values.displayPrice.replace(/\D/g, ''), 10);
    if (validate()) {
      // addOrEdit(values, resetForm);
      // handle posts
      handleInfo(values, resetForm, dataBooks);
    }
  };

  let [categoriesItems, setCategoriesItems] = useState([]);
  let [authorsItems, setAuthorsItems] = useState([]);
  useEffect(() => {
    callAPI('api/category', 'GET', null).then((response) => {
      setCategoriesItems(response.data);
    });
  }, []);
  useEffect(() => {
    callAPI('api/author', 'GET', null).then((response) => {
      setAuthorsItems(response.data);
    });
  }, []);
  const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
    props,
    ref,
  ) {
    const { onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        prefix="$"
      />
    );
  });

  NumberFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
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
            name="name"
            label="Tên sách"
            value={values.name}
            onChange={handleInputChange}
            error={errors.name}
          />
          <Creatable
            isMulti
            name="categories"
            placeholder="Thể loại"
            formatCreateLabel={(inputText) => `Thêm mới "${inputText}"`}
            options={categoriesItems}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option}
            getNewOptionData={(inputValue, optionLabel) => ({
              id: undefined,
              name: optionLabel,
            })}
            value={values.categories}
            error={errors.categories}
            onChange={handleCreatableInput}
            styles={customStyles}
          />
          <Creatable
            className="author"
            isMulti
            name="authors"
            placeholder="Tác giả"
            formatCreateLabel={(inputText) => `Thêm mới "${inputText}"`}
            options={authorsItems}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option}
            getNewOptionData={(inputValue, optionLabel) => ({
              id: undefined,
              name: optionLabel,
            })}
            value={values.authors}
            error={errors.authors}
            onChange={handleCreatableInput}
            styles={customStyles}
          />
          <label for="file-upload" class="custom-file-upload">
            <i class="fa fa-cloud-upload"></i> Tải ảnh lên
          </label>
          <input
            id="file-upload"
            name="photo"
            type="file"
            label="Ảnh sách"
            // value={values.photo}
            onChange={(e) => uploadImage(e.target.files)}
            // error={errors.address}
          />

          <div className="photo-book-info">
            {values.photo ? (
              <img
                src={values.photo}
                alt="Album Art"
                className="userImageInfo"
              />
            ) : (
              <img
                src="https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png"
                alt="Album Art"
                className="userImageInfo"
              />
            )}
          </div>
        </Grid>
        <Grid item xs={6}>
          <div>
            <Controls.Input
              name="quantity"
              label="Số lượng"
              value={values.quantity}
              type="number"
              onChange={handleInputChange}
              error={errors.quantity}
            />
            <Controls.Input
              name="displayPrice"
              label="Giá"
              value={values.displayPrice}
              // InputProps={{
              //   inputComponent: NumberFormatCustom,
              // }}
              onChange={handleInputPrice}
              error={errors.displayPrice}
            />
            <Controls.Input
              name="description"
              label="Mô tả"
              value={values.description}
              multiline
              rows={5}
              onChange={handleInputChange}
              error={errors.description}
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
export default BookForm;
