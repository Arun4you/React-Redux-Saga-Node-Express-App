const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export default (async function asyncValidate(values) {
  console.log("aysncvaldate", values)
  await sleep(100);
  // if (['foo@foo.com', 'bar@bar.com'].includes(values.email)) {
  //   throw { email: 'Email already Exists' };
  // }
});
