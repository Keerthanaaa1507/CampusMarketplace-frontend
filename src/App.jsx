import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import WorkflowBanner from './components/WorkflowBanner';
import CategoryFilter from './components/CategoryFilter';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import PostListingModal from './components/PostListingModal';
import TradeRequestModal from './components/TradeRequestModal';
import TradeDashboardModal from './components/TradeDashboardModal';
import NegotiationModal from './components/NegotiationModal';
import ReviewModal from './components/ReviewModal';
import AuthModal from './components/AuthModal';
import { api } from './api';
import { 
  ShoppingBag, 
  Tag, 
  Repeat, 
  PlusCircle, 
  ShieldCheck, 
  Sparkles, 
  BookOpen, 
  FlaskConical, 
  Home, 
  CheckCircle2, 
  AlertCircle,
  TrendingDown,
  ArrowRight
} from 'lucide-react';

export default function App() {
  const [products, setProducts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [incomingTrades, setIncomingTrades] = useState([]);
  const [outgoingTrades, setOutgoingTrades] = useState([]);
  const [userTransactions, setUserTransactions] = useState([]);
  
  // Filters & State
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedListingType, setSelectedListingType] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeBranch, setActiveBranch] = useState('BUY'); // 'BUY', 'SELL', 'TRADE'
  const [showWorkflowGuide, setShowWorkflowGuide] = useState(true);

  // Modals
  const [showPostModal, setShowPostModal] = useState(false);
  const [showTradeDashboard, setShowTradeDashboard] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [detailProduct, setDetailProduct] = useState(null);
  const [tradeTargetProduct, setTradeTargetProduct] = useState(null);
  const [negotiatingProduct, setNegotiatingProduct] = useState(null);
  const [reviewTransaction, setReviewTransaction] = useState(null);

  // Notification alert toast
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4500);
  };

  // Initial Data Load
  useEffect(() => {
    loadInitialData();
  }, []);

  // Reload products when filters change
  useEffect(() => {
    loadProducts();
  }, [selectedCategory, selectedListingType, searchTerm]);

  // Reload trades when current user changes
  useEffect(() => {
    if (currentUser) {
      loadTradesAndTransactions(currentUser.id);
    }
  }, [currentUser]);

  const loadInitialData = async () => {
    try {
      const users = await api.getUsers();
      setAllUsers(users);
      if (users.length > 0) {
        setCurrentUser(users[0]); // Default to first student (Alex Rivera)
        loadTradesAndTransactions(users[0].id);
      }
      await loadProducts();
    } catch (e) {
      console.error('Error loading initial data:', e);
    }
  };

  const loadProducts = async () => {
    try {
      const data = await api.getProducts({
        category: selectedCategory,
        listingType: selectedListingType,
        query: searchTerm
      });
      setProducts(data);
    } catch (e) {
      console.error('Error loading products:', e);
    }
  };

  const loadTradesAndTransactions = async (userId) => {
    try {
      const [inc, out, txs] = await Promise.all([
        api.getIncomingTrades(userId),
        api.getOutgoingTrades(userId),
        api.getUserTransactions(userId)
      ]);
      setIncomingTrades(inc);
      setOutgoingTrades(out);
      setUserTransactions(txs);
    } catch (e) {
      console.error('Error loading trades & txs:', e);
    }
  };

  // Handler: Post Listing
  const handleCreateProduct = async (productData) => {
    const created = await api.createProduct(productData);
    await loadProducts();
    showToast(`🎉 Listing published! "${created.title}" is now visible to campus students.`);
  };

  // Handler: Send Trade Proposal
  const handleSubmitTrade = async (tradeData) => {
    const trade = await api.sendTradeRequest(tradeData);
    if (currentUser) loadTradesAndTransactions(currentUser.id);
    showToast(`🔄 Trade offer sent! Awaiting peer student response.`);
  };

  // Handler: Accept Trade
  const handleAcceptTrade = async (tradeId) => {
    await api.acceptTrade(tradeId);
    if (currentUser) loadTradesAndTransactions(currentUser.id);
    await loadProducts();
    showToast(`✅ Trade accepted! Next step: Arrange campus meeting time and spot.`);
  };

  // Handler: Reject Trade
  const handleRejectTrade = async (tradeId) => {
    await api.rejectTrade(tradeId);
    if (currentUser) loadTradesAndTransactions(currentUser.id);
    showToast(`Trade proposal declined.`);
  };

  // Handler: Arrange Exchange
  const handleArrangeExchange = async (tradeId, logistics) => {
    await api.arrangeExchange(tradeId, logistics);
    if (currentUser) loadTradesAndTransactions(currentUser.id);
    showToast(`📍 Exchange logistics set for ${logistics.pickupSpot} (${logistics.meetingTime})!`);
  };

  // Handler: Agree on Price & Pickup (Buy flow from chat)
  const handleAgreeDeal = async (dealData) => {
    const tx = await api.createTransaction(dealData);
    setNegotiatingProduct(null);
    if (currentUser) loadTradesAndTransactions(currentUser.id);
    await loadProducts();
    showToast(`🤝 Deal agreed! Meet at ${dealData.pickupLocation} to complete exchange.`);
  };

  // Handler: Complete Transaction
  const handleCompleteTransaction = async (txId) => {
    const completedTx = await api.completeTransaction(txId);
    if (currentUser) loadTradesAndTransactions(currentUser.id);
    await loadProducts();
    setReviewTransaction(completedTx);
    showToast(`🎉 Exchange marked completed! Please rate & review your peer.`);
  };

  // Handler: Submit Review
  const handleSubmitReview = async (reviewData) => {
    await api.submitReview(reviewData);
    if (currentUser) loadTradesAndTransactions(currentUser.id);
    const users = await api.getUsers();
    setAllUsers(users);
    showToast(`⭐ Review submitted! Campus trust score updated.`);
  };

  // User's own products
  const userProducts = products.filter(p => p.sellerId === currentUser?.id);

  // Stats calculation
  const hostelCount = products.filter(p => p.category === 'HOSTEL_ESSENTIALS').length;
  const labCount = products.filter(p => p.category === 'LAB_EQUIPMENT').length;
  const textbookCount = products.filter(p => p.category === 'TEXTBOOKS').length;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          background: '#0f172a',
          color: 'white',
          padding: '14px 20px',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '14px',
          fontWeight: '600',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <Sparkles size={18} color="#38bdf8" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navbar */}
      <Navbar
        currentUser={currentUser}
        onOpenPostListing={() => setShowPostModal(true)}
        onOpenTradeDashboard={() => setShowTradeDashboard(true)}
        onOpenAuth={() => setShowAuthModal(true)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeTradesCount={incomingTrades.filter(t => t.status === 'PENDING').length}
        onToggleWorkflowGuide={() => setShowWorkflowGuide(!showWorkflowGuide)}
        showWorkflowGuide={showWorkflowGuide}
      />

      <main className="container" style={{ flex: '1', paddingTop: '24px', paddingBottom: '60px' }}>
        
        {/* Active Campus Exchanges Alert if any are in progress */}
        {userTransactions.filter(t => t.status === 'IN_PROGRESS').length > 0 && (
          <div style={{
            background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
            border: '1px solid #6ee7b7',
            borderRadius: '14px',
            padding: '16px 20px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 2px 8px rgba(5, 150, 105, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: '#059669', color: 'white', padding: '8px', borderRadius: '50%' }}>
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#064e3b' }}>
                  Active Campus Exchange In Progress
                </h4>
                <p style={{ fontSize: '13px', color: '#065f46' }}>
                  {userTransactions.find(t => t.status === 'IN_PROGRESS')?.productTitle} • Meeting at: <strong>{userTransactions.find(t => t.status === 'IN_PROGRESS')?.pickupLocation}</strong>
                </p>
              </div>
            </div>

            <button
              onClick={() => handleCompleteTransaction(userTransactions.find(t => t.status === 'IN_PROGRESS')?.id)}
              style={{
                background: '#059669',
                color: 'white',
                padding: '9px 18px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: '700',
                boxShadow: '0 2px 6px rgba(5, 150, 105, 0.25)'
              }}
            >
              Complete Exchange & Review
            </button>
          </div>
        )}

        {/* Hero Section */}
        <div style={{
          background: 'radial-gradient(120% 120% at 50% 10%, #312e81 0%, #1e1b4b 100%)',
          color: 'white',
          borderRadius: '20px',
          padding: '36px 36px 32px',
          marginBottom: '28px',
          boxShadow: 'var(--shadow-xl)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle background glow */}
          <div style={{
            position: 'absolute',
            top: '-40px',
            right: '-40px',
            width: '260px',
            height: '260px',
            background: 'rgba(99, 102, 241, 0.25)',
            filter: 'blur(60px)',
            borderRadius: '50%'
          }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '780px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 255, 255, 0.12)', backdropFilter: 'blur(6px)', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: '700', marginBottom: '16px' }}>
              <ShieldCheck size={14} color="#34d399" />
              <span>COLLEGE-VERIFIED PEER MARKETPLACE</span>
            </div>

            <h1 style={{ fontSize: '32px', fontWeight: '800', lineHeight: '1.25', marginBottom: '12px', letterSpacing: '-0.02em' }}>
              Save Money & Barter Essentials Right on Campus
            </h1>
            <p style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '24px' }}>
              Pass down hostel kettles, mattresses, lab coats, drafters, and engineering textbooks to next semester juniors. Trade item-for-item or buy with zero shipping delays.
            </p>

            {/* Three Flow Action Cards matching Flowchart branches */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
              
              <div 
                onClick={() => { setActiveBranch('BUY'); setSelectedListingType('ALL'); }}
                style={{
                  background: activeBranch === 'BUY' ? 'rgba(79, 70, 229, 0.4)' : 'rgba(255, 255, 255, 0.08)',
                  border: `1px solid ${activeBranch === 'BUY' ? '#818cf8' : 'rgba(255, 255, 255, 0.15)'}`,
                  borderRadius: '14px',
                  padding: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ background: '#4f46e5', color: 'white', padding: '6px', borderRadius: '8px' }}>
                    <ShoppingBag size={18} />
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#a5b4fc' }}>BRANCH 1</span>
                </div>
                <div style={{ fontSize: '15px', fontWeight: '700' }}>1. Buy Products</div>
                <div style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '2px' }}>
                  Browse & negotiate price with sellers
                </div>
              </div>

              <div 
                onClick={() => { setActiveBranch('SELL'); setShowPostModal(true); }}
                style={{
                  background: activeBranch === 'SELL' ? 'rgba(5, 150, 105, 0.4)' : 'rgba(255, 255, 255, 0.08)',
                  border: `1px solid ${activeBranch === 'SELL' ? '#34d399' : 'rgba(255, 255, 255, 0.15)'}`,
                  borderRadius: '14px',
                  padding: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ background: '#059669', color: 'white', padding: '6px', borderRadius: '8px' }}>
                    <PlusCircle size={18} />
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#6ee7b7' }}>BRANCH 2</span>
                </div>
                <div style={{ fontSize: '15px', fontWeight: '700' }}>2. Sell Listings</div>
                <div style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '2px' }}>
                  Add product, set price & meet buyers
                </div>
              </div>

              <div 
                onClick={() => { setActiveBranch('TRADE'); setSelectedListingType('FOR_TRADE'); }}
                style={{
                  background: activeBranch === 'TRADE' ? 'rgba(217, 119, 6, 0.4)' : 'rgba(255, 255, 255, 0.08)',
                  border: `1px solid ${activeBranch === 'TRADE' ? '#fbbf24' : 'rgba(255, 255, 255, 0.15)'}`,
                  borderRadius: '14px',
                  padding: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ background: '#d97706', color: 'white', padding: '6px', borderRadius: '8px' }}>
                    <Repeat size={18} />
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#fde68a' }}>BRANCH 3</span>
                </div>
                <div style={{ fontSize: '15px', fontWeight: '700' }}>3. Barter Trade</div>
                <div style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '2px' }}>
                  Swap lab tools & books item-for-item
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Workflow Process Diagram Guide (from user flowchart) */}
        {showWorkflowGuide && (
          <WorkflowBanner
            activeBranch={activeBranch}
            setActiveBranch={setActiveBranch}
            onOpenAuth={() => setShowAuthModal(true)}
            onOpenPostListing={() => setShowPostModal(true)}
            onOpenTradeDashboard={() => setShowTradeDashboard(true)}
          />
        )}

        {/* Category Filters */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedListingType={selectedListingType}
          setSelectedListingType={setSelectedListingType}
          totalCount={products.length}
        />

        {/* Category Quick Stats Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          marginBottom: '24px'
        }}>
          <div 
            onClick={() => setSelectedCategory('HOSTEL_ESSENTIALS')}
            style={{
              background: 'white',
              border: `1px solid ${selectedCategory === 'HOSTEL_ESSENTIALS' ? '#3b82f6' : '#e2e8f0'}`,
              borderRadius: '12px',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: '#eff6ff', color: '#2563eb', padding: '8px', borderRadius: '10px' }}>
                <Home size={18} />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>Hostel Essentials</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>Kettles, lamps, mattress, racks</div>
              </div>
            </div>
            <span style={{ fontSize: '14px', fontWeight: '800', color: '#2563eb', background: '#eff6ff', padding: '2px 10px', borderRadius: '9999px' }}>
              {hostelCount}
            </span>
          </div>

          <div 
            onClick={() => setSelectedCategory('LAB_EQUIPMENT')}
            style={{
              background: 'white',
              border: `1px solid ${selectedCategory === 'LAB_EQUIPMENT' ? '#10b981' : '#e2e8f0'}`,
              borderRadius: '12px',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: '#ecfdf5', color: '#059669', padding: '8px', borderRadius: '10px' }}>
                <FlaskConical size={18} />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>Lab Equipment</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>Lab coats, drafters, calipers, kits</div>
              </div>
            </div>
            <span style={{ fontSize: '14px', fontWeight: '800', color: '#059669', background: '#ecfdf5', padding: '2px 10px', borderRadius: '9999px' }}>
              {labCount}
            </span>
          </div>

          <div 
            onClick={() => setSelectedCategory('TEXTBOOKS')}
            style={{
              background: 'white',
              border: `1px solid ${selectedCategory === 'TEXTBOOKS' ? '#f59e0b' : '#e2e8f0'}`,
              borderRadius: '12px',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: '#fffbeb', color: '#d97706', padding: '8px', borderRadius: '10px' }}>
                <BookOpen size={18} />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>Textbooks & Notes</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>Maths, DSA Java, Physics, Chem</div>
              </div>
            </div>
            <span style={{ fontSize: '14px', fontWeight: '800', color: '#d97706', background: '#fffbeb', padding: '2px 10px', borderRadius: '9999px' }}>
              {textbookCount}
            </span>
          </div>
        </div>

        {/* Product Cards Grid */}
        {products.length === 0 ? (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '60px 20px',
            textAlign: 'center',
            color: '#64748b'
          }}>
            <ShoppingBag size={48} color="#cbd5e1" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>
              No campus listings found
            </h3>
            <p style={{ fontSize: '14px', marginTop: '6px' }}>
              Try adjusting your category filter, or be the first student to post an item!
            </p>
            <button
              onClick={() => setShowPostModal(true)}
              style={{
                marginTop: '16px',
                padding: '10px 20px',
                borderRadius: '10px',
                background: '#4f46e5',
                color: 'white',
                fontWeight: '700',
                fontSize: '14px'
              }}
            >
              Post a Product Listing
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currentUser={currentUser}
                onViewDetails={(p) => setDetailProduct(p)}
                onContactSeller={(p) => setNegotiatingProduct(p)}
                onInitiateTrade={(p) => setTradeTargetProduct(p)}
              />
            ))}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer style={{ background: 'white', borderTop: '1px solid #e2e8f0', padding: '24px 0', marginTop: 'auto' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', color: '#64748b' }}>
          <div>
            <strong>CampusXchange</strong> • Full-Stack Java (Spring Boot 3) + React Marketplace
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>H2 Database Console: <code>http://localhost:8080/h2-console</code></span>
            <span>REST API: <code>http://localhost:8080/api/products</code></span>
          </div>
        </div>
      </footer>

      {/* MODALS */}

      {/* 1. Product Detail Modal */}
      {detailProduct && (
        <ProductDetailModal
          product={detailProduct}
          currentUser={currentUser}
          onClose={() => setDetailProduct(null)}
          onContactSeller={(p) => setNegotiatingProduct(p)}
          onInitiateTrade={(p) => setTradeTargetProduct(p)}
        />
      )}

      {/* 2. Post Listing Modal (Sell Branch) */}
      {showPostModal && (
        <PostListingModal
          currentUser={currentUser}
          onClose={() => setShowPostModal(false)}
          onCreated={handleCreateProduct}
        />
      )}

      {/* 3. Trade Request Modal (Trade Branch) */}
      {tradeTargetProduct && (
        <TradeRequestModal
          targetProduct={tradeTargetProduct}
          currentUser={currentUser}
          userProducts={userProducts}
          onClose={() => setTradeTargetProduct(null)}
          onSubmitTrade={handleSubmitTrade}
        />
      )}

      {/* 4. Trade Dashboard Modal (Incoming/Outgoing swaps) */}
      {showTradeDashboard && (
        <TradeDashboardModal
          incomingTrades={incomingTrades}
          outgoingTrades={outgoingTrades}
          currentUser={currentUser}
          onClose={() => setShowTradeDashboard(false)}
          onAcceptTrade={handleAcceptTrade}
          onRejectTrade={handleRejectTrade}
          onArrangeExchange={handleArrangeExchange}
          onCompleteTrade={(trade) => {
            setShowTradeDashboard(false);
            setReviewTransaction({
              id: trade.id,
              productTitle: `${trade.targetProductTitle} <-> ${trade.offeredItemTitle}`,
              buyerId: trade.requesterId,
              buyerName: trade.requesterName,
              sellerId: trade.targetSellerId,
              sellerName: trade.targetSellerName
            });
          }}
        />
      )}

      {/* 5. Negotiation & Chat Modal (Buy Branch) */}
      {negotiatingProduct && (
        <NegotiationModal
          product={negotiatingProduct}
          currentUser={currentUser}
          onClose={() => setNegotiatingProduct(null)}
          onAgreeDeal={handleAgreeDeal}
        />
      )}

      {/* 6. Review Modal (Rate & Review Step) */}
      {reviewTransaction && (
        <ReviewModal
          transaction={reviewTransaction}
          currentUser={currentUser}
          onClose={() => setReviewTransaction(null)}
          onSubmitReview={handleSubmitReview}
        />
      )}

      {/* 7. Auth & User Persona Modal */}
      {showAuthModal && (
        <AuthModal
          currentUser={currentUser}
          allUsers={allUsers}
          onClose={() => setShowAuthModal(false)}
          onSelectUser={(u) => {
            setCurrentUser(u);
            showToast(`Switched active profile to ${u.name} (${u.hostelBlock})`);
          }}
          onRegister={async (regData) => {
            const newUser = await api.register(regData);
            const users = await api.getUsers();
            setAllUsers(users);
            setCurrentUser(newUser);
            showToast(`🎓 Welcome ${newUser.name}! College ID verified.`);
          }}
        />
      )}

    </div>
  );
}
