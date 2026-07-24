import React from 'react';

const Addons = () => {
  const addons = [
    { name: 'PHOTO OR VIDEO', price: 'Price as per order', desc: 'Capture every unforgettable moment professionally to cherish forever.', img: '/new_addon_video.jpg' },
    { name: 'LUXURY BOUQUET', price: 'Rs. 800/- (10 Roses)', desc: 'A premium, hand-crafted bouquet featuring beautiful roses for your loved one.', img: '/new_addon_bouquet.jpg' },
    { name: 'CANDLE PATH', price: 'Rs. 500/-', desc: 'A romantic, glowing pathway lined with candles and scattered flower petals.', img: '/new_addon_candles.jpg' },
    { name: 'BUBBLE BLISS', price: 'Rs. 400/-', desc: 'Add a joyful, magical atmosphere with floating bubbles for your celebration.', img: '/new_addon_bubbles.jpg' },
    { name: 'WELCOME BOARD', price: 'Rs. 700/-', desc: 'An elegant, customized welcome board to greet your special guests.', img: '/floral_welcome_board.png' },
    { name: 'FOG ENTRY', price: 'Rs. 850/-', desc: 'Make a grand and magical entrance with our elegant fog effect.', img: '/addon_fog_real.jpg' },
    { name: 'GIFT HAMPER', price: 'Cost as per order', desc: 'Beautifully curated gift hampers to make your loved ones feel special. (Pre-order only)', img: '/addon_hamper.jpg' },
    { name: 'CAKE & CUP CAKES', price: 'Price as per order', desc: 'Delicious customized cakes and cupcakes tailored to your celebration theme.', img: '/addon_cake.jpg' },
    { name: 'ARTIFICIAL BOUQUET', price: 'Rs. 350/- per hr (Rental)', desc: 'A stunning artificial flower bouquet available for photoshoot rental.', img: '/addon_artificial_bouquet.jpg' },
    { name: 'LED NUMBER', price: 'Rs. 150/- (Per Number)', desc: 'Light up your celebration with glowing LED numbers or custom messages.', img: '/led_numbers.png' },
    { name: 'MESSAGE BOX', price: 'Rs. 100/-', desc: 'A charming glowing message box to display your personalized greetings.', img: '/addon_message_box.jpg' },
  ];

  return (
    <section id="addons" className="mobile-padding" style={{ background: 'var(--bg-white)', color: 'var(--text-black)', padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto', paddingBottom: '50vh' }}>
        
        {addons.map((addon, index) => (
          <div key={index} className="flex-stack-mobile" style={{ 
            position: 'sticky',
            top: '100px', // Sticks to the top of the viewport under the navbar
            background: 'var(--bg-white)', // Solid background to cover the element underneath
            display: 'flex', 
            flexWrap: 'wrap',
            borderTop: '1px solid rgba(0,0,0,0.5)', 
            padding: '4rem 0',
            minHeight: '60vh', // Ensure enough height to scroll past
            zIndex: index + 1 // Ensure they stack correctly over each other
          }}>
            {/* Left side: Large bold title */}
            <div style={{ flex: '1 1 300px', paddingRight: '2rem' }}>
              <h2 className="title-display mobile-text-clamp" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1, margin: 0 }}>
                {addon.name}
              </h2>
            </div>
            
            {/* Right side: Image and description */}
            <div style={{ flex: '1 1 600px', display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <img 
                src={addon.img} 
                alt={addon.name} 
                style={{ width: '400px', height: '250px', objectFit: 'cover', borderRadius: '15px', maxWidth: '100%', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
              />
              <div style={{ flex: 1, minWidth: '250px' }}>
                <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                  {addon.desc}
                </p>
                <div className="title-display mobile-text-clamp" style={{ fontSize: '1.5rem', color: 'var(--text-black)' }}>
                  {addon.price}
                </div>
              </div>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
};

export default Addons;
