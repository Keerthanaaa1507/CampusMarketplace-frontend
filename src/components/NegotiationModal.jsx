import React, { useState, useEffect } from 'react';
import { 
  X, 
  Send, 
  MapPin, 
  DollarSign, 
  CheckCircle, 
  ShieldCheck, 
  Calendar,
  MessageSquare,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { api } from '../api';

export default function NegotiationModal({ 
  product, 
  currentUser, 
  onClose, 
  onAgreeDeal,
  onOpenReviewModal 
}) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [proposedPrice, setProposedPrice] = useState(product?.price || '');
  const [proposedPickup, setProposedPickup] = useState(product?.preferredPickupSpot || 'Library Front Steps');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      loadMessages();
    }
  }, [product]);

  const loadMessages = async () => {
    try {
      const data = await api.getProductMessages(product.id);
      setMessages(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSendMessage = async (customText, type = 'CHAT') => {
    const textToSend = customText || inputText;
    if (!textToSend.trim()) return;

    try {
      const newMsg = await api.sendMessage({
        productId: product.id,
        senderId: currentUser.id,
        receiverId: product.sellerId,
        message: textToSend,
        messageType: type,
        offeredPrice: type === 'OFFER' ? parseFloat(proposedPrice) : null,
        proposedLocation: type === 'PICKUP_PROPOSAL' ? proposedPickup : null
      });
      setMessages([...messages, newMsg]);
      setInputText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleOfferPrice = () => {
    if (!proposedPrice) return;
    handleSendMessage(`Offer: Can you do $${proposedPrice} for this? I can pick it up today.`, 'OFFER');
  };

  const handleProposePickup = () => {
    if (!proposedPickup) return;
    handleSendMessage(`Pickup Spot: How about meeting at ${proposedPickup}?`, 'PICKUP_PROPOSAL');
  };

  const handleConfirmDeal = () => {
    onAgreeDeal({
      productId: product.id,
      productTitle: product.title,
      buyerId: currentUser.id,
      buyerName: currentUser.name,
      sellerId: product.sellerId,
      sellerName: product.sellerName,
      transactionType: 'PURCHASE',
      agreedPrice: parseFloat(proposedPrice) || product.price,
      pickupLocation: proposedPickup,
      meetingTime: 'Today evening after 5 PM'
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px', height: '85vh', display: 'flex', flexDirection: 'column' }}>
        
        {/* Header */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img 
              src={product.imageUrl} 
              alt={product.title} 
              style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80';
              }}
            />
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>
                {product.title}
              </h4>
              <div style={{ fontSize: '12px', color: '#64748b' }}>
                Listed at <strong style={{ color: '#4f46e5' }}>${product.price}</strong> • Seller: {product.sellerName} ({product.hostelLocation})
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{ color: '#94a3b8' }}><X size={20} /></button>
        </div>

        {/* Quick Deal Actions Bar (Flowchart: Agree on Price & Pickup) */}
        <div style={{ padding: '12px 20px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '2px 8px' }}>
              <span style={{ fontSize: '12px', color: '#64748b', marginRight: '4px' }}>$</span>
              <input
                type="number"
                value={proposedPrice}
                onChange={(e) => setProposedPrice(e.target.value)}
                style={{ width: '54px', border: 'none', fontSize: '13px', fontWeight: '700' }}
              />
            </div>
            <button
              onClick={handleOfferPrice}
              style={{
                fontSize: '12px',
                fontWeight: '700',
                padding: '6px 10px',
                borderRadius: '8px',
                background: '#eef2ff',
                color: '#4f46e5',
                border: '1px solid #c7d2fe'
              }}
            >
              Offer Price
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handleProposePickup}
              style={{
                fontSize: '12px',
                fontWeight: '700',
                padding: '6px 10px',
                borderRadius: '8px',
                background: '#ecfdf5',
                color: '#065f46',
                border: '1px solid #a7f3d0'
              }}
            >
              📍 Suggest Pickup
            </button>

            {/* Complete Agreement Button from Flowchart */}
            <button
              onClick={handleConfirmDeal}
              style={{
                fontSize: '12px',
                fontWeight: '700',
                padding: '6px 14px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                color: 'white',
                boxShadow: '0 2px 6px rgba(5, 150, 105, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <CheckCircle size={14} /> Agree & Finalize Deal
            </button>
          </div>
        </div>

        {/* Messages Stream */}
        <div style={{ flex: '1', overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', background: '#ffffff' }}>
          {messages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
              <MessageSquare size={36} color="#cbd5e1" style={{ margin: '0 auto 10px' }} />
              <p style={{ fontSize: '13px' }}>Start the conversation with {product.sellerName} to agree on price and campus pickup spot.</p>
            </div>
          ) : (
            messages.map((m, idx) => {
              const isMe = m.senderId === currentUser.id;
              return (
                <div key={idx} style={{ alignSelf: isMe ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                  <div style={{
                    fontSize: '11px',
                    color: '#94a3b8',
                    marginBottom: '2px',
                    textAlign: isMe ? 'right' : 'left'
                  }}>
                    {isMe ? 'You' : (m.senderName || product.sellerName)}
                  </div>
                  <div style={{
                    padding: '10px 14px',
                    borderRadius: isMe ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                    background: isMe ? '#4f46e5' : '#f1f5f9',
                    color: isMe ? 'white' : '#1e293b',
                    fontSize: '13px',
                    lineHeight: '1.4',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    {m.message}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Input Bar */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Type message to agree on price & meeting spot..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            style={{ flex: '1', padding: '10px 16px', borderRadius: '9999px', fontSize: '14px', border: '1px solid #cbd5e1' }}
          />
          <button
            onClick={() => handleSendMessage()}
            style={{
              background: '#4f46e5',
              color: 'white',
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Send size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}
