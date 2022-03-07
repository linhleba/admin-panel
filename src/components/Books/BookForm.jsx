import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Controls from '../../components/controls/Controls';
import { useForm, Form } from '../../components/useForm/useForm';
// import * as employeeService from '../../services/employeeService';
import { Autocomplete } from '@material-ui/lab';
import callAPI from '../../utils/apiCaller';
import Creatable, { useCreatable } from 'react-select/creatable';

const initialFValues = {
  name: '',
  categories: [],
  authors: [],
  quantity: '',
  price: '',
  description: '',
};

const BookForm = (props) => {
  const { handleInfo } = props;
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
    resetForm,
  } = useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // addOrEdit(values, resetForm);
      // handle posts
      handleInfo(values, resetForm);
    }
  };

  //   useEffect(() => {
  //     if (recordForEdit != null)
  //       setValues({
  //         ...recordForEdit,
  //       });
  //   }, [recordForEdit]);

  let [categoriesItems, setCategoriesItems] = useState([]);
  let [authorsItems, setAuthorsItems] = useState([]);
  useEffect(() => {
    callAPI('api/category', 'GET', null).then((response) => {
      console.log(response.data);
      setCategoriesItems(response.data);
    });
  }, []);
  useEffect(() => {
    callAPI('api/author', 'GET', null).then((response) => {
      console.log(response.data);
      setAuthorsItems(response.data);
    });
  }, []);

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
          />
          <Creatable
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
          />
          {/* <Autocomplete
            multiple
            id="categories"
            name="categories"
            value={values.categories}
            onChange={handleAutoCompleteChange}
            error={errors.categories}
            options={categoriesItems}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <Controls.Input
                {...params}
                label="Thể loại"
                fullWidth
                margin="normal"
              />
            )}
          />

          <Autocomplete
            multiple
            id="authors"
            name="authors"
            value={values.authors}
            onChange={handleAutoCompleteChange}
            error={errors.authors}
            options={authorsItems}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <Controls.Input
                {...params}
                label="Tác giả"
                fullWidth
                margin="normal"
              />
            )}
          /> */}

          <Controls.Input
            name="quantity"
            label="Số lượng"
            value={values.quantity}
            type="number"
            onChange={handleInputChange}
            error={errors.quantity}
          />
        </Grid>
        <Grid item xs={6}>
          <div>
            <Controls.Input
              name="price"
              label="Giá"
              value={values.price}
              type="number"
              onChange={handleInputChange}
              error={errors.price}
            />
            <Controls.Input
              name="description"
              label="Mô tả"
              value={values.description}
              multiline
              rows={6}
              onChange={handleInputChange}
              error={errors.description}
            />
          </div>
          <Controls.Button type="submit" text="Đồng ý" />
          <Controls.Button text="Đặt lại" color="default" onClick={resetForm} />
        </Grid>
      </Grid>
    </Form>
  );
};
export default BookForm;
