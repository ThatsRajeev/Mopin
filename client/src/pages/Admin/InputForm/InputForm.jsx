import * as React from 'react';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const DISH_INFO_FIELDS = ['Dish Name', 'Description', 'Price', 'Image URL'];

const InputForm = () => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const totalPages = 7;

  const formik = useFormik({
    initialValues: {
      name: '',
      imgURL: '',
      quote: '',
      foodType: '',
      maxFeeds: '',
      minPrice: '',
      veg: 'yes',
      spicy: 'no',
      dairyFree: 'no',
      dateOfJoining: '',
      subscriptionCost: '',
      mealData: Array(7).fill().map(() => ({
        breakfast: { isVeg: 'no' },
        lunch: { isVeg: 'no' },
        dinner: { isVeg: 'no' }
      }))
    },
    onSubmit: values => {
      console.log(values);
    }
  });

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else {
      formik.handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 0:
        return <InitialPageFields formik={formik} />;
      default:
        return <MealInputPage dayIndex={currentPage - 1} formik={formik} fields={DISH_INFO_FIELDS} />;
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      {renderPageContent()}
      <div>
        {currentPage > 0 && <Button variant="contained" onClick={handlePrevious} style={{ margin: '24px 24px 0 0' }}>Previous</Button>}
        <Button variant="contained" onClick={handleNext} style={{ marginTop: '24px' }}>{currentPage === totalPages ? 'Submit' : 'Next'}</Button>
      </div>
    </form>
  );
};

const InitialPageFields = ({ formik }) => {
  return (
    <Grid container spacing={2}>
      <h2 style={{ margin: '16px 0 0 16px' }}>Basic Details</h2>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          {...formik.getFieldProps('name')}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Image URL"
          name="imgURL"
          {...formik.getFieldProps('imgURL')}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Quote"
          name="quote"
          {...formik.getFieldProps('quote')}
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
          label="Maximum Feeds"
          name="maxFeeds"
          {...formik.getFieldProps('maxFeeds')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Minimum Price"
          name="minPrice"
          type="number"
          {...formik.getFieldProps('minPrice')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Date of Joining"
          name="dateOfJoining"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          {...formik.getFieldProps('dateOfJoining')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Subscription Cost"
          name="subscriptionCost"
          type="number"
          {...formik.getFieldProps('subscriptionCost')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl>
          <FormLabel id="veg-radio-label">Vegetarian?</FormLabel>
          <RadioGroup
            name="veg"
            value={formik.values.veg}
            onChange={formik.handleChange}
            row
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl>
          <FormLabel id="veg-radio-label">Spicy?</FormLabel>
          <RadioGroup
            name="spicy"
            value={formik.values.spicy}
            onChange={formik.handleChange}
            row
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl>
          <FormLabel id="veg-radio-label">Dairy Free?</FormLabel>
          <RadioGroup
            name="dairyFree"
            value={formik.values.dairyFree}
            onChange={formik.handleChange}
            row
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  )
}

const MealInputPage = ({ dayIndex, formik, fields }) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const day = daysOfWeek[dayIndex];

  const handleFieldChange = (meal, field, value) => {
    formik.setFieldValue(`mealData[${dayIndex}][${meal}][${field}]`, value);
  };

  return (
    <Grid container spacing={2}>
      <h2 style={{ margin: '16px 0 0 16px' }}>{day}</h2>
      {['Breakfast', 'Lunch', 'Dinner'].map(meal => (
        <Grid item key={meal} style={{padding: '16px'}}>
          <h3 style={{ marginBottom: '16px'}}>{meal}</h3>
          {fields.map(field => (
            <TextField
              fullWidth
              label={field}
              name={field}
              key={field}
              style={{ marginBottom: '16px' }}
              value={formik.values.mealData[dayIndex][meal]?.[field] || ''}
              onChange={(event) => handleFieldChange(meal, field, event.target.value)} />
          ))}
          <FormControl component="fieldset">
            <FormLabel component="legend">Vegetarian?</FormLabel>
            <RadioGroup
              row
              name={`mealData[${dayIndex}][${meal}][isVeg]`}
              value={formik.values.mealData[dayIndex][meal]?.isVeg || 'no'}
              onChange={formik.handleChange}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Grid>
      ))}
    </Grid>
  );
};

export default InputForm;
