import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { ActivityFormValues } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInputs from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { v4 as uuid } from "uuid";




export default observer (function ActivityForm() {

    const {activityStore} = useStore();
    const {createActivity, updateActivity, loading,loadActivity, loadingInitial} = activityStore;
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate();

    const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required.'),
        description: Yup.string().required('The activity description is required.'),
        category: Yup.string().required(),
        date: Yup.string().required('Date is required.'),
        venue: Yup.string().required(),
        city: Yup.string().required()
    });

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(new ActivityFormValues(activity)))
    }, [id, loadActivity]);
    

    function handleFormSubmit(activity: ActivityFormValues) {
        if (!activity.id) {
            activity.id = uuid()
            createActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        } else {
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        }
    //    if (!activity.id) {
    //        activity.id = uuid();
    //        createActivity(newActivity).then(() => navigate(`/activities/${activity.id}`));
    //    } else {
    //        updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));

    //    }
    }


    if (loadingInitial) return <LoadingComponent content="Loading Activity ..."/>;

    return (
        <Segment clearing>
            <Header content='Activity Details' sub color='teal'/>
            <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={activity} 
                onSubmit={(values) => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty}) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInputs placeholder={"Title"} name={"title"}/>
                        <MyTextArea  placeholder='Description' name='description'  />
                        <MySelectInput options={categoryOptions} placeholder='Category' name='category'  />
                        <MyDateInput  
                            placeholderText="Date"  
                            name='date' 
                            showTimeSelect
                            timeCaption="time"
                            dateFormat={'MMMM d, yyyy h:m aa'}/>
                        <Header content='Location Details' sub color='teal'/>
                        <MyTextInputs placeholder='City'  name='city' />
                        <MyTextInputs placeholder='Venue'  name='venue' />
                        <Button 
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting} floated="right" 
                            positive type="submit" content='Submit'/>
                        <Button as={Link} to='/activities' floated="right"  type="submit" content='Cancel'/>
                    </Form>
                )}

            </Formik>
            
        </Segment>
    )
})


// function uuid() {
//     throw new Error("Function not implemented.");
// }

