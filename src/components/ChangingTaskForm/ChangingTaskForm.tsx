import React from 'react';
import {Form as BootstrapForm, Button, Modal} from 'react-bootstrap';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {useAppDispatch} from "../../hooks.ts";
import {editTask, Task} from "../../redux/slices/todoSlice.ts";

interface ChangingTaskFormProps {
    isModalOpen: boolean;
    closeModal: () => void;
    taskData: Task;
}

interface TypeValue {
    name: string;
    content: string;
    status: "активне" | "виконане"
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Поле обов'язкове"),
    content: Yup.string().required("Поле обов'язкове"),
    status: Yup.string().required('Оберіть опцію'),
});

const ChangingTaskForm: React.FC<ChangingTaskFormProps> = ({isModalOpen, closeModal, taskData}) => {

    const initialValues: TypeValue = {
        name: taskData.taskName,
        content: taskData.taskContent,
        status: taskData.isDone,
    };

    const dispatch = useAppDispatch();

    const handleSubmit = (values:TypeValue, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        setSubmitting(false);
        const changedTask: Task = {
            id: taskData.id,
            taskName: values.name,
            createdDate: taskData.createdDate,
            taskContent: values.content,
            isDone: values.status,
        };
        dispatch(editTask(changedTask));
        closeModal();
    };

    return (
        <Modal show={isModalOpen} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title className="text-primary fw-bold">Змінити дане завдання</Modal.Title>
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
                                <Field type="text" name="name" as={BootstrapForm.Control}/>
                                <ErrorMessage name="name" component={BootstrapForm.Text} className="text-danger"/>
                            </BootstrapForm.Group>

                            <BootstrapForm.Group className="mb-3" controlId="formBasicContent">
                                <BootstrapForm.Label className="text-secondary fw-bold">Опис завдання</BootstrapForm.Label>
                                <Field type="text" name="content" as={BootstrapForm.Control}/>
                                <ErrorMessage name="content" component={BootstrapForm.Text} className="text-danger"/>
                            </BootstrapForm.Group>

                            <BootstrapForm.Group className="mb-3" controlId="formBasicStatus">
                                <BootstrapForm.Label className="text-secondary fw-bold">Статус виконання</BootstrapForm.Label>
                                <Field name="status" as={BootstrapForm.Select}>
                                    <option value="активне">активне</option>
                                    <option value="виконане">виконане</option>
                                </Field>
                                <ErrorMessage name="status" component={BootstrapForm.Text} className="text-danger"/>
                            </BootstrapForm.Group>

                            <div className="d-flex justify-content-end">
                                <Button className="text-light" variant="primary" type="submit" disabled={isSubmitting}>
                                    Внести зміни
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>

        </Modal>
    );
};

export default ChangingTaskForm;
