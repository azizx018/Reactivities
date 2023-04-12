import { Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import MyTextInputs from "../../app/common/form/MyTextInput";

export default function LoginForm() {
    return (
        <Formik
            initialValues={{email:'', password:''}}
            onSubmit={values => console.log(values)}
            >

            {({handleSubmit}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInputs placeholder="Email" name="email"/>
                    <MyTextInputs placeholder="Password" name="password" type='password' />
                    <Button positive content='Login' type="submit"/>
                </Form>
            )}
        </Formik>
    )
}