import "./App.css";
import { useState } from "react";

function App() {
  const [cart, setCart] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");

  // LOGIN STATES
  const [email, setEmail] = useState("");
  const [isSignup, setIsSignup] = useState(true);

  // FEEDBACK
  const [feedback, setFeedback] = useState("");

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
    setCart(
      cart.filter((_, index) => index !== indexToRemove)
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  const handleAuth = () => {
    if (!email) {
      alert("Please enter email");
      return;
    }

    if (isSignup) {
      alert("Signup successful 🚀");
    } else {
      alert("Login successful 🎉");
    }

    setEmail("");
  };

  const submitFeedback = () => {
    if (!feedback) {
      alert("Please write feedback");
      return;
    }

    alert("Thank you for your feedback 💖");
    setFeedback("");
  };

  return (
    <div className={darkMode ? "dark" : ""}>

      {/* NAVBAR */}
      <nav className="navbar">

        <h1>NN Creation 🎁</h1>

        <div className="nav-links">
          <a href="#shop">Shop</a>
          <a href="#about">About</a>
          <a href="#feedback">Feedback</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="nav-right">

          <button
            className="dark-btn"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <div className="cart-count">
            🛒 {cart.length}
          </div>

        </div>
      </nav>

      {/* LOGIN SECTION */}
      <section className="login-section">

        <div className="login-box">

          <h2>
            Login / Signup 🔐
          </h2>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="login-input"
          />

          <button
            className="login-main-btn"
            onClick={handleAuth}
          >
            {isSignup ? "Signup" : "Login"}
          </button>

          <p
            className="switch-text"
            onClick={() =>
              setIsSignup(!isSignup)
            }
          >
            {isSignup
              ? "Already have account? Login"
              : "Don't have account? Signup"}
          </p>

        </div>

      </section>

      {/* HERO */}
      <section className="hero">

        <div className="hero-content">

          <h2>
            Luxury Hampers Crafted With Love ✨
          </h2>

          <p>
            Premium gift hampers for birthdays,
            weddings, anniversaries and every
            special moment.
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

        <input
          type="text"
          placeholder="Search hampers..."
          className="search-bar"
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="container">

          {hampers
            .filter((hamper) =>
              hamper.name
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .map((hamper, index) => (

              <div className="card" key={index}>

                <img
                  src={hamper.image}
                  alt={hamper.name}
                />

                <div className="card-content">

                  <h3>{hamper.name}</h3>

                  <p className="price">
                    ₹{hamper.price}
                  </p>

                  <button
                    onClick={() => addToCart(hamper)}
                  >
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

              <div
                className="cart-item"
                key={index}
              >

                <span>
                  {item.name} - ₹{item.price}
                </span>

                <button
                  className="remove-btn"
                  onClick={() =>
                    removeFromCart(index)
                  }
                >
                  Remove
                </button>

              </div>

            ))}

            <h3 className="total">
              Total: ₹{total}
            </h3>

            <a
              href={`https://wa.me/919820466623?text=Hello NN Creation! I want to order: ${cart
                .map((item) => item.name)
                .join(", ")} | Total ₹${total}`}
              target="_blank"
              rel="noreferrer"
            >

              <button className="checkout-btn">
                Buy on WhatsApp
              </button>

            </a>

          </>

        )}

      </section>

      {/* INSTAGRAM */}
      <section className="instagram">

        <h2 className="section-title">
          Follow Us On Instagram 📸
        </h2>

        <p>
          See our latest hamper creations
        </p>

        <a
          href="https://instagram.com/itsnncreations"
          target="_blank"
          rel="noreferrer"
        >

          <button className="insta-btn">
            @itsnncreations
          </button>

        </a>

      </section>

      {/* FEEDBACK */}
      <section
        className="feedback-section"
        id="feedback"
      >

        <h2 className="section-title">
          Customer Feedback 💖
        </h2>

        <textarea
          placeholder="Write your feedback..."
          value={feedback}
          onChange={(e) =>
            setFeedback(e.target.value)
          }
          className="feedback-input"
        />

        <button
          className="feedback-btn"
          onClick={submitFeedback}
        >
          Submit Feedback
        </button>

      </section>

      {/* CONTACT */}
      <section
        className="contact"
        id="contact"
      >

        <h2 className="section-title">
          Contact Us
        </h2>

        <p>📞 +91 9820466623</p>

        <p>📧 Niti.goyal3553@gmail.com</p>

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