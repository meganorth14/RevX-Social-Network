import React from 'react';
import {Form, Modal} from "react-bootstrap";
import axios from "axios";

function ReportForm({reportInfo, setReportInfo}){

    const submitReport = (e) => {
        e.preventDefault();

        const reportForm = document.getElementById("reportform");
        let complaint = reportForm.elements[0].value;

        let newReport = {...reportInfo, issue:complaint};

        if(!complaint.trim()) {
            alert("Please enter all input fields");
            return;
        }

        axios.post('http://localhost:4000/reports/newReport', newReport);

        setReportInfo({ show: false });
    };

    function cancel(){
        setReportInfo({show:false});
    }

    return (
        <Modal
            show={true}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            contentClassName="form-dark report-form"
        >
            <Form id="reportform" onSubmit={submitReport}>
                <Modal.Header bsPrefix="reportformheading">
                    <h3> Report User : </h3>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-2">
                        <Form.Label bsPrefix="form-dark">
                            You are reporting user : <i>{reportInfo.username}</i>
                        </Form.Label>
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label bsPrefix="form-dark">
                            Please enter your complaint :
                        </Form.Label>
                        <textarea 
                            name="complaint" 
                            className="form-control form-dark" 
                            rows="5" 
                            placeholder={"Explain why you are reporting " + reportInfo.username} 
                            required>
                        </textarea>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <button className="reportformbtn" variant="none" type="submit">
                        Submit Report
                    </button>
                    <button className="reportformbtn" variant="none" type="button" onClick={cancel}>
                        Cancel
                    </button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default ReportForm;
