import React from 'react';
import { 
  MapPin, 
  Star, 
  Repeat, 
  MessageSquare, 
  ShieldCheck, 
  DollarSign, 
  ArrowRightLeft,
  CheckCircle2,
  Clock
} from 'lucide-react';

export default function ProductCard({ 
  product, 
  currentUser, 
  onViewDetails, 
  onContactSeller, 
  onInitiateTrade 
}) {
  const isOwner = currentUser && currentUser.id === product.sellerId;
  const isAvailable = product.status === 'AVAILABLE';

  // Helper for category badge styling
  const getCategoryClass = (cat) => {
    switch (cat) {
      case 'HOSTEL_ESSENTIALS': return 'badge-category badge-hostel';
      case 'LAB_EQUIPMENT': return 'badge-category badge-lab';
      case 'TEXTBOOKS': return 'badge-category badge-textbook';
      case 'ELECTRONICS': return 'badge-category badge-electronics';
      default: return 'badge-category badge-other';
    }
  };

  const getCategoryLabel = (cat) => {
    switch (cat) {
      case 'HOSTEL_ESSENTIALS': return 'Hostel Essential';
      case 'LAB_EQUIPMENT': return 'Lab Equipment';
      case 'TEXTBOOKS': return 'Textbook';
      case 'ELECTRONICS': return 'Electronics';
      default: return cat;
    }
  };

  return (
    <div className="product-card" style={{ opacity: isAvailable ? 1 : 0.75 }}>
      {/* Image Container */}
      <div className="product-image-container" onClick={() => onViewDetails(product)} style={{ cursor: 'pointer' }}>
        <img 
          src={product.imageUrl || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80'} 
          alt={product.title} 
          className="product-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80';
          }}
        />

        {/* Category Badge */}
        <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
          <span className={getCategoryClass(product.category)}>
            {getCategoryLabel(product.category)}
          </span>
        </div>

        {/* Status / Condition Badges */}
        <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '6px' }}>
          {product.status === 'RESERVED' && (
            <span style={{
              background: '#fef3c7',
              color: '#92400e',
              border: '1px solid #fde68a',
              fontSize: '11px',
              fontWeight: '700',
              padding: '3px 8px',
              borderRadius: '9999px'
            }}>
              Pending Deal
            </span>
          )}
          {product.status === 'COMPLETED' && (
            <span style={{
              background: '#f1f5f9',
              color: '#475569',
              fontSize: '11px',
              fontWeight: '700',
              padding: '3px 8px',
              borderRadius: '9999px'
            }}>
              Exchanged
            </span>
          )}
          <span style={{
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(4px)',
            color: 'white',
            fontSize: '11px',
            fontWeight: '600',
            padding: '3px 8px',
            borderRadius: '9999px'
          }}>
            {product.condition?.replace('_', ' ')}
          </span>
        </div>

        {/* Pricing / Mode Ribbon */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          {product.listingType !== 'FOR_TRADE' && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '4px 10px',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: '800',
              color: '#0f172a',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}>
              ${product.price?.toFixed(0)}
            </div>
          )}

          {(product.listingType === 'FOR_TRADE' || product.listingType === 'BOTH') && (
            <div style={{
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              color: '#92400e',
              border: '1px solid #fcd34d',
              padding: '4px 10px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
            }}>
              <Repeat size={13} />
              Open for Trade
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: '1' }}>
        
        <h4 
          onClick={() => onViewDetails(product)}
          style={{ 
            fontSize: '15px', 
            fontWeight: '700', 
            color: '#0f172a', 
            lineHeight: '1.35', 
            marginBottom: '6px',
            cursor: 'pointer'
          }}
        >
          {product.title}
        </h4>

        <p style={{ 
          fontSize: '13px', 
          color: '#64748b', 
          lineHeight: '1.4', 
          marginBottom: '12px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {product.description}
        </p>

        {/* Trade Preference Wishlist if present */}
        {product.tradePreferences && (
          <div style={{
            background: '#fffbeb',
            border: '1px dashed #fde68a',
            borderRadius: '8px',
            padding: '6px 10px',
            marginBottom: '12px',
            fontSize: '12px',
            color: '#92400e',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <ArrowRightLeft size={13} style={{ flexShrink: 0 }} />
            <span style={{ fontStyle: 'italic', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              Wants: {product.tradePreferences}
            </span>
          </div>
        )}

        {/* Location & Seller Meta */}
        <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid #f1f5f9' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b' }}>
              <MapPin size={14} color="#6366f1" />
              <span style={{ fontWeight: '500' }}>{product.preferredPickupSpot || product.hostelLocation}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '12px', fontWeight: '700', color: '#0f172a' }}>
              <Star size={13} color="#eab308" fill="#eab308" />
              <span>4.9</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                background: '#e0e7ff',
                color: '#4338ca',
                fontSize: '10px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {product.sellerName ? product.sellerName[0] : 'S'}
              </div>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#334155' }}>
                {product.sellerName}
              </span>
            </div>

            <span className="verified-badge">
              <ShieldCheck size={12} /> ID Verified
            </span>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: (product.listingType === 'BOTH' || product.listingType === 'FOR_TRADE') && !isOwner ? '1fr 1fr' : '1fr', gap: '8px' }}>
            
            {/* Buy / Contact Button */}
            {!isOwner ? (
              <button
                onClick={() => onContactSeller(product)}
                disabled={!isAvailable}
                style={{
                  padding: '9px 12px',
                  borderRadius: '10px',
                  background: isAvailable ? 'var(--primary)' : '#94a3b8',
                  color: 'white',
                  fontSize: '13px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  boxShadow: isAvailable ? '0 2px 6px rgba(79, 70, 229, 0.2)' : 'none'
                }}
              >
                <MessageSquare size={15} />
                {product.listingType === 'FOR_TRADE' ? 'Message' : 'Buy / Offer'}
              </button>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '8px',
                background: '#f1f5f9',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '700',
                color: '#475569'
              }}>
                Your Listing
              </div>
            )}

            {/* Trade Request Button */}
            {!isOwner && (product.listingType === 'FOR_TRADE' || product.listingType === 'BOTH') && (
              <button
                onClick={() => onInitiateTrade(product)}
                disabled={!isAvailable}
                style={{
                  padding: '9px 12px',
                  borderRadius: '10px',
                  background: isAvailable ? '#fffbeb' : '#f1f5f9',
                  color: isAvailable ? '#92400e' : '#94a3b8',
                  border: isAvailable ? '1px solid #fde68a' : '1px solid #e2e8f0',
                  fontSize: '13px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '5px'
                }}
              >
                <Repeat size={14} />
                Trade
              </button>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
