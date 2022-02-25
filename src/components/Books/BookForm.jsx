import React from 'react';
import { Grid } from '@material-ui/core';
import Controls from '../../components/controls/Controls';
import { useForm, Form } from '../../components/useForm/useForm';
// import * as employeeService from '../../services/employeeService';

const initialFValues = {
  name: '',
  quantity: '1',
};

const BookForm = () => {
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ('name' in fieldValues)
      temp.name = fieldValues.name ? '' : 'This field is required.';
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == '');
  };
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  //   useEffect(() => {
  //     if (recordForEdit != null)
  //       setValues({
  //         ...recordForEdit,
  //       });
  //   }, [recordForEdit]);

  return (
    // onsubmit
    <Form>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="name"
            label="Tên sách"
            value=""
            onChange={handleInputChange}
          />
          <Controls.Input
            name="quantity"
            label="Số lượng"
            value=""
            type="number"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <div>
            <Controls.Input
              name="description"
              label="Mô tả"
              value=""
              onChange={handleInputChange}
            />
            <Controls.Button type="submit" text="Submit" />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};
export default BookForm;
