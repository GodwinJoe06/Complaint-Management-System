import React, { useState } from 'react';
import complaintService from '../../services/complaintService'; // Corrected import
import Button from '../common/Button';
import './ComplaintForm.css';

const ComplaintForm = ({ onComplaintSubmitted }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('General');
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage('');

        try {
            // Corrected function call
            await complaintService.createComplaint({ title, description, category });
            setMessage('Your complaint has been submitted successfully!');
            setTitle('');
            setDescription('');
            setCategory('General');
            if (onComplaintSubmitted) {
                onComplaintSubmitted();
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
            console.error("Submit error:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="complaint-form-container">
            <h2>File a New Complaint</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={submitting}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        disabled={submitting}
                    >
                        <option value="General">General</option>
                        <option value="Billing">Billing</option>
                        <option value="Technical">Technical Support</option>
                        <option value="Feedback">Feedback</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        rows="6"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={submitting}
                        required
                    ></textarea>
                </div>
                <Button type="submit" variant="primary" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit Complaint'}
                </Button>
            </form>
            {message && <p className="form-message">{message}</p>}
        </div>
    );
};

export default ComplaintForm;