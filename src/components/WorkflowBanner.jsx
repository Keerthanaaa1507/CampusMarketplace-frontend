import React, { useState } from 'react';
import { 
  GitBranch, 
  ArrowRight, 
  CheckCircle2, 
  ShoppingBag, 
  Tag, 
  Repeat, 
  UserPlus, 
  MessageSquare, 
  Star, 
  Compass,
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function WorkflowBanner({ 
  activeBranch, 
  setActiveBranch, 
  onSelectAction, 
  onOpenAuth,
  onOpenPostListing,
  onOpenTradeDashboard
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      border: '1px solid #e2e8f0',
      padding: collapsed ? '14px 20px' : '20px 24px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
      marginBottom: '28px',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: collapsed ? '0' : '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            background: '#eef2ff',
            color: '#4f46e5',
            padding: '6px',
            borderRadius: '8px',
            display: 'flex'
          }}>
            <GitBranch size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>
              Campus Marketplace Workflow Process Map
            </h3>
            <p style={{ fontSize: '12px', color: '#64748b' }}>
              Directly aligned with student marketplace protocol: Buy, Sell, and Trade Hostel Essentials, Lab Tools & Textbooks
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Branch Selectors */}
          <div style={{
            display: 'flex',
            background: '#f1f5f9',
            padding: '3px',
            borderRadius: '10px',
            border: '1px solid #e2e8f0'
          }}>
            <button
              onClick={() => setActiveBranch('BUY')}
              style={{
                padding: '5px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '700',
                background: activeBranch === 'BUY' ? '#4f46e5' : 'transparent',
                color: activeBranch === 'BUY' ? 'white' : '#475569',
              }}
            >
              1. Buy Flow
            </button>
            <button
              onClick={() => setActiveBranch('SELL')}
              style={{
                padding: '5px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '700',
                background: activeBranch === 'SELL' ? '#059669' : 'transparent',
                color: activeBranch === 'SELL' ? 'white' : '#475569',
              }}
            >
              2. Sell Flow
            </button>
            <button
              onClick={() => setActiveBranch('TRADE')}
              style={{
                padding: '5px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '700',
                background: activeBranch === 'TRADE' ? '#d97706' : 'transparent',
                color: activeBranch === 'TRADE' ? 'white' : '#475569',
              }}
            >
              3. Trade Flow
            </button>
          </div>

          <button 
            onClick={() => setCollapsed(!collapsed)}
            style={{
              padding: '6px',
              borderRadius: '8px',
              color: '#64748b',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center'
            }}
            title={collapsed ? 'Expand diagram' : 'Collapse diagram'}
          >
            {collapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          </button>
        </div>
      </div>

      {!collapsed && (
        <div>
          {/* Branch Specific Step Ribbon */}
          {activeBranch === 'BUY' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '8px',
              alignItems: 'center',
              background: '#f8fafc',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#4f46e5' }}>STEP 1</span>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#1e293b', marginTop: '2px' }}>Browse & Search</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Search essentials</div>
              </div>
              <div style={{ textAlign: 'center', color: '#cbd5e1' }}><ArrowRight size={16} /></div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#4f46e5' }}>STEP 2</span>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#1e293b', marginTop: '2px' }}>Select Category</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Hostel / Lab / Books</div>
              </div>
              <div style={{ textAlign: 'center', color: '#cbd5e1' }}><ArrowRight size={16} /></div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#4f46e5' }}>STEP 3</span>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#1e293b', marginTop: '2px' }}>Contact Seller</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Chat & make offer</div>
              </div>
              <div style={{ textAlign: 'center', color: '#cbd5e1' }}><ArrowRight size={16} /></div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#4f46e5' }}>STEP 4</span>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#1e293b', marginTop: '2px' }}>Meet & Complete</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Exchange & Rate peer</div>
              </div>
            </div>
          )}

          {activeBranch === 'SELL' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '8px',
              alignItems: 'center',
              background: '#f0fdf4',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid #bbf7d0'
            }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#059669' }}>STEP 1</span>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#1e293b', marginTop: '2px' }}>Add Product Listing</div>
                <button 
                  onClick={onOpenPostListing}
                  style={{ fontSize: '11px', color: '#059669', fontWeight: '700', textDecoration: 'underline', marginTop: '2px' }}
                >
                  Click to Post
                </button>
              </div>
              <div style={{ textAlign: 'center', color: '#86efac' }}><ArrowRight size={16} /></div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#059669' }}>STEP 2</span>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#1e293b', marginTop: '2px' }}>Enter Details & Price</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Condition & Hostel Block</div>
              </div>
              <div style={{ textAlign: 'center', color: '#86efac' }}><ArrowRight size={16} /></div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#059669' }}>STEP 3</span>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#1e293b', marginTop: '2px' }}>Upload Image & Publish</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Live on campus feed</div>
              </div>
              <div style={{ textAlign: 'center', color: '#86efac' }}><ArrowRight size={16} /></div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#059669' }}>STEP 4</span>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#1e293b', marginTop: '2px' }}>Respond & Exchange</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Confirm deal & rate buyer</div>
              </div>
            </div>
          )}

          {activeBranch === 'TRADE' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '8px',
              alignItems: 'center',
              background: '#fffbeb',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid #fde68a'
            }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#b45309' }}>STEP 1</span>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#1e293b', marginTop: '2px' }}>Select Item to Trade</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Your book or lab tool</div>
              </div>
              <div style={{ textAlign: 'center', color: '#fcd34d' }}><ArrowRight size={16} /></div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#b45309' }}>STEP 2</span>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#1e293b', marginTop: '2px' }}>Browse Trade Listings</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Filter by "For Trade"</div>
              </div>
              <div style={{ textAlign: 'center', color: '#fcd34d' }}><ArrowRight size={16} /></div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#b45309' }}>STEP 3</span>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#1e293b', marginTop: '2px' }}>Send Trade Request</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Peer reviews offer</div>
              </div>
              <div style={{ textAlign: 'center', color: '#fcd34d' }}><ArrowRight size={16} /></div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#b45309' }}>STEP 4</span>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#1e293b', marginTop: '2px' }}>Accepted? Arrange Swap</div>
                <button 
                  onClick={onOpenTradeDashboard}
                  style={{ fontSize: '11px', color: '#b45309', fontWeight: '700', textDecoration: 'underline', marginTop: '2px' }}
                >
                  View Active Trades
                </button>
              </div>
            </div>
          )}

          {/* Verification Protocol Notice */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '12px',
            padding: '8px 14px',
            background: '#f8fafc',
            borderRadius: '8px',
            fontSize: '12px',
            color: '#64748b'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={15} color="#059669" />
              <span>Campus Safety: Only students with verified College IDs & registered Hostel Blocks can initiate trades.</span>
            </div>
            <button 
              onClick={onOpenAuth}
              style={{ color: '#4f46e5', fontWeight: '700', textDecoration: 'underline' }}
            >
              Verify / Switch Student Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
