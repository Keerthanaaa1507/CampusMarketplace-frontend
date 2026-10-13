import React from 'react';
import { 
  Layers, 
  Home, 
  FlaskConical, 
  BookOpen, 
  Cpu, 
  Tag, 
  Repeat, 
  DollarSign,
  Sparkles
} from 'lucide-react';

export default function CategoryFilter({ 
  selectedCategory, 
  setSelectedCategory, 
  selectedListingType, 
  setSelectedListingType,
  totalCount
}) {
  const categories = [
    { id: 'ALL', label: 'All Essentials', icon: Layers, count: totalCount },
    { id: 'HOSTEL_ESSENTIALS', label: 'Hostel Essentials', icon: Home, badgeColor: '#3b82f6' },
    { id: 'LAB_EQUIPMENT', label: 'Lab Equipment', icon: FlaskConical, badgeColor: '#10b981' },
    { id: 'TEXTBOOKS', label: 'Textbooks & Notes', icon: BookOpen, badgeColor: '#f59e0b' },
    { id: 'ELECTRONICS', label: 'Electronics & Kits', icon: Cpu, badgeColor: '#8b5cf6' },
  ];

  return (
    <div style={{ marginBottom: '24px' }}>
      
      {/* Category Pills */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 18px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: isSelected ? '700' : '600',
                  background: isSelected ? '#1e293b' : 'white',
                  color: isSelected ? 'white' : '#475569',
                  border: `1px solid ${isSelected ? '#1e293b' : '#e2e8f0'}`,
                  boxShadow: isSelected ? '0 4px 10px rgba(15, 23, 42, 0.15)' : 'none',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={16} color={isSelected ? '#38bdf8' : '#64748b'} />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Listing Type Filter (Buy vs Trade) */}
        <div style={{
          display: 'flex',
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '4px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <button
            onClick={() => setSelectedListingType('ALL')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '700',
              background: selectedListingType === 'ALL' ? '#f1f5f9' : 'transparent',
              color: selectedListingType === 'ALL' ? '#0f172a' : '#64748b'
            }}
          >
            All Listings
          </button>
          <button
            onClick={() => setSelectedListingType('FOR_SALE')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '700',
              background: selectedListingType === 'FOR_SALE' ? '#ecfdf5' : 'transparent',
              color: selectedListingType === 'FOR_SALE' ? '#065f46' : '#64748b'
            }}
          >
            <DollarSign size={13} />
            Buy (Cash)
          </button>
          <button
            onClick={() => setSelectedListingType('FOR_TRADE')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '700',
              background: selectedListingType === 'FOR_TRADE' ? '#fffbeb' : 'transparent',
              color: selectedListingType === 'FOR_TRADE' ? '#92400e' : '#64748b'
            }}
          >
            <Repeat size={13} />
            Barter Trade
          </button>
        </div>

      </div>

    </div>
  );
}
