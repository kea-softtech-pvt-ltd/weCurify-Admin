import * as Yup from 'yup';

export const DataValidation = Yup.object({
name:Yup.string().min(2).max(30).required('Name is Required'),
personalEmail:Yup.string().email().required('Email is Required'),
address:Yup.string().min(2).max(30).required('address is Required'),
});