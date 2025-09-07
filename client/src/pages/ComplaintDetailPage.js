import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import complaintService from '../services/complaintService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import './ComplaintDetailPage.css'; // For styling the page

const ComplaintDetailPage = () => {
    const { id } = useParams();
    const [complaint, setComplaint] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); // NEW: State for comment submission

    useEffect(() => {
        const fetchComplaintDetails = async () => {
            try {
                setLoading(true);
                const response = await complaintService.getComplaintById(id);
                setComplaint(response.data);
            } catch (err) {
                setError('Could not load complaint details. It may not exist or you may not have permission to view it.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchComplaintDetails();
    }, [id]);

    // ...
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        setIsSubmitting(true);

        try {
            // This line correctly passes the data as an object: { text: newComment }
            const response = await complaintService.postComment(id, { text: newComment });
            const createdComment = response.data;

            setComplaint(prevComplaint => ({
                ...prevComplaint,
                comments: [...prevComplaint.comments, createdComment],
            }));

            setNewComment('');
        } catch (err) {
            setError('Failed to post comment. Please try again.');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const getStatusClass = (status) => {
        switch (status) {
            case 'NEW': return 'status-new';
            case 'IN_PROGRESS': return 'status-in-progress';
            case 'RESOLVED': return 'status-resolved';
            case 'CLOSED': return 'status-closed';
            default: return '';
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error && !complaint) return <div className="error-container">{error}</div>;
    if (!complaint) return null;

    return (
        <div className="detail-page-container">
            <div className="complaint-header">
                <h1>{complaint.title}</h1>
                <span className={`status-badge ${getStatusClass(complaint.status)}`}>
                    {complaint.status?.replace('_', ' ')}
                </span>
            </div>
            <div className="complaint-meta">
                <p><strong>Category:</strong> {complaint.category}</p>
                <p><strong>Submitted On:</strong> {new Date(complaint.createdAt).toLocaleString()}</p>
                {/* CHANGED: Use optional chaining for safer access */}
                <p><strong>Assigned Agent:</strong> {complaint.agent?.firstName || 'Not Assigned'}</p>
            </div>
            <div className="complaint-body">
                <h3>Description</h3>
                <p>{complaint.description}</p>
            </div>
            
            <hr />

            <div className="comments-section">
                <h3>Conversation History</h3>
                <div className="comment-list">
                    {complaint.comments && complaint.comments.length > 0 ? (
                        complaint.comments.map(comment => (
                            // CHANGED: Use comment._id for a more robust key
                            <div key={comment._id} className="comment-item">
                                <p className="comment-text">{comment.text}</p>
                                <small className="comment-meta">
                                    By {comment.user?.firstName || 'User'} ({comment.user?.role?.replace('ROLE_', '')}) on {new Date(comment.createdAt).toLocaleString()}
                                </small>
                            </div>
                        ))
                    ) : (
                        <p>No comments yet.</p>
                    )}
                </div>
                
                {/* NEW: Display comment-related errors here */}
                {error && <p className="error-message">{error}</p>}
                
                <form className="comment-form" onSubmit={handleCommentSubmit}>
                    <h4>Add a Comment</h4>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Type your reply..."
                        rows="4"
                        disabled={isSubmitting} // NEW: Disable while submitting
                        required
                    />
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Posting...' : 'Post Comment'} {/* NEW: Change button text */}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ComplaintDetailPage;