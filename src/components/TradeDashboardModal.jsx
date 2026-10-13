import React, { useState } from 'react';
import { 
  X, 
  Repeat, 
  Check, 
  XOctagon, 
  MapPin, 
  Clock, 
  Calendar, 
  ArrowRightLeft, 
  CheckCircle2, 
  Star,
  MessageSquare
} from 'lucide-react';

export default function TradeDashboardModal({ 
  incomingTrades = [], 
  outgoingTrades = [], 
  currentUser, 
  onClose, 
  onAcceptTrade, 
  onRejectTrade, 
  onArrangeExchange,
  onCompleteTrade,
  onOpenReviewModal
}) {
  const [activeTab, setActiveTab] = useState('INCOMING');
  const [arrangingTradeId, setArrangingTradeId] = useState(null);
  const [pickupSpot, setPickupSpot] = useState('Hostel Quad / Central Library Lawn');
  const [meetingTime, setMeetingTime] = useState('Tomorrow 5:00 PM after class');

  const handleArrangeSubmit = (tradeId) => {
    onArrangeExchange(tradeId, { pickupSpot, meetingTime });
    setArrangingTradeId(null);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
        
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#fffbeb', color: '#b45309', padding: '8px', borderRadius: '10px' }}>
              <Repeat size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>
                Campus Trade Center
              </h3>
              <p style={{ fontSize: '12px', color: '#64748b' }}>
                Review incoming proposals, accept/decline, arrange exchange & complete swaps
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ color: '#94a3b8' }}><X size={20} /></button>
        </div>

        {/* Tab Selector */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
          <button
            onClick={() => setActiveTab('INCOMING')}
            style={{
              flex: '1',
              padding: '12px',
              fontSize: '13px',
              fontWeight: '700',
              borderBottom: activeTab === 'INCOMING' ? '2px solid #4f46e5' : 'none',
              color: activeTab === 'INCOMING' ? '#4f46e5' : '#64748b',
              background: activeTab === 'INCOMING' ? 'white' : 'transparent'
            }}
          >
            Incoming Trade Requests ({incomingTrades.length})
          </button>
          <button
            onClick={() => setActiveTab('OUTGOING')}
            style={{
              flex: '1',
              padding: '12px',
              fontSize: '13px',
              fontWeight: '700',
              borderBottom: activeTab === 'OUTGOING' ? '2px solid #4f46e5' : 'none',
              color: activeTab === 'OUTGOING' ? '#4f46e5' : '#64748b',
              background: activeTab === 'OUTGOING' ? 'white' : 'transparent'
            }}
          >
            My Sent Trade Proposals ({outgoingTrades.length})
          </button>
        </div>

        {/* Body List */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '60vh', overflowY: 'auto' }}>
          
          {activeTab === 'INCOMING' && (
            incomingTrades.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: '#64748b' }}>
                <Repeat size={36} color="#cbd5e1" style={{ margin: '0 auto 10px' }} />
                <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#334155' }}>No incoming trade offers</h4>
                <p style={{ fontSize: '13px', marginTop: '4px' }}>
                  When other students offer to swap their items for your listings, they will show up here.
                </p>
              </div>
            ) : (
              incomingTrades.map(trade => (
                <div 
                  key={trade.id}
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '16px',
                    background: 'white',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  {/* Status Banner */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '12px', fontWeight: '700', color: '#1e293b' }}>
                        Proposal from {trade.requesterName}
                      </span>
                    </div>

                    <span style={{
                      fontSize: '11px',
                      fontWeight: '800',
                      padding: '3px 8px',
                      borderRadius: '9999px',
                      background: trade.status === 'ACCEPTED' ? '#ecfdf5' : trade.status === 'REJECTED' ? '#fef2f2' : '#fffbeb',
                      color: trade.status === 'ACCEPTED' ? '#065f46' : trade.status === 'REJECTED' ? '#991b1b' : '#92400e',
                      border: `1px solid ${trade.status === 'ACCEPTED' ? '#a7f3d0' : trade.status === 'REJECTED' ? '#fecaca' : '#fde68a'}`
                    }}>
                      {trade.status}
                    </span>
                  </div>

                  {/* Trade Exchange Representation */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: '#f8fafc',
                    padding: '12px',
                    borderRadius: '10px',
                    gap: '12px',
                    marginBottom: '12px'
                  }}>
                    <div style={{ flex: '1' }}>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>They want your:</div>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>{trade.targetProductTitle}</div>
                    </div>
                    <ArrowRightLeft size={16} color="#4f46e5" />
                    <div style={{ flex: '1', textAlign: 'right' }}>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>They offer:</div>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: '#059669' }}>{trade.offeredItemTitle}</div>
                    </div>
                  </div>

                  {trade.message && (
                    <div style={{ fontSize: '13px', color: '#475569', fontStyle: 'italic', marginBottom: '14px', background: '#f1f5f9', padding: '8px 12px', borderRadius: '8px' }}>
                      "{trade.message}"
                    </div>
                  )}

                  {/* Action Handlers based on Flowchart */}
                  {trade.status === 'PENDING' && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                      <button
                        onClick={() => onRejectTrade(trade.id)}
                        style={{
                          padding: '8px 14px',
                          borderRadius: '8px',
                          background: '#fef2f2',
                          color: '#dc2626',
                          border: '1px solid #fecaca',
                          fontSize: '12px',
                          fontWeight: '700',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}
                      >
                        <XOctagon size={14} /> Decline
                      </button>
                      <button
                        onClick={() => onAcceptTrade(trade.id)}
                        style={{
                          padding: '8px 18px',
                          borderRadius: '8px',
                          background: '#059669',
                          color: 'white',
                          fontSize: '12px',
                          fontWeight: '700',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}
                      >
                        <Check size={14} /> Accept Trade
                      </button>
                    </div>
                  )}

                  {/* If Accepted -> Flowchart Step: Arrange Exchange */}
                  {trade.status === 'ACCEPTED' && (
                    <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #f1f5f9' }}>
                      {arrangingTradeId === trade.id ? (
                        <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px' }}>
                          <h5 style={{ fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>
                            Flowchart Step: Arrange Campus Exchange
                          </h5>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
                            <input
                              type="text"
                              value={pickupSpot}
                              onChange={(e) => setPickupSpot(e.target.value)}
                              placeholder="Safe Meeting Spot"
                              style={{ padding: '8px', borderRadius: '8px', fontSize: '12px' }}
                            />
                            <input
                              type="text"
                              value={meetingTime}
                              onChange={(e) => setMeetingTime(e.target.value)}
                              placeholder="Time (e.g. 5 PM today)"
                              style={{ padding: '8px', borderRadius: '8px', fontSize: '12px' }}
                            />
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                            <button
                              onClick={() => setArrangingTradeId(null)}
                              style={{ fontSize: '12px', padding: '6px 12px', color: '#64748b' }}
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleArrangeSubmit(trade.id)}
                              style={{ fontSize: '12px', padding: '6px 14px', background: '#4f46e5', color: 'white', borderRadius: '8px', fontWeight: '700' }}
                            >
                              Confirm Logistics
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ fontSize: '12px', color: '#047857' }}>
                            {trade.pickupSpot ? (
                              <span>📍 Meeting at <strong>{trade.pickupSpot}</strong> ({trade.meetingTime})</span>
                            ) : (
                              <span>Trade Accepted! Next: Arrange campus meeting spot.</span>
                            )}
                          </div>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              onClick={() => setArrangingTradeId(trade.id)}
                              style={{
                                padding: '6px 12px',
                                borderRadius: '8px',
                                background: '#f1f5f9',
                                color: '#1e293b',
                                fontSize: '12px',
                                fontWeight: '700'
                              }}
                            >
                              {trade.pickupSpot ? 'Edit Logistics' : 'Arrange Exchange'}
                            </button>
                            <button
                              onClick={() => onCompleteTrade(trade)}
                              style={{
                                padding: '6px 14px',
                                borderRadius: '8px',
                                background: '#059669',
                                color: 'white',
                                fontSize: '12px',
                                fontWeight: '700'
                              }}
                            >
                              Complete & Review
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              ))
            )
          )}

          {activeTab === 'OUTGOING' && (
            outgoingTrades.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: '#64748b' }}>
                <ArrowRightLeft size={36} color="#cbd5e1" style={{ margin: '0 auto 10px' }} />
                <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#334155' }}>No outgoing trade proposals</h4>
                <p style={{ fontSize: '13px', marginTop: '4px' }}>
                  Browse items on the marketplace marked "Open for Trade" and propose a swap.
                </p>
              </div>
            ) : (
              outgoingTrades.map(trade => (
                <div 
                  key={trade.id}
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '16px',
                    background: 'white'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#1e293b' }}>
                      Trade offer sent to {trade.targetSellerName}
                    </div>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: '800',
                      padding: '3px 8px',
                      borderRadius: '9999px',
                      background: trade.status === 'ACCEPTED' ? '#ecfdf5' : trade.status === 'REJECTED' ? '#fef2f2' : '#fffbeb',
                      color: trade.status === 'ACCEPTED' ? '#065f46' : trade.status === 'REJECTED' ? '#991b1b' : '#92400e',
                    }}>
                      {trade.status}
                    </span>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: '#f8fafc',
                    padding: '12px',
                    borderRadius: '10px',
                    gap: '12px'
                  }}>
                    <div style={{ flex: '1' }}>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>You offered:</div>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: '#059669' }}>{trade.offeredItemTitle}</div>
                    </div>
                    <ArrowRightLeft size={16} color="#4f46e5" />
                    <div style={{ flex: '1', textAlign: 'right' }}>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>For their:</div>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>{trade.targetProductTitle}</div>
                    </div>
                  </div>

                  {trade.pickupSpot && (
                    <div style={{ marginTop: '10px', fontSize: '12px', color: '#4f46e5', fontWeight: '600' }}>
                      📍 Agreed Exchange Point: {trade.pickupSpot} ({trade.meetingTime})
                    </div>
                  )}

                </div>
              ))
            )
          )}

        </div>

      </div>
    </div>
  );
}
