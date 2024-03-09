import React from 'react'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {FormikErrors, useFormik} from "formik";
import * as Yup from 'yup';
import {useDispatch} from "react-redux";
import {loginTC} from "./auth-reducer";
import {LoginParamsType} from "../../api/todolists-api";
import {useAppDispatch} from "../../app/store";


type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: string
}


export const Login = () => {

    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false
        },
        isInitialValid:false,
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(8, 'Must be 8 characters or more')
                .required('Password is required'),
        }),
        // validate: values => {
        //     const errors: FormikErrorType = {}
        //     if (!values.email) {
        //         errors.email = "Email is required."
        //     }
        //     if (!values.password) {
        //         errors.password = "Password is required."
        //     }
        //     return errors
        // },
        onSubmit: (values, formikHelpers) => {
            formikHelpers.setSubmitting(true)
            dispatch(loginTC(values))
                .then(() => {
                    formik.resetForm()
                    formikHelpers.setSubmitting(false)
                    }
                )
        },
    });

    console.log(formik.isValid, formik.isSubmitting, formik.isSubmitting || !formik.isValid)

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>
                                To log in get registered
                                <a href={'https://social-network.samuraijs.com/'} target={'_blank'}>
                                    here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField label="Email"
                                       margin="normal"
                                       error={formik.touched.email && !!formik.errors.email}
                                       helperText={formik.touched.email && formik.errors.email}
                                       {...formik.getFieldProps("email")}

                            />
                            {/*{formik.errors.email && <div style={{color:"red"}}>{formik.errors.email}</div>}*/}
                            <TextField type="password"
                                       label="Password"
                                       margin="normal"
                                       error={formik.touched.password && !!formik.errors.password}
                                       {...formik.getFieldProps("password")}
                                // helperText={formik.errors.password}
                            />
                            {formik.errors.password && formik.touched.password &&
                                <div style={{color: "red"}}>{formik.errors.password}</div>}

                            <FormControlLabel label={'Remember me'} control={
                                <Checkbox {...formik.getFieldProps("rememberMe")}/>
                            }/>
                            <Button type={'submit'}
                                    variant={'contained'}
                                    color={'primary'}
                                    disabled={formik.isSubmitting || !formik.isValid}
                            >
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}