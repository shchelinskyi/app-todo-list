import React from 'react';
import {Form as BootstrapForm, Button, Modal} from 'react-bootstrap';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {closeForm} from "../../redux/slices/creatingFormSlice"
import {addTask, Task} from "../../redux/slices/todoSlice";
import setDataFormat from "../../utils/setDataFormat";

interface TypeValue {
    name: string;
    content: string;
    status: "активне" | "виконане"
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Поле обов'язкове"),
    content: Yup.string().required("Поле обов'язкове"),
});

const initialValues: TypeValue = {
    name: '',
    content: '',
    status: "активне"
};

const CreatingTaskForm:React.FC = () => {
    const dispatch = useAppDispatch();
    const isFormOpen = useAppSelector(state => state.creatingForm.isOpenedForm);
    const handleSubmit = (values:TypeValue, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        setSubmitting(false);
        const newTask: Task = {
            id: Date.now(),
            taskName: values.name,
            createdDate: setDataFormat(),
            taskContent: values.content,
            isDone: values.status
        };
        dispatch(addTask(newTask));
        dispatch(closeForm());
    };
    const handleCloseForm = () => {
        dispatch(closeForm());
    }
    return (
        <Modal show={isFormOpen} onHide={handleCloseForm}>
            <Modal.Header closeButton>
                <Modal.Title className="text-primary fw-bold">Створити нове завдання</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({isSubmitting}) => (
                        <Form>
                            <BootstrapForm.Group className="mb-3" controlId="formBasicName">
                                <BootstrapForm.Label className="text-secondary fw-bold">Назва завдання</BootstrapForm.Label>
                                <Field type="text" name="name" as={BootstrapForm.Control} placeholder="Введіть назву завдання"/>
                                <ErrorMessage name="name" component={BootstrapForm.Text} className="text-danger"/>
                            </BootstrapForm.Group>

                            <BootstrapForm.Group className="mb-3" controlId="formBasicContent">
                                <BootstrapForm.Label className="text-secondary fw-bold">Опис завдання</BootstrapForm.Label>
                                <Field type="text" name="content" as={BootstrapForm.Control} placeholder="Введіть опис завдання"/>
                                <ErrorMessage name="content" component={BootstrapForm.Text} className="text-danger"/>
                            </BootstrapForm.Group>

                            <BootstrapForm.Group className="mb-3" controlId="formBasicStatus">
                                <BootstrapForm.Label className="text-secondary fw-bold">Статус виконання</BootstrapForm.Label>
                                <Field as={BootstrapForm.Select} name="status" className="form-select">
                                    <option value="активне">активне</option>
                                    <option value="виконане">виконане</option>
                                </Field>
                            </BootstrapForm.Group>

                            <div className="d-flex justify-content-end">
                                <Button className="text-light" variant="primary" type="submit" disabled={isSubmitting}>
                                    Додати завдання
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>

        </Modal>
    );
};

export default CreatingTaskForm;
