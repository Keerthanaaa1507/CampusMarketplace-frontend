import React from 'react';
import { 
  X, 
  MapPin, 
  ShieldCheck, 
  Star, 
  Repeat, 
  MessageSquare, 
  Tag, 
  CheckCircle,
  Building,
  User,
  ArrowRightLeft
} from 'lucide-react';

export default function ProductDetailModal({ 
  product, 
  currentUser, 
  onClose, 
  onContactSeller, 
  onInitiateTrade 
}) {
  if (!product) return null;

  const isOwner = currentUser && currentUser.id === product.sellerId;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
        
        {/* Header */}
        <div style={{ position: 'relative' }}>
          <img 
            src={product.imageUrl} 
            alt={product.title}
            style={{ width: '100%', height: '280px', objectFit: 'cover' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80';
            }}
          />
          <button 
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'rgba(15, 23, 42, 0.75)',
              color: 'white',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{
              background: '#e0e7ff',
              color: '#3730a3',
              fontSize: '12px',
              fontWeight: '700',
              padding: '4px 10px',
              borderRadius: '9999px',
              textTransform: 'uppercase'
            }}>
              {product.category?.replace('_', ' ')}
            </span>

            <span style={{
              background: '#f1f5f9',
              color: '#334155',
              fontSize: '12px',
              fontWeight: '600',
              padding: '4px 10px',
              borderRadius: '9999px'
            }}>
              Condition: {product.condition?.replace('_', ' ')}
            </span>
          </div>

          <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>
            {product.title}
          </h2>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '16px' }}>
            {product.listingType !== 'FOR_TRADE' && (
              <span style={{ fontSize: '28px', fontWeight: '800', color: '#4f46e5' }}>
                ${product.price?.toFixed(0)}
              </span>
            )}
            {(product.listingType === 'FOR_TRADE' || product.listingType === 'BOTH') && (
              <span style={{
                background: '#fffbeb',
                color: '#b45309',
                border: '1px solid #fde68a',
                padding: '4px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '700',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <Repeat size={14} /> Open for Barter Trade
              </span>
            )}
          </div>

          <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.6', marginBottom: '20px' }}>
            {product.description}
          </p>

          {/* Trade Wishlist info */}
          {product.tradePreferences && (
            <div style={{
              background: '#fffbeb',
              border: '1px solid #fde68a',
              borderRadius: '12px',
              padding: '12px 16px',
              marginBottom: '20px'
            }}>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#92400e', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <ArrowRightLeft size={14} /> Seller's Desired Trade Items:
              </div>
              <div style={{ fontSize: '13px', color: '#78350f' }}>
                "{product.tradePreferences}"
              </div>
            </div>
          )}

          {/* Seller Card */}
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '24px'
          }}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '10px' }}>
              Student Seller Information
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#e0e7ff',
                  color: '#4338ca',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px'
                }}>
                  {product.sellerName ? product.sellerName[0] : 'U'}
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>
                    {product.sellerName}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                    {product.hostelLocation}
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span className="verified-badge">
                  <ShieldCheck size={13} /> College ID Verified
                </span>
                <div style={{ fontSize: '12px', color: '#475569', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '3px', justifyContent: 'flex-end' }}>
                  <Star size={13} fill="#eab308" color="#eab308" />
                  <strong>4.9 / 5.0</strong> (Campus Trust Score)
                </div>
              </div>
            </div>

            <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#475569' }}>
              <MapPin size={15} color="#4f46e5" />
              <span>Recommended Pickup: <strong>{product.preferredPickupSpot || 'Hostel Quad / Central Library'}</strong></span>
            </div>
          </div>

          {/* Action Bar */}
          {!isOwner ? (
            <div style={{ display: 'grid', gridTemplateColumns: (product.listingType === 'BOTH' || product.listingType === 'FOR_TRADE') ? '1fr 1fr' : '1fr', gap: '12px' }}>
              
              <button
                onClick={() => { onClose(); onContactSeller(product); }}
                style={{
                  padding: '12px 20px',
                  borderRadius: '12px',
                  background: 'var(--primary)',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(79, 70, 229, 0.25)'
                }}
              >
                <MessageSquare size={17} />
                Contact Seller / Make Offer
              </button>

              {(product.listingType === 'FOR_TRADE' || product.listingType === 'BOTH') && (
                <button
                  onClick={() => { onClose(); onInitiateTrade(product); }}
                  style={{
                    padding: '12px 20px',
                    borderRadius: '12px',
                    background: '#fffbeb',
                    color: '#92400e',
                    border: '1px solid #fde68a',
                    fontSize: '14px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <Repeat size={17} />
                  Initiate Trade Swap
                </button>
              )}

            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '12px',
              background: '#f1f5f9',
              borderRadius: '12px',
              color: '#475569',
              fontWeight: '700'
            }}>
              This is your listing. Students will reach out to you via Chat and Trades.
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
