import React from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap'
import {useAppDispatch, useAppSelector} from "../../hooks";
import {openForm} from "../../redux/slices/creatingFormSlice.ts";
import TaskList from "../TaskList";
import TaskDashboard from "../TaskDashboard";
import CreatingTaskForm from "../CreatingTaskForm";


const MainContainer: React.FC = () => {

    const dispatch = useAppDispatch();
    const isFormOpen = useAppSelector(state => state.creatingForm.isOpenedForm);

    const handleOpenForm = () => {
        dispatch(openForm())
    }

    return (
        <Container className="mb-4">
            <Container className="p-4 border border-primary border-2 rounded-4 mt-2">
                <Row>
                    <Col className="text-center">
                        <h1 className="header text-primary fw-bold ">Список завдань</h1>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-end">
                        <Button className="text-light d-flex align-items-end mb-2" style={{gap: "8px"}}
                                onClick={handleOpenForm}>
                            <i className="bi bi-plus-circle-fill"></i>
                            <span>Додати завдання</span>
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TaskList/>
                    </Col>
                </Row>
            </Container>
            <TaskDashboard/>
            {isFormOpen && <CreatingTaskForm/>}
        </Container>
    );
};

export default MainContainer;