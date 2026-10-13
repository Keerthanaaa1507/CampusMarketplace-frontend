import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Sparkles, 
  DollarSign, 
  Repeat, 
  MapPin, 
  CheckCircle2, 
  Layers, 
  ImageIcon,
  Plus
} from 'lucide-react';

export default function PostListingModal({ currentUser, onClose, onCreated }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('HOSTEL_ESSENTIALS');
  const [listingType, setListingType] = useState('FOR_SALE');
  const [price, setPrice] = useState('');
  const [tradePreferences, setTradePreferences] = useState('');
  const [condition, setCondition] = useState('LIKE_NEW');
  const [description, setDescription] = useState('');
  const [preferredPickupSpot, setPreferredPickupSpot] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Sample preset images for hostel essentials, lab equipment, textbooks
  const PRESET_IMAGES = [
    { label: 'Electric Kettle', cat: 'HOSTEL_ESSENTIALS', url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80' },
    { label: 'Foam Mattress', cat: 'HOSTEL_ESSENTIALS', url: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80' },
    { label: 'Study Lamp', cat: 'HOSTEL_ESSENTIALS', url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80' },
    { label: 'Lab Coat', cat: 'LAB_EQUIPMENT', url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80' },
    { label: 'Mini Drafter / Tools', cat: 'LAB_EQUIPMENT', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
    { label: 'Arduino / Kits', cat: 'LAB_EQUIPMENT', url: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=600&q=80' },
    { label: 'Engg Textbooks', cat: 'TEXTBOOKS', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80' },
    { label: 'Code & CS Books', cat: 'TEXTBOOKS', url: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&w=600&q=80' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    if (listingType !== 'FOR_TRADE' && (!price || parseFloat(price) <= 0)) {
      setError('Please provide a valid sale price');
      return;
    }

    setLoading(true);
    setError('');

    const newProduct = {
      title,
      description,
      category,
      listingType,
      price: listingType === 'FOR_TRADE' ? 0 : parseFloat(price),
      tradePreferences: (listingType === 'FOR_TRADE' || listingType === 'BOTH') ? tradePreferences : null,
      condition,
      imageUrl: imageUrl || PRESET_IMAGES.find(p => p.cat === category)?.url || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
      sellerId: currentUser?.id,
      hostelLocation: currentUser?.hostelBlock ? `${currentUser.hostelBlock}, Rm ${currentUser.roomNo}` : 'Campus Hostel',
      preferredPickupSpot: preferredPickupSpot || `${currentUser?.hostelBlock || 'Hostel'} Quad`
    };

    try {
      await onCreated(newProduct);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to publish listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
        
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>
              Add Product Listing (Sell / Trade)
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b' }}>
              List hostel essentials, lab equipment, or textbooks for campus peers
            </p>
          </div>
          <button onClick={onClose} style={{ color: '#94a3b8', padding: '4px' }}>
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '10px 14px', borderRadius: '10px', fontSize: '13px', marginBottom: '16px' }}>
              {error}
            </div>
          )}

          {/* Listing Type Picker */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>
              Listing Format
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              <div 
                onClick={() => setListingType('FOR_SALE')}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  border: `2px solid ${listingType === 'FOR_SALE' ? '#4f46e5' : '#e2e8f0'}`,
                  background: listingType === 'FOR_SALE' ? '#eef2ff' : 'white',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <DollarSign size={18} color={listingType === 'FOR_SALE' ? '#4f46e5' : '#64748b'} style={{ margin: '0 auto 4px' }} />
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>Sell for Cash</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Fixed student price</div>
              </div>

              <div 
                onClick={() => setListingType('FOR_TRADE')}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  border: `2px solid ${listingType === 'FOR_TRADE' ? '#d97706' : '#e2e8f0'}`,
                  background: listingType === 'FOR_TRADE' ? '#fffbeb' : 'white',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <Repeat size={18} color={listingType === 'FOR_TRADE' ? '#d97706' : '#64748b'} style={{ margin: '0 auto 4px' }} />
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>Barter Trade</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Item for item swap</div>
              </div>

              <div 
                onClick={() => setListingType('BOTH')}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  border: `2px solid ${listingType === 'BOTH' ? '#059669' : '#e2e8f0'}`,
                  background: listingType === 'BOTH' ? '#ecfdf5' : 'white',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <Sparkles size={18} color={listingType === 'BOTH' ? '#059669' : '#64748b'} style={{ margin: '0 auto 4px' }} />
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>Cash or Trade</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Open to either</div>
              </div>
            </div>
          </div>

          {/* Title */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
              Product Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Prestige Electric Kettle 1.5L, Engineering Drafter, B.S. Grewal Math"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', fontSize: '14px' }}
            />
          </div>

          {/* Category & Condition Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', fontSize: '14px', background: 'white' }}
              >
                <option value="HOSTEL_ESSENTIALS">Hostel Essentials (Kettle, Mattress, Lamp)</option>
                <option value="LAB_EQUIPMENT">Lab Equipment (Coat, Drafter, Caliper, Kits)</option>
                <option value="TEXTBOOKS">Textbooks & Academic Notes</option>
                <option value="ELECTRONICS">Electronics & Gadgets</option>
                <option value="OTHER">Other Campus Supplies</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                Condition *
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', fontSize: '14px', background: 'white' }}
              >
                <option value="BRAND_NEW">Brand New (Unopened / Tagged)</option>
                <option value="LIKE_NEW">Like New (Barely used, flawless)</option>
                <option value="GOOD">Good (Working fine, light wear)</option>
                <option value="FAIR">Fair (Visible use, functional)</option>
              </select>
            </div>
          </div>

          {/* Price & Trade Preferences */}
          <div style={{ display: 'grid', gridTemplateColumns: listingType === 'BOTH' ? '1fr 1fr' : '1fr', gap: '14px', marginBottom: '16px' }}>
            {listingType !== 'FOR_TRADE' && (
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                  Sale Price ($) *
                </label>
                <input
                  type="number"
                  step="1"
                  min="1"
                  placeholder="e.g. 15"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', fontSize: '14px' }}
                />
              </div>
            )}

            {(listingType === 'FOR_TRADE' || listingType === 'BOTH') && (
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                  What items would you trade this for?
                </label>
                <input
                  type="text"
                  placeholder="e.g. Drafter, Casio calculator, or 2nd sem CS textbook"
                  value={tradePreferences}
                  onChange={(e) => setTradePreferences(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', fontSize: '14px' }}
                />
              </div>
            )}
          </div>

          {/* Description */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
              Description & Details
            </label>
            <textarea
              rows={3}
              placeholder="Mention semester used, warranty, reason for selling (e.g. graduating), or included accessories."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', fontSize: '14px' }}
            />
          </div>

          {/* Campus Pickup Spot */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
              Preferred Safe Campus Pickup Spot
            </label>
            <input
              type="text"
              placeholder="e.g. Hostel B Quad, Central Library Stairs, Student Cafeteria"
              value={preferredPickupSpot}
              onChange={(e) => setPreferredPickupSpot(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', fontSize: '14px' }}
            />
          </div>

          {/* Image Presets Selector */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
              Select Photo or Custom Image URL
            </label>
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '8px' }}>
              {PRESET_IMAGES.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setImageUrl(img.url)}
                  style={{
                    flexShrink: 0,
                    width: '80px',
                    borderRadius: '8px',
                    border: `2px solid ${imageUrl === img.url ? '#4f46e5' : '#e2e8f0'}`,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    textAlign: 'center',
                    background: '#f8fafc'
                  }}
                >
                  <img src={img.url} alt={img.label} style={{ width: '100%', height: '50px', objectFit: 'cover' }} />
                  <div style={{ fontSize: '10px', fontWeight: '600', padding: '2px', color: '#334155', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {img.label}
                  </div>
                </div>
              ))}
            </div>

            <input
              type="url"
              placeholder="Or paste an image URL (https://...)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', fontSize: '13px' }}
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
                padding: '10px 24px',
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
              {loading ? 'Publishing...' : 'Publish Listing'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
