import "./App.css";
import { useState } from "react";

function App() {
  const [cart, setCart] = useState([]);

  const hampers = [
    {
      name: "Chocolate Hamper",
      price: "499",
      image: "/images/Chocolate.png",
    },
    {
      name: "Birthday Hamper",
      price: "999",
      image: "/images/Birthday.png",
    },
    {
      name: "Luxury Gift Box",
      price: "1499",
      image: "/images/luxury.png",
    },
  ];

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar">
        <h1>NN Creation 🎁</h1>

        <div className="nav-links">
          <a href="#shop">Shop</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="cart-count">
          🛒 {cart.length}
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h2>Luxury Hampers Crafted With Love ✨</h2>

          <p>
            Premium gift hampers for birthdays,
            weddings, anniversaries and every special moment.
          </p>

          <a href="#shop">
            <button className="hero-btn">
              Explore Collection
            </button>
          </a>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="products" id="shop">
        <h2 className="section-title">
          Featured Hampers
        </h2>

        <div className="container">
          {hampers.map((hamper, index) => (
            <div className="card" key={index}>
              <img src={hamper.image} alt={hamper.name} />

              <div className="card-content">
                <h3>{hamper.name}</h3>

                <p className="price">₹{hamper.price}</p>

                <button onClick={() => addToCart(hamper)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="about" id="about">
        <h2 className="section-title">
          Why Choose NN Creation?
        </h2>

        <div className="about-grid">
          <div className="about-box">
            🎁 Premium Packaging
          </div>

          <div className="about-box">
            💖 Customized Hampers
          </div>

          <div className="about-box">
            🚚 Fast Delivery
          </div>

          <div className="about-box">
            ✨ Luxury Experience
          </div>
        </div>
      </section>

      {/* CUSTOM HAMPERS */}

<section className="custom-section">
  <h2 className="section-title">
    Customized Hampers 💖
  </h2>

  <p className="custom-text">
    We create personalized hampers for birthdays,
    weddings, baby showers, anniversaries,
    bridesmaids, festive gifting and more.
  </p>

  <div className="custom-grid">
    <div className="custom-box">
      🎂 Birthday Hampers
    </div>

    <div className="custom-box">
      💍 Wedding Hampers
    </div>

    <div className="custom-box">
      👶 Baby Shower Hampers
    </div>

    <div className="custom-box">
      🎄 Festive Hampers
    </div>
  </div>
</section>

{/* TESTIMONIALS */}

<section className="testimonials">
  <h2 className="section-title">
    What Our Customers Say 💕
  </h2>

  <div className="testimonial-grid">
    <div className="testimonial-card">
      <p>
        “Absolutely loved the packaging and
        customization. It looked so premium!”
      </p>

      <h4>- Riya</h4>
    </div>

    <div className="testimonial-card">
      <p>
        “The birthday hamper was beautiful.
        Perfect gifting experience!”
      </p>

      <h4>- Ananya</h4>
    </div>

    <div className="testimonial-card">
      <p>
        “Amazing quality and fast delivery.
        Highly recommended!”
      </p>

      <h4>- Sneha</h4>
    </div>
  </div>
</section>

      {/* CART */}
      <section className="cart-section">
        <h2 className="section-title">
          Your Cart
        </h2>

        {cart.length === 0 ? (
          <p className="empty">
            No items added yet.
          </p>
        ) : (
          <>
            {cart.map((item, index) => (
              <div className="cart-item" key={index}>
                <span>
                  {item.name} - ₹{item.price}
                </span>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(index)}
                >
                  Remove
                </button>
              </div>
            ))}

            <h3 className="total">
              Total: ₹{total}
            </h3>
          </>
        )}
      </section>

      {/* INSTAGRAM */}
      <section className="instagram">
        <h2 className="section-title">
          Follow Us On Instagram 📸
        </h2>

        <p>
          See our latest hamper creations &
          customer surprises.
        </p>

        <a
          href="https://www.instagram.com/itsnncreations?igsh=Z3Z1bDZyY2h6NWh2"
          target="_blank"
          rel="noreferrer"
        >
          <button className="insta-btn">
            @itsnncreations
          </button>
        </a>
      </section>

      {/* CONTACT */}
      <section className="contact" id="contact">
        <h2 className="section-title">
          Contact Us
        </h2>

        <p>📞 +91 9820466623</p>

        <p>📧 nncreation@gmail.com</p>

        <a
          href="https://wa.me/919820466623"
          target="_blank"
          rel="noreferrer"
        >
          <button className="whatsapp-btn">
            Chat on WhatsApp
          </button>
        </a>
      </section>

      {/* FOOTER */}
      <footer>
        <p>
          © 2026 NN Creation. Crafted with 💖
        </p>
      </footer>
    </div>
  );
}

export default App;