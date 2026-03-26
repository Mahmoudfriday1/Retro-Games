import { useState, useEffect } from 'react';

function App() {
  const [view, setView] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('retro_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // قائمة ألعاب ضخمة (24 لعبة) بصور مطابقة وأسماء واضحة
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

  return (
    <div className="min-h-screen bg-[#050505] text-white w-screen m-0 p-0 overflow-x-hidden relative">
      
      {/* 🟢 Navbar - ثابتة ومستقرة تماماً */}
      <nav className="sticky top-0 left-0 right-0 z-[100] w-full bg-[#0a0a0a]/95 backdrop-blur-md border-b border-purple-600/30 py-4 flex justify-between items-center px-4 md:px-8">
        
        {/* زرار الهمبرجر */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden flex flex-col gap-1.5 p-2 z-[110]">
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

        <div className="text-xl md:text-2xl font-black text-purple-500 cursor-pointer italic" onClick={() => {setView('home'); setIsMenuOpen(false)}}>
          RETRO<span className="text-white">GAMES</span>
        </div>
        
        {/* روابط الديسكتوب */}
        <div className="hidden lg:flex items-center gap-x-8 font-bold uppercase text-[12px] tracking-widest">
          {['home', 'products', 'about', 'contact'].map((v) => (
            <span key={v} className={`cursor-pointer transition-colors hover:text-purple-500 ${view === v ? 'text-purple-500 border-b-2 border-purple-600' : 'text-gray-400'}`} onClick={() => setView(v)}>
              {v === 'products' ? 'Store' : v}
            </span>
          ))}
        </div>

        <button onClick={() => {setView('cart'); setIsMenuOpen(false)}} className="bg-purple-600 hover:bg-white hover:text-black px-4 py-2 rounded-lg font-black text-xs transition-all uppercase">
          Cart ({cart.reduce((a, b) => a + b.qty, 0)})
        </button>
      </nav>

      {/* 📱 الستارة - بتبدأ من تحت الناف بار الثابت */}
      <div className={`fixed top-[72px] left-0 w-full h-[calc(100vh-72px)] z-[90] bg-black/98 backdrop-blur-2xl transition-all duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0 opacity-100 shadow-[20px_0_50px_rgba(147,51,234,0.3)]' : '-translate-x-full opacity-0'} lg:hidden flex flex-col items-center justify-center gap-10 border-t border-purple-600/20`}>
        {['home', 'products', 'about', 'contact'].map((v) => (
          <span 
            key={v} 
            className="text-4xl font-black uppercase italic tracking-tighter text-white hover:text-purple-500 transition-all cursor-pointer active:scale-95"
            onClick={() => { setView(v); setIsMenuOpen(false); }}
          >
            {v === 'products' ? 'Store' : v}
          </span>
        ))}
      </div>
      {/* 📦 Products Page - ألعاب كتير و Grid يملأ الأطراف */}
{view === 'products' && (
  <div className="w-full py-10 px-2 md:px-4">
    <h2 className="text-3xl md:text-5xl font-black mb-10 italic border-l-8 border-purple-600 pl-4 uppercase">The Vault</h2>
    
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 md:gap-4 w-full">
      {allGames.map(game => (
        <div 
          key={game.id} 
          onClick={() => { setSelectedProduct(game); setView('details'); }}
          className="bg-[#111] rounded-lg overflow-hidden border border-white/5 hover:border-purple-600/50 transition-all group flex flex-col shadow-lg cursor-pointer"
        >
          <div className="h-40 md:h-52 w-full overflow-hidden">
            <img src={game.image} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" alt={game.name} />
          </div>
          <div className="p-3 flex-grow flex flex-col justify-between">
            <h3 className="font-bold text-[12px] md:text-[14px] mb-1 truncate leading-tight uppercase text-gray-200">{game.name}</h3>
            <div className="flex justify-between items-center mt-auto">
              <span className="text-purple-500 font-black text-sm md:text-lg">${game.price}</span>
              
              {/* 2. استخدام e.stopPropagation عشان لما ندوس Add ميتفتحش صفحة التفاصيل بالخطأ */}
              <button 
                onClick={(e) => {
                  e.stopPropagation(); 
                  addToCart(game);
                }} 
                className="bg-white text-black px-3 py-1 rounded font-black text-[10px] hover:bg-purple-600 hover:text-white transition uppercase"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

      {/* 🏠 Home Page */}
      {view === 'home' && (
        <div className="w-full min-h-[85vh] flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-5xl md:text-[10rem] font-black italic tracking-tighter mb-4 leading-none bg-gradient-to-r from-purple-400 to-white bg-clip-text text-transparent uppercase">Retro Games</h1>
          <p className="max-w-2xl text-gray-500 text-sm md:text-xl uppercase tracking-[0.3em] mb-10 font-light">Feel the nostalgia of the golden age of gaming</p>
          <button onClick={() => setView('products')} className="bg-purple-600 px-12 py-5 rounded-full font-black text-xl hover:bg-white hover:text-black transition-all shadow-xl shadow-purple-500/20 uppercase tracking-widest">Explore Now</button>
        </div>
      )}
      {view === 'details' && selectedProduct && (
  <div className="w-full min-h-[90vh] py-10 px-4 md:px-20 flex flex-col lg:flex-row gap-12 items-center lg:items-start animate-fadeIn">
    
    {/* ⬅️ زرار الرجوع */}
    <button 
      onClick={() => setView('products')} 
      className="absolute top-24 left-4 md:left-10 text-gray-400 hover:text-purple-500 font-bold uppercase text-xs flex items-center gap-2"
    >
      ← Back to Store
    </button>

    {/* 🖼️ صورة المنتج كبيرة */}
    <div className="w-full lg:w-1/3 rounded-3xl overflow-hidden border-4 border-purple-600/20 shadow-2xl shadow-purple-600/10">
      <img src={selectedProduct.image} className="w-full h-full object-cover" alt={selectedProduct.name} />
    </div>

    {/* 📝 تفاصيل المنتج */}
    <div className="w-full lg:w-1/2 space-y-6 text-left">
      <span className="bg-purple-600/20 text-purple-400 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">Legendary Edition</span>
      <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">{selectedProduct.name}</h2>
      
      <div className="flex items-center gap-4">
        <span className="text-4xl font-black text-purple-500">${selectedProduct.price}</span>
        <span className="text-gray-500 line-through text-xl">$89.99</span>
      </div>

      <p className="text-gray-400 text-lg leading-relaxed font-light italic">
        عِش تجربة الـ Retro الحقيقية مع لعبة {selectedProduct.name}. نسخة أصلية بجودة عالية مُعاد صياغتها لتعمل على الأجهزة الحديثة. استرجع ذكرياتك الذهبية الآن!
      </p>

      <div className="grid grid-cols-2 gap-4 py-6 border-y border-white/5">
        <div>
          <p className="text-gray-500 text-[10px] uppercase font-bold">Category</p>
          <p className="font-bold uppercase text-sm">Action / Adventure</p>
        </div>
        <div>
          <p className="text-gray-500 text-[10px] uppercase font-bold">Release Date</p>
          <p className="font-bold uppercase text-sm">Classic Era</p>
        </div>
      </div>

      <div className="flex gap-4 pt-6">
        <button 
          onClick={() => addToCart(selectedProduct)} 
          className="flex-grow bg-purple-600 hover:bg-white hover:text-black py-5 rounded-2xl font-black uppercase transition-all shadow-xl shadow-purple-600/20"
        >
          Add to Collection
        </button>
        <button className="px-8 border border-white/10 rounded-2xl hover:bg-white/5 transition">
          ❤️
        </button>
      </div>
    </div>
  </div>
)}

      {/* 🛒 Cart Page */}
      {view === 'cart' && (
        <div className="w-full px-2 md:px-6 py-10">
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
                        <h4 className="font-black text-sm md:text-lg uppercase">{item.name}</h4>
                        <p className="text-purple-500 font-black">${item.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 bg-black p-2 rounded-xl">
                      <button onClick={() => updateQty(item.id, -1)} className="font-black px-2">-</button>
                      <span className="font-black text-sm w-4 text-center">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="font-black px-2">+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-600 text-xs font-black uppercase underline decoration-2">Delete</button>
                  </div>
                ))}
              </div>
              <div className="w-full xl:w-96 bg-white text-black p-8 rounded-[2.5rem] h-fit sticky top-24 shadow-2xl">
                <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Order Total</span>
                <div className="text-5xl font-black italic mb-8 tracking-tighter">${cartTotal.toFixed(2)}</div>
                <button className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase text-sm hover:bg-purple-600 transition shadow-xl">Complete Order</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* باقي الصفحات */}
      {view === 'contact' && (
        <div className="w-full px-4 py-20 flex justify-center text-white">
          <div className="w-full max-w-4xl bg-[#111] p-10 rounded-[3rem] border border-white/5 shadow-2xl">
            <h2 className="text-4xl font-black mb-10 italic text-purple-500 uppercase tracking-tighter">Support Vault</h2>
            <div className="space-y-4 text-black text-sm">
              <input className="w-full p-5 rounded-2xl outline-none font-bold" placeholder="YOUR NAME" />
              <input className="w-full p-5 rounded-2xl outline-none font-bold" placeholder="YOUR EMAIL" />
              <textarea className="w-full p-5 rounded-2xl h-40 outline-none font-bold" placeholder="HOW CAN WE ASSIST YOU?"></textarea>
              <button className="w-full bg-purple-600 text-white py-5 rounded-2xl font-black uppercase text-xl shadow-lg shadow-purple-500/20 transition hover:bg-white hover:text-black">Send Intel</button>
            </div>
          </div>
        </div>
      )}

      {view === 'about' && (
        <div className="w-full px-6 py-40 text-center max-w-5xl mx-auto">
          <h2 className="text-7xl font-black mb-10 italic uppercase tracking-tighter text-purple-600">Our Mission</h2>
          <p className="text-gray-400 text-2xl md:text-4xl leading-relaxed font-light uppercase tracking-widest">
            إحنا هنا عشان نرجعلك طفولتك. متجرنا  هو بوابتك لكل الألعاب اللي صنعت تاريخ الجيمنج. استمتع بتجربة تسوق سريعة، حديثة، وبأعلى جودة.
          </p>
        </div>
      )}

    </div>
  );
}

export default App;