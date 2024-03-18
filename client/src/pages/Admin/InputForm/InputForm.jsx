import * as React from 'react';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

const InputForm = ({ nextStep }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      imgURL: '',
      foodType: '',
      // ... other fields
    },
    onSubmit: values => {
      // ... handle form data
      nextStep();
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            {...formik.getFieldProps('name')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Image URL"
            name="imgURL"
            {...formik.getFieldProps('imgURL')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Food Type"
            name="foodType"
            {...formik.getFieldProps('foodType')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Food Type"
            name="foodType"
            {...formik.getFieldProps('foodType')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Food Type"
            name="foodType"
            {...formik.getFieldProps('foodType')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Food Type"
            name="foodType"
            {...formik.getFieldProps('foodType')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Food Type"
            name="foodType"
            {...formik.getFieldProps('foodType')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Food Type"
            name="foodType"
            {...formik.getFieldProps('foodType')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Food Type"
            name="foodType"
            {...formik.getFieldProps('foodType')}
          />
        </Grid>
      </Grid>
      <Button variant="contained" type="submit">Next</Button>
    </form>
  );
};

export default InputForm;
