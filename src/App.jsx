import { useState, useEffect } from 'react';

function App() {
  // --- States ---
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');
  const [view, setView] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('retro_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // --- Login Logic ---
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    setView('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    setView('home');
  };

  // --- Data ---
  const allGames = [
    { id: 1, name: "Super Mario World", price: 49.99, image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6579.png" },
    { id: 2, name: "Sonic Hedgehog", price: 39.99, image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4960.png" },
    { id: 3, name: "Zelda: Ocarina", price: 59.99, image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3p2d.png" },
    { id: 4, name: "Street Fighter II", price: 34.99, image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co298m.png" },
    { id: 5, name: "Crash Bandicoot", price: 29.99, image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co261c.png" },
    { id: 6, name: "Metroid Prime", price: 44.99, image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7f.png" },
    { id: 7, name: "Final Fantasy VII", price: 54.99, image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2l88.png" },
    { id: 8, name: "Pac-Man World", price: 19.99, image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co284v.png" },
    { id: 9, name: "Resident Evil 2", price: 40.00, image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r6v.png" },
    { id: 10, name: "Spyro Dragon", price: 30.00, image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co261f.png" },
    { id: 11, name: "Tekken 3", price: 35.00, image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co297v.png" },
    { id: 12, name: "Metal Gear Solid", price: 45.00, image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2l8f.png" },
    { id: 13, name: "Castlevania: SOTN", price: 55.00, image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r6n.png" },
    { id: 14, name: "Mega Man X", price: 42.00, image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co254s.png" },
    { id: 15, name: "Donkey Kong Country", price: 48.00, image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r8f.png" },
    { id: 16, name: "Pepsiman", price: 25.00, image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1rbi.png" },
    { id: 17, name: "Silent Hill", price: 50.00, image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r6t.png" },
    { id: 18, name: "GoldenEye 007", price: 38.00, image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r8p.png" },
    { id: 19, name: "Pokemon Red", price: 65.00, image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co260r.png" },
    { id: 20, name: "Chrono Trigger", price: 70.00, image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co260u.png" },
    { id: 21, name: "Contra", price: 20.00, image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co254n.png" },
    { id: 22, name: "Earthworm Jim", price: 32.00, image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1rbd.png" },
    { id: 23, name: "Banjo-Kazooie", price: 45.00, image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r8q.png" },
    { id: 24, name: "Spider-Man PS1", price: 30.00, image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1rbr.png" }
  ];

  // --- Cart Actions ---
  useEffect(() => {
    localStorage.setItem('retro_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (game) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === game.id);
      if (exists) return prev.map(item => item.id === game.id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { ...game, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  // --- Auth View Check ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#0a0a0a] border border-purple-600/20 p-8 rounded-[2.5rem] shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black italic text-purple-500 uppercase">Retro<span className="text-white">Login</span></h1>
            <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest">Enter the vault to play</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 ml-2">Email Address</label>
              <input type="email" required className="w-full bg-black border border-white/10 p-4 rounded-2xl outline-none focus:border-purple-600 transition" placeholder="gamer@retro.com" />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 ml-2">Password</label>
              <input type="password" required className="w-full bg-black border border-white/10 p-4 rounded-2xl outline-none focus:border-purple-600 transition" placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full bg-purple-600 py-5 rounded-2xl font-black uppercase text-sm hover:bg-white hover:text-black transition shadow-lg shadow-purple-500/10">Start Gaming</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white w-screen m-0 p-0 overflow-x-hidden relative font-sans">
      
      {/* 🟢 Navbar - Sticky */}
      <nav className="sticky top-0 left-0 right-0 z-[100] w-full bg-[#0a0a0a]/95 backdrop-blur-md border-b border-purple-600/30 py-4 flex justify-between items-center px-4 md:px-8">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden flex flex-col gap-1.5 p-2">
          <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

        <div className="text-xl md:text-2xl font-black text-purple-500 cursor-pointer italic" onClick={() => {setView('home'); setIsMenuOpen(false)}}>
          RETRO<span className="text-white">GAMES</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-x-8 font-bold uppercase text-[12px] tracking-widest text-gray-400">
          <span className={`cursor-pointer transition-colors hover:text-purple-500 ${view === 'home' ? 'text-purple-500 border-b-2 border-purple-600' : ''}`} onClick={() => setView('home')}>Home</span>
          <span className={`cursor-pointer transition-colors hover:text-purple-500 ${view === 'products' ? 'text-purple-500 border-b-2 border-purple-600' : ''}`} onClick={() => setView('products')}>Store</span>
          <span className={`cursor-pointer transition-colors hover:text-purple-500 ${view === 'about' ? 'text-purple-500 border-b-2 border-purple-600' : ''}`} onClick={() => setView('about')}>About</span>
          <span className={`cursor-pointer transition-colors hover:text-purple-500 ${view === 'contact' ? 'text-purple-500 border-b-2 border-purple-600' : ''}`} onClick={() => setView('contact')}>Contact</span>
          <button onClick={handleLogout} className="text-red-500 hover:text-white transition uppercase text-[10px] font-black border border-red-500/20 px-3 py-1 rounded-full ml-4">Logout</button>
        </div>

        <button onClick={() => {setView('cart'); setIsMenuOpen(false)}} className="bg-purple-600 px-4 py-2 rounded-lg font-black text-xs transition uppercase">
          Cart ({cart.reduce((a, b) => a + b.qty, 0)})
        </button>
      </nav>

      {/* 📱 Mobile Menu */}
      <div className={`fixed top-[72px] left-0 w-full h-[calc(100vh-72px)] z-[90] bg-black/98 backdrop-blur-xl transition-all duration-500 ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} lg:hidden flex flex-col items-center justify-center gap-10 border-t border-purple-600/20`}>
        {['home', 'products', 'about', 'contact'].map((v) => (
          <span key={v} className="text-3xl font-black uppercase italic tracking-tighter text-white hover:text-purple-500 cursor-pointer" onClick={() => { setView(v); setIsMenuOpen(false); }}>
            {v === 'products' ? 'Store' : v}
          </span>
        ))}
        <button onClick={handleLogout} className="text-red-500 text-xl font-black uppercase mt-10">Logout</button>
      </div>

      <main className="w-full">
        {/* 🏠 Home Page */}
        {view === 'home' && (
          <div className="w-full min-h-[85vh] flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-5xl md:text-[10rem] font-black italic tracking-tighter mb-4 bg-gradient-to-r from-purple-400 to-white bg-clip-text text-transparent uppercase">Retro World</h1>
            <p className="max-w-2xl text-gray-500 text-sm md:text-xl uppercase tracking-[0.3em] mb-10 font-light italic">Feel the nostalgia of the golden age</p>
            <button onClick={() => setView('products')} className="bg-purple-600 px-12 py-5 rounded-full font-black text-xl hover:bg-white hover:text-black transition-all shadow-xl shadow-purple-500/20 uppercase">Explore Now</button>
          </div>
        )}

        {/* 📦 Products Page */}
        {view === 'products' && (
          <div className="w-full py-10 px-4">
            <h2 className="text-3xl md:text-5xl font-black mb-10 italic border-l-8 border-purple-600 pl-4 uppercase">The Vault</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 w-full">
              {allGames.map(game => (
                <div key={game.id} onClick={() => { setSelectedProduct(game); setView('details'); }} className="bg-[#111] rounded-lg overflow-hidden border border-white/5 hover:border-purple-600/50 transition-all group flex flex-col cursor-pointer">
                  <div className="h-52 w-full overflow-hidden">
                    <img src={game.image} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" alt={game.name} />
                  </div>
                  <div className="p-3 flex-grow flex flex-col justify-between">
                    <h3 className="font-bold text-[14px] mb-1 truncate uppercase text-gray-200">{game.name}</h3>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-purple-500 font-black text-lg">${game.price}</span>
                      <button onClick={(e) => { e.stopPropagation(); addToCart(game); }} className="bg-white text-black px-3 py-1 rounded font-black text-[10px] hover:bg-purple-600 hover:text-white transition uppercase">Add</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 🖼️ Details Page */}
        {view === 'details' && selectedProduct && (
          <div className="w-full min-h-[90vh] py-10 px-4 md:px-20 flex flex-col lg:flex-row gap-12 items-center lg:items-start relative">
            <button onClick={() => setView('products')} className="mb-6 text-gray-400 hover:text-purple-500 font-bold uppercase text-[10px]">← Back to Store</button>
            <div className="w-full lg:w-1/3 rounded-3xl overflow-hidden border-4 border-purple-600/20">
              <img src={selectedProduct.image} className="w-full h-full object-cover" alt={selectedProduct.name} />
            </div>
            <div className="w-full lg:w-1/2 space-y-6 text-left">
              <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">{selectedProduct.name}</h2>
              <p className="text-4xl font-black text-purple-500">${selectedProduct.price}</p>
              <p className="text-gray-400 text-lg font-light leading-relaxed">Experience the ultimate retro nostalgia with {selectedProduct.name}. A classic masterpiece redefined for modern gaming enthusiasts.</p>
              <button onClick={() => addToCart(selectedProduct)} className="w-full md:w-auto bg-purple-600 px-12 py-5 rounded-2xl font-black uppercase hover:bg-white hover:text-black transition">Add to Collection</button>
            </div>
          </div>
        )}

        {/* 📖 About Page (Fixed) */}
        {view === 'about' && (
          <div className="w-full min-h-[80vh] flex flex-col items-center justify-center py-20 px-6 text-center max-w-5xl mx-auto">
            <h2 className="text-5xl md:text-8xl font-black italic text-purple-500 mb-10 uppercase tracking-tighter">Our Mission</h2>
            <div className="bg-[#0a0a0a] border border-purple-600/20 p-10 rounded-[3rem] shadow-2xl">
              <p className="text-xl md:text-3xl text-gray-300 font-light leading-relaxed uppercase tracking-wide">
                إحنا هنا عشان نرجعلك ذكريات الطفولة في صورة مودرن. <br/>
                مش مجرد ستور، ده بوابتك لزمن الألعاب الجميل بأعلى جودة وأفضل تجربة.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full">
               {['Classic Collection', 'Modern Speed', 'Gamer Spirit'].map(tag => (
                 <div key={tag} className="border border-white/5 p-6 rounded-2xl font-black uppercase text-xs tracking-widest text-purple-400">{tag}</div>
               ))}
            </div>
          </div>
        )}

        {/* 📞 Contact Page (Fixed) */}
        {view === 'contact' && (
          <div className="w-full min-h-[80vh] flex items-center justify-center p-6">
            <div className="w-full max-w-2xl bg-[#0a0a0a] p-12 rounded-[3rem] border border-purple-600/20 shadow-2xl text-center">
              <h2 className="text-5xl font-black italic text-purple-500 mb-6 uppercase tracking-tighter">Get in Touch</h2>
              <p className="text-gray-500 uppercase text-xs tracking-[0.3em] mb-12">Support is available 24/7 in the arcade</p>
              <div className="space-y-4">
                <input className="w-full bg-black border border-white/10 p-5 rounded-2xl outline-none focus:border-purple-600 transition" placeholder="NAME" />
                <input className="w-full bg-black border border-white/10 p-5 rounded-2xl outline-none focus:border-purple-600 transition" placeholder="EMAIL" />
                <textarea className="w-full bg-black border border-white/10 p-5 rounded-2xl outline-none focus:border-purple-600 transition h-32" placeholder="MESSAGE"></textarea>
                <button className="w-full bg-purple-600 py-5 rounded-2xl font-black uppercase shadow-lg shadow-purple-500/20 hover:bg-white hover:text-black transition">Send Signal</button>
              </div>
            </div>
          </div>
        )}

        {/* 🛒 Cart Page */}
        {view === 'cart' && (
          <div className="w-full px-4 md:px-10 py-10">
            <h2 className="text-4xl font-black mb-10 italic uppercase border-b border-white/10 pb-4">Checkout</h2>
            {cart.length === 0 ? (
              <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl text-gray-600 font-black uppercase text-xl">Bag is empty</div>
            ) : (
              <div className="flex flex-col xl:flex-row gap-8">
                <div className="flex-grow space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="bg-[#111] p-4 rounded-2xl flex justify-between items-center gap-4 border border-white/5 shadow-xl">
                      <div className="flex items-center gap-4">
                        <img src={item.image} className="w-16 h-16 rounded-xl object-cover" alt={item.name} />
                        <div>
                          <h4 className="font-black text-sm uppercase">{item.name}</h4>
                          <p className="text-purple-500 font-black">${item.price}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 bg-black p-2 rounded-xl border border-white/10">
                        <button onClick={() => updateQty(item.id, -1)} className="font-black px-2">-</button>
                        <span className="font-black text-sm w-4 text-center">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="font-black px-2">+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-600 text-xs font-black uppercase underline">Delete</button>
                    </div>
                  ))}
                </div>
                <div className="w-full xl:w-96 bg-white text-black p-8 rounded-[2.5rem] h-fit sticky top-24 shadow-2xl">
                  <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Order Total</span>
                  <div className="text-5xl font-black italic mb-8">${cartTotal.toFixed(2)}</div>
                  <button className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase text-sm hover:bg-purple-600 transition">Complete Order</button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
