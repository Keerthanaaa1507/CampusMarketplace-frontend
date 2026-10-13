import React from 'react';
import { 
  ShoppingBag, 
  PlusCircle, 
  Repeat, 
  UserCheck, 
  Search, 
  Sparkles, 
  Bell, 
  MapPin,
  GraduationCap
} from 'lucide-react';

export default function Navbar({ 
  currentUser, 
  onOpenPostListing, 
  onOpenTradeDashboard, 
  onOpenAuth, 
  searchTerm, 
  setSearchTerm,
  activeTradesCount,
  onToggleWorkflowGuide,
  showWorkflowGuide
}) {
  return (
    <header className="app-header">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px', gap: '20px' }}>
        
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div style={{
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            color: 'white',
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
          }}>
            <ShoppingBag size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '-0.02em', color: '#0f172a' }}>
                Campus<span style={{ color: '#4f46e5' }}>Xchange</span>
              </span>
              <span style={{ 
                fontSize: '11px', 
                fontWeight: '700', 
                background: '#e0e7ff', 
                color: '#3730a3', 
                padding: '2px 8px', 
                borderRadius: '9999px' 
              }}>
                STUDENT HUB
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>
              Buy, Sell & Trade Hostel Gear, Lab Tools & Books
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{ flex: '1', maxWidth: '440px', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search electric kettle, drafter, physics book, mattress..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '11px 16px 11px 42px',
              borderRadius: '9999px',
              border: '1px solid #e2e8f0',
              background: '#f8fafc',
              fontSize: '14px',
              color: '#1e293b'
            }}
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '13px', color: '#94a3b8', fontWeight: '600' }}
            >
              Clear
            </button>
          )}
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          {/* Workflow Toggle */}
          <button 
            onClick={onToggleWorkflowGuide}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '10px',
              background: showWorkflowGuide ? '#eef2ff' : '#f8fafc',
              color: showWorkflowGuide ? '#4f46e5' : '#475569',
              border: `1px solid ${showWorkflowGuide ? '#c7d2fe' : '#e2e8f0'}`,
              fontSize: '13px',
              fontWeight: '600'
            }}
            title="Interactive Flowchart Guide"
          >
            <Sparkles size={16} color={showWorkflowGuide ? '#4f46e5' : '#64748b'} />
            Flowchart Guide
          </button>

          {/* Trade Requests Center */}
          <button
            onClick={onOpenTradeDashboard}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '10px',
              background: '#fffbeb',
              color: '#b45309',
              border: '1px solid #fde68a',
              fontSize: '13px',
              fontWeight: '600'
            }}
          >
            <Repeat size={16} />
            Trades
            {activeTradesCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                background: '#dc2626',
                color: 'white',
                fontSize: '11px',
                fontWeight: '800',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 5px rgba(220, 38, 38, 0.4)'
              }}>
                {activeTradesCount}
              </span>
            )}
          </button>

          {/* Post Listing Button */}
          <button
            onClick={onOpenPostListing}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              padding: '9px 18px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600',
              boxShadow: '0 4px 10px rgba(79, 70, 229, 0.25)'
            }}
          >
            <PlusCircle size={17} />
            Post Item
          </button>

          {/* Current User Pill / Switcher */}
          <div 
            onClick={onOpenAuth}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '6px 12px 6px 6px',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '9999px',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            title="Click to Switch User Persona or Register"
          >
            <img 
              src={currentUser?.avatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=Alex'} 
              alt={currentUser?.name}
              style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e2e8f0' }}
            />
            <div style={{ textAlign: 'left', lineHeight: '1.2' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                {currentUser?.name || 'Guest Student'}
                {currentUser?.verified && (
                  <UserCheck size={14} color="#059669" />
                )}
              </div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>
                {currentUser?.hostelBlock ? `${currentUser.hostelBlock} • Rm ${currentUser.roomNo}` : 'College ID Verified'}
              </div>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
}
