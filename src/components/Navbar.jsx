export default function Navbar({ cartCount }) {
    return (
    <nav className="bg-gray-900 border-b border-purple-500 p-4 sticky top-0 z-50 flex justify-between items-center">
        <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 uppercase tracking-tighter">
        Retro Games
        </h1>
        <div className="relative cursor-pointer hover:scale-110 transition">
        <span className="text-2xl">🎮</span>
        {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
            {cartCount}
            </span>
        )}
        </div>
    </nav>
    );
}