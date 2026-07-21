import React from 'react';

const Menu = () => {
  const menuItems = [
    { category: 'STARTERS', items: ['Paneer Tikka', 'Crispy Corn', 'Chicken Kabab', 'Spring Rolls'] },
    { category: 'MAIN COURSE', items: ['Biryani', 'Butter Naan', 'Paneer Butter Masala', 'Mutton Curry'] },
    { category: 'DESSERTS', items: ['Gulab Jamun', 'Ice Cream Sundae', 'Chocolate Brownie', 'Fruit Salad'] },
    { category: 'BEVERAGES', items: ['Mocktails', 'Fresh Juices', 'Soft Drinks', 'Coffee/Tea'] }
  ];

  return (
    <section id="menu">
      <h2 className="section-title">OUR MENU</h2>
      <div className="grid-auto-fit">
        {menuItems.map((menu, index) => (
          <div key={index} className="momo-panel">
            <h3 className="title-display" style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '2px solid var(--text-dark-green)', paddingBottom: '0.5rem' }}>
              {menu.category}
            </h3>
            <ul style={{ listStyle: 'none', lineHeight: '2', fontSize: '1.2rem', fontWeight: 500 }}>
              {menu.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu;
