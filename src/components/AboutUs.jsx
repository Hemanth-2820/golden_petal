import React from 'react';

const AboutUs = () => {
  return (
    <div id="about-us-brutalist">
      
      {/* 1. Hero Section (Dotted Background) */}
      <section className="dotted-bg" style={{ padding: '8rem 2rem', borderBottom: '2px solid var(--text-black-green)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontWeight: 700, letterSpacing: '2px', marginBottom: '3rem', fontSize: '1rem', opacity: 0.6 }}>
            ▼ ABOUT GOLDEN PETAL
          </div>
          
          <h1 className="title-display" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 0.9, marginBottom: '3rem', color: '#000000' }}>
            CELEBRATING SHOULD NOT FEEL LIKE <span className="highlight-text" style={{color: '#000000'}}>STRESS.</span>
          </h1>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem' }}>
            <p style={{ fontSize: '1.5rem', lineHeight: '1.6', flex: '1 1 500px', fontWeight: 500 }}>
              Golden Petal is an interactive event and celebration venue located in the heart of Mangaluru. We opened to make planning life's biggest milestones less intimidating and a lot more fun.
            </p>
            
            <div style={{ flex: '1 1 400px', borderLeft: '8px solid #E11C83', paddingLeft: '2rem' }}>
              <p style={{ fontSize: '1.5rem', lineHeight: '1.6', fontWeight: 600 }}>
                Celebrations mark the most important moments in modern life, but most people are taught to stress over the details. Others complicate it. We thought a venue could do better. So we built one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Principles Section (Pink Background) */}
      <section style={{ backgroundColor: '#B81387', padding: '6rem 2rem', color: 'white', borderBottom: '2px solid var(--text-black-green)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ background: 'var(--bg-cream)', color: 'var(--text-black-green)', display: 'inline-block', padding: '10px 20px', border: '3px solid var(--text-black-green)', fontWeight: 700, letterSpacing: '2px', marginBottom: '4rem', boxShadow: '4px 4px 0px var(--text-black-green)' }}>
            ▼ THREE PRINCIPLES
          </div>
          
          <h2 className="title-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '4rem' }}>
            WHAT WE BELIEVE.
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            <div className="brutalist-card" style={{ padding: '3rem', color: '#000000' }}>
              <h3 style={{ fontSize: '3rem', color: '#B81387', marginBottom: '1rem', fontFamily: 'Oswald, sans-serif' }}>01</h3>
              <h4 className="title-display" style={{ fontSize: '2rem', marginBottom: '1rem', lineHeight: 1 }}>MEMORIES MATTER.</h4>
              <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>The fastest way to feel less intimidated by planning is to let experts handle the aesthetics while you focus on the joy.</p>
            </div>
            
            <div className="brutalist-card" style={{ padding: '3rem', color: '#000000' }}>
              <h3 style={{ fontSize: '3rem', color: '#B81387', marginBottom: '1rem', fontFamily: 'Oswald, sans-serif' }}>02</h3>
              <h4 className="title-display" style={{ fontSize: '2rem', marginBottom: '1rem', lineHeight: 1 }}>DETAILS ARE EVERYTHING.</h4>
              <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>From the fog entry to the candle-lit paths. Every small detail stacks up over time to create a massive impact.</p>
            </div>

            <div className="brutalist-card" style={{ padding: '3rem', color: '#000000' }}>
              <h3 style={{ fontSize: '3rem', color: '#B81387', marginBottom: '1rem', fontFamily: 'Oswald, sans-serif' }}>03</h3>
              <h4 className="title-display" style={{ fontSize: '2rem', marginBottom: '1rem', lineHeight: 1 }}>JOY IS NOT A TABOO.</h4>
              <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>Most people are uncomfortable letting go and just celebrating. We think that's a problem worth fixing, one party at a time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Highlights Section (Cream Background) */}
      <section style={{ backgroundColor: 'var(--bg-cream)', padding: '6rem 2rem', color: 'var(--text-black-green)', borderBottom: '2px solid var(--text-black-green)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontWeight: 700, letterSpacing: '2px', marginBottom: '2rem', fontSize: '1rem', opacity: 0.6 }}>
            ▼ WHAT'S INSIDE
          </div>
          
          <h2 className="title-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '2rem' }}>
            WHAT'S INSIDE.
          </h2>
          
          <p style={{ fontSize: '1.5rem', fontWeight: 500, maxWidth: '800px', marginBottom: '4rem' }}>
            A versatile space that transforms for your needs. Photo ops, hands-on surprises, decorations you'll actually want to remember. From bubble bliss to couple surprise entries, welcome to Golden Petal.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              { title: 'GRAND FOG ENTRY', desc: 'Stand in a magical mist for your entrance.', tag: 'PHOTO', img: '/addon_fog_real.jpg' },
              { title: 'ROMANTIC CANDLES', desc: 'Walk down a glowing path of love.', tag: 'EXPERIENCE', img: '/new_addon_candles.jpg' },
              { title: 'BUBBLE BLISS', desc: 'Dodge the bubbles. Laugh with your friends.', tag: 'PLAY', img: '/new_addon_bubbles.jpg' },
              { title: 'LUXURY DECOR', desc: 'Custom bouquets and floral setups.', tag: 'AESTHETIC', img: '/addon_artificial_bouquet.jpg' }
            ].map((feature, i) => (
              <div key={i} className="brutalist-card" style={{ display: 'flex', flexDirection: 'column', padding: 0 }}>
                <div style={{ position: 'relative', height: '250px', borderBottom: '4px solid var(--text-black-green)' }}>
                  <span style={{ position: 'absolute', top: '10px', left: '10px', background: 'white', padding: '2px 8px', border: '2px solid black', fontWeight: 700, fontSize: '0.8rem', zIndex: 10 }}>#{i+1}</span>
                  <span style={{ position: 'absolute', top: '10px', right: '10px', background: 'white', padding: '2px 8px', border: '2px solid black', fontWeight: 700, fontSize: '0.8rem', zIndex: 10 }}>{feature.tag}</span>
                  <img src={feature.img} alt={feature.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h4 className="title-display" style={{ fontSize: '1.5rem', marginBottom: '0.5rem', lineHeight: 1 }}>{feature.title}</h4>
                  <p style={{ fontWeight: 500 }}>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Press/Testimonials Section (Black Background) */}
      <section style={{ backgroundColor: '#0F0F0F', padding: '8rem 2rem', color: 'var(--bg-cream)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontWeight: 700, letterSpacing: '2px', marginBottom: '3rem', fontSize: '1rem', opacity: 0.6, textTransform: 'uppercase' }}>
            ▼ AS SEEN IN
          </div>
          
          <h2 className="title-display" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '4rem', color: 'var(--bg-cream)' }}>
            THE CITY IS TALKING.
          </h2>
          
          {/* Logo Grid - 5 Columns */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '4rem' }}>
            {['Daijiworld', 'Mangalore Today', 'Tulunadu News', 'Karavali Ale', 'Local Profile', 'Namma Kudla', 'Coastal Digest', 'Visit Mangalore', 'Udayavani', 'The Hindu'].map((press, i) => (
              <div key={i} style={{ 
                backgroundColor: 'var(--bg-cream)', 
                color: '#000000', 
                padding: '2rem 1rem', 
                fontWeight: 900, 
                fontSize: '1.1rem',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '120px',
                lineHeight: 1.2
              }}>
                {press}
              </div>
            ))}
          </div>

          {/* Quotes */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1rem' }}>
            <div style={{ backgroundColor: 'var(--bg-cream)', color: '#000000', padding: '3rem 4rem' }}>
              <div style={{ fontSize: '5rem', color: '#B81387', lineHeight: 1, marginBottom: '1rem', fontWeight: 900, fontFamily: 'Arial, sans-serif' }}>“</div>
              <p style={{ fontSize: '1.4rem', fontWeight: 500, marginBottom: '3rem', lineHeight: '1.5' }}>
                Planning a surprise used to be stressful. Golden Petal just made celebrations a lot more fun in Mangaluru.
              </p>
              <div style={{ fontWeight: 700, letterSpacing: '3px', fontSize: '0.8rem', opacity: 0.5, textTransform: 'uppercase' }}>LOCAL PROFILE</div>
            </div>

            <div style={{ backgroundColor: 'var(--bg-cream)', color: '#000000', padding: '3rem 4rem' }}>
              <div style={{ fontSize: '5rem', color: '#B81387', lineHeight: 1, marginBottom: '1rem', fontWeight: 900, fontFamily: 'Arial, sans-serif' }}>“</div>
              <p style={{ fontSize: '1.4rem', fontWeight: 500, marginBottom: '3rem', lineHeight: '1.5' }}>
                A new immersive venue aiming to make creating memories approachable, beautiful, and unforgettable.
              </p>
              <div style={{ fontWeight: 700, letterSpacing: '3px', fontSize: '0.8rem', opacity: 0.5, textTransform: 'uppercase' }}>MANGALORE TODAY</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Location Section (Blue Background) */}
      <section style={{ backgroundColor: '#0000FF', padding: '10rem 2rem', color: 'white' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ fontWeight: 700, letterSpacing: '4px', marginBottom: '2rem', fontSize: '0.8rem', opacity: 0.9 }}>
            ▼ WHERE WE ARE
          </div>
          
          <h2 className="title-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 7rem)', lineHeight: 0.9, marginBottom: '2.5rem', letterSpacing: '-1px', color: '#FFFFFF', whiteSpace: 'nowrap' }}>
            WHY MANGALORE? IT'S HOME.
          </h2>
          
          <p style={{ fontSize: '1.4rem', lineHeight: '1.6', fontWeight: 400, maxWidth: '750px' }}>
            The team grew up in and around Mangaluru, so building Golden Petal here was the obvious move. We chose Karunadham Complex on KSR Road on purpose: right near City Centre in Hampankatta, in a city that knows how to build big and celebrate big ideas. Mangaluru didn't have a venue exactly like this. Now it does.
          </p>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;
