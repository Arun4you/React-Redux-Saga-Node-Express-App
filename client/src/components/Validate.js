export default function(values) {
  console.log("validate",values)
    const errors = {};
    const requiredFields = [
      'username',
      'caption',
      'url'
    ];
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Required';
      }
    });
    if (
      values.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid url';
    }
    return errors;
  }
  