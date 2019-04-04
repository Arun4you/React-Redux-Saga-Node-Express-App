import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import asyncValidate from './asyncValidate';
import validate from './validate';
import Button from '@material-ui/core/Button';

const renderTextField = (
  { input, label, meta: { touched, error }, ...custom },
) => (
    <div>
      <TextField
        id="standard-name"
        label={label}
        name="todoInput"
        margin="normal"
        {...input}
        {...custom}
      />
      {touched && error}
    </div>
  );

const AddImageForm = props => {
  const { handleSubmit, pristine, submitting, handleForm } = props;
  return (
    <form onSubmit={handleSubmit(handleForm)}>
      <div>
        <Field
          name="username"
          component={renderTextField}
          label="Username"
        />
      </div>
      <div>
        <Field name="caption" component={renderTextField} label="Caption" />
      </div>
      <div>
        <Field name="url" component={renderTextField} label="ImageUrl" />
      </div>
      <Button type="submit" variant="contained" disabled={pristine || submitting} color="primary">
        Submit
      </Button>
    </form>
  );
};

export default reduxForm({
  form: 'AddImageForm',
  validate,
  asyncValidate,
})(AddImageForm);
