import { useField } from 'formik';
import React from 'react';
import { Form } from 'react-router-dom';
import { FormField, Label } from 'semantic-ui-react';

interface Props {
    placeholder: string;
    name: string;
    label?: string;
}

export default function MyTextArea(props: Props) {
    const [field, meta] = useField(props.name);
    return (
        <FormField error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <textarea rows={3} {...field} {...props} />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}

        </FormField>
    )

}
