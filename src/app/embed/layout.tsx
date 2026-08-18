export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-transparent bg-navy overflow-hidden">
      {/* We strip out Navbar, Footer, and Popups so the widget can run cleanly inside an iframe */}
      <div className="w-full h-full">
        {children}
      </div>
      
      {/* Mandatory Dofollow Backlink for SEO farming */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm text-center py-1.5 border-t border-gold/20 z-[999]">
        <a 
          href="https://paranjapeblueridge.com" 
          target="_blank" 
          rel="dofollow" 
          className="text-[10px] text-warm-white hover:text-gold transition-colors font-semibold uppercase tracking-widest flex items-center justify-center gap-2"
        >
          <span>Data Powered by</span>
          <span className="text-gold">Paranjape Blue Ridge</span>
        </a>
      </div>
    </div>
  );
}
