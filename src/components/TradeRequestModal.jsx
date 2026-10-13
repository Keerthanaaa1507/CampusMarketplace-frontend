import React, { useState } from 'react';
import { 
  X, 
  Repeat, 
  ArrowRightLeft, 
  Send, 
  CheckCircle, 
  Package, 
  AlertCircle 
} from 'lucide-react';

export default function TradeRequestModal({ 
  targetProduct, 
  currentUser, 
  userProducts, 
  onClose, 
  onSubmitTrade 
}) {
  const [selectedMyProductId, setSelectedMyProductId] = useState('');
  const [customItemTitle, setCustomItemTitle] = useState('');
  const [customItemDesc, setCustomItemDesc] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!targetProduct) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    let offeredItemTitle = '';
    let offeredItemDesc = '';
    let offeredProductId = null;

    if (selectedMyProductId) {
      const found = userProducts.find(p => p.id === parseInt(selectedMyProductId));
      if (found) {
        offeredItemTitle = found.title;
        offeredItemDesc = found.description;
        offeredProductId = found.id;
      }
    } else if (customItemTitle.trim()) {
      offeredItemTitle = customItemTitle.trim();
      offeredItemDesc = customItemDesc.trim();
    } else {
      setError('Please select an item you own or type an item to offer for trade');
      return;
    }

    setLoading(true);
    setError('');

    const tradeData = {
      requesterId: currentUser?.id,
      targetProductId: targetProduct.id,
      offeredProductId: offeredProductId,
      offeredItemTitle: offeredItemTitle,
      offeredItemDescription: offeredItemDesc,
      message: message || `Hi ${targetProduct.sellerName}, I would love to trade my "${offeredItemTitle}" for your "${targetProduct.title}"!`
    };

    try {
      await onSubmitTrade(tradeData);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to submit trade proposal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px' }}>
        
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#fffbeb', color: '#b45309', padding: '8px', borderRadius: '10px' }}>
              <Repeat size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>
                Initiate Barter Trade Request
              </h3>
              <p style={{ fontSize: '12px', color: '#64748b' }}>
                Flowchart Step: Select Item to Trade & Send Request
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ color: '#94a3b8' }}><X size={20} /></button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '10px 14px', borderRadius: '10px', fontSize: '13px', marginBottom: '16px' }}>
              {error}
            </div>
          )}

          {/* Trade Visual Swap Card */}
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}>
            {/* Target Item */}
            <div style={{ flex: '1' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
                Desired Item
              </div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', marginTop: '2px' }}>
                {targetProduct.title}
              </div>
              <div style={{ fontSize: '12px', color: '#4f46e5', fontWeight: '600' }}>
                Seller: {targetProduct.sellerName}
              </div>
            </div>

            <div style={{
              background: '#e0e7ff',
              color: '#4338ca',
              padding: '10px',
              borderRadius: '50%',
              display: 'flex'
            }}>
              <ArrowRightLeft size={18} />
            </div>

            {/* Offered Item Preview */}
            <div style={{ flex: '1', textAlign: 'right' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
                Your Offer
              </div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#059669', marginTop: '2px' }}>
                {selectedMyProductId 
                  ? userProducts.find(p => p.id === parseInt(selectedMyProductId))?.title 
                  : (customItemTitle || 'Choose Below')}
              </div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>
                You ({currentUser?.name})
              </div>
            </div>
          </div>

          {/* What the seller wants notice */}
          {targetProduct.tradePreferences && (
            <div style={{
              background: '#fffbeb',
              border: '1px dashed #fde68a',
              borderRadius: '10px',
              padding: '10px 14px',
              marginBottom: '18px',
              fontSize: '12px',
              color: '#92400e'
            }}>
              <strong>Note:</strong> Seller specifically expressed interest in: "{targetProduct.tradePreferences}"
            </div>
          )}

          {/* Option 1: Pick from existing active listings */}
          {userProducts && userProducts.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                Option A: Select an item from your current listings
              </label>
              <select
                value={selectedMyProductId}
                onChange={(e) => {
                  setSelectedMyProductId(e.target.value);
                  if (e.target.value) setCustomItemTitle('');
                }}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', fontSize: '14px', background: 'white' }}
              >
                <option value="">-- Choose one of your items to swap --</option>
                {userProducts.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.title} ({p.category?.replace('_', ' ')} • {p.condition})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Option 2: Custom offer */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
              {userProducts?.length > 0 ? 'Option B: Or offer an unlisted item' : 'What item are you offering in exchange? *'}
            </label>
            <input
              type="text"
              placeholder="e.g. Vernier Caliper in case, Mechanics textbook, Electric iron"
              value={customItemTitle}
              onChange={(e) => {
                setCustomItemTitle(e.target.value);
                if (e.target.value) setSelectedMyProductId('');
              }}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', fontSize: '14px', marginBottom: '8px' }}
            />
            <input
              type="text"
              placeholder="Condition & details (e.g. barely used 1 semester, clean box)"
              value={customItemDesc}
              onChange={(e) => setCustomItemDesc(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', fontSize: '13px' }}
            />
          </div>

          {/* Proposal Message */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
              Message to Seller
            </label>
            <textarea
              rows={3}
              placeholder="Hey! Let's meet at the library lawn or hostel gate to inspect each other's items."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '10px 22px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                color: 'white',
                fontWeight: '700',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(217, 119, 6, 0.25)'
              }}
            >
              <Send size={15} />
              {loading ? 'Sending...' : 'Send Trade Request'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
