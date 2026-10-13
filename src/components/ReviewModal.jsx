import React, { useState } from 'react';
import { 
  X, 
  Star, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Award,
  ThumbsUp
} from 'lucide-react';

export default function ReviewModal({ 
  transaction, 
  currentUser, 
  onClose, 
  onSubmitReview 
}) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  if (!transaction) return null;

  const isBuyer = currentUser?.id === transaction.buyerId;
  const targetUserId = isBuyer ? transaction.sellerId : transaction.buyerId;
  const targetUserName = isBuyer ? transaction.sellerName : transaction.buyerName;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmitReview({
        transactionId: transaction.id,
        reviewerId: currentUser.id,
        targetUserId: targetUserId,
        rating: rating,
        comment: comment || `Great campus exchange! Item was in excellent shape, verified college ID.`
      });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
        
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#ecfdf5', color: '#059669', padding: '8px', borderRadius: '10px' }}>
              <Award size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>
                Rate & Review Peer Student
              </h3>
              <p style={{ fontSize: '12px', color: '#64748b' }}>
                Flowchart Step: Rate & Review User → Update Status → Done
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ color: '#94a3b8' }}><X size={20} /></button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '14px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>
              Completed Exchange
            </div>
            <div style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', marginTop: '2px' }}>
              {transaction.productTitle}
            </div>
            <div style={{ fontSize: '13px', color: '#059669', fontWeight: '600', marginTop: '4px' }}>
              Reviewing: <strong>{targetUserName}</strong>
            </div>
          </div>

          {/* Star Rating Picker */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '10px' }}>
              How was your exchange experience?
            </label>
            <div style={{ display: 'inline-flex', gap: '8px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  style={{
                    padding: '6px',
                    transition: 'transform 0.15s ease',
                    transform: (hoverRating || rating) >= star ? 'scale(1.15)' : 'scale(1)'
                  }}
                >
                  <Star
                    size={32}
                    color={(hoverRating || rating) >= star ? '#eab308' : '#cbd5e1'}
                    fill={(hoverRating || rating) >= star ? '#eab308' : 'none'}
                  />
                </button>
              ))}
            </div>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#eab308', marginTop: '6px' }}>
              {rating === 5 ? 'Exceptional! Punctual and item matched description' :
               rating === 4 ? 'Good experience, smooth handoff' :
               rating === 3 ? 'Average exchange' : 'Needs improvement'}
            </div>
          </div>

          {/* Comment */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
              Campus Peer Feedback
            </label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="e.g. Alex met me right at the hostel quad on time. The kettle works great and is super clean! Verified student ID on hand."
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', fontSize: '14px' }}
            />
          </div>

          {/* Submit */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{ padding: '10px 18px', borderRadius: '10px', color: '#64748b', fontWeight: '600', fontSize: '14px' }}
            >
              Skip
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '10px 22px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                color: 'white',
                fontWeight: '700',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(5, 150, 105, 0.25)'
              }}
            >
              <CheckCircle2 size={16} />
              {loading ? 'Submitting...' : 'Submit Review & Finish'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
