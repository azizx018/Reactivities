import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header } from "semantic-ui-react";
import MyTextInputs from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';
import ValidationError from "../errors/ValidationError";

export default observer(function RegisterFrom() {
    const {userStore} = useStore();
    return (
        <Formik
            initialValues={{displayName: '',username:'', email:'', password:'', error:null}}
            onSubmit={(values,{setErrors}) => userStore.register(values).catch(error => 
                setErrors({error}))}
                validationSchema={Yup.object({
                    displayName: Yup.string().required(),
                    username: Yup.string().required(),
                    email: Yup.string().required(),
                    password: Yup.string().required(),
                })}
            >

            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Sign Up For Reactivites' color="teal" textAlign="center" />
                    <MyTextInputs placeholder="Email" name="email"/>
                    <MyTextInputs placeholder="Display Name" name="displayName"/>
                    <MyTextInputs placeholder="Username" name="username"/>
                    <MyTextInputs placeholder="Password" name="password" type='password' />
                    <ErrorMessage 
                        name="error" render={() => 
                        <ValidationError errors={errors.error}/>}/>
                    <Button 
                        disabled={!isValid || !dirty || isSubmitting}
                        loading={isSubmitting} 
                        positive content='Register' 
                        type="submit" fluid/>
                </Form>
            )}
        </Formik>
    )
})