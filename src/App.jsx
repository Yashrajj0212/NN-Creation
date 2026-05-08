import "./App.css";
import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

function App() {
  // DARK MODE
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  // USER
  const [user, setUser] = useState(null);

  // ADMIN EMAILS
  const adminEmails = [
    "yashraj0212.dev@gmail.com",
    "niti.goyal3553@gmail.com",
  ];

  const isAdmin = user && adminEmails.includes(user.email);

  // LOGIN
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(true);

  // CART
  const [cart, setCart] = useState([]);

  // SEARCH
  const [search, setSearch] = useState("");

  // FEEDBACK
  const [feedback, setFeedback] = useState("");

  // AUTH STATE
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const hampers = [
    { name: "Chocolate Hamper", price: "499", image: "/images/Chocolate.png" },
    { name: "Birthday Hamper", price: "999", image: "/images/Birthday.png" },
    { name: "Luxury Gift Box", price: "1499", image: "/images/luxury.png" },
  ];

  // CART FUNCTIONS
  const addToCart = (item) => {
    setCart([...cart, item]);
    alert(`${item.name} added to cart`);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

  // AUTH FUNCTIONS
  const handleAuth = async () => {
    if (!email || !password) return alert("Enter email and password");
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Signup successful 🚀");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful 🎉");
      }
      setEmail("");
      setPassword("");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged out");
  };

  // FEEDBACK
  const submitFeedback = async () => {
    if (!feedback) return alert("Please write feedback");
    try {
      await addDoc(collection(db, "feedbacks"), {
        feedback,
        user: user?.email || "Guest",
        createdAt: new Date(),
      });
      alert("Feedback saved 💖");
      setFeedback("");
    } catch (err) {
      alert(err.message);
    }
  };

  // SAVE ORDER
  const saveOrder = async () => {
    if (cart.length === 0) return alert("Cart is empty");
    try {
      await addDoc(collection(db, "orders"), {
        user: user?.email || "Guest",
        items: cart,
        total,
        createdAt: new Date(),
      });

      // WhatsApp order
      const orderText = cart.map((i) => `${i.name} - ₹${i.price}`).join("%0A");
      const whatsappMessage = `Hello NN Creation!%0A%0ANew Order:%0A${orderText}%0A%0ATotal: ₹${total}%0A%0ACustomer: ${
        user?.email || "Guest"
      }`;

      window.open(`https://wa.me/919820466623?text=${whatsappMessage}`, "_blank");

      alert("Order saved successfully 🎉");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className={darkMode ? "dark app" : "app"}>
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
          <button className="dark-btn" onClick={toggleDarkMode}>
            {darkMode ? "☀️" : "🌙"}
          </button>
          <button className="cart-icon" onClick={() => window.scrollTo({ top: document.querySelector(".cart-section").offsetTop - 80, behavior: "smooth" })}>
            🛒 {cart.length}
          </button>
        </div>
      </nav>

      {/* ADMIN PANEL */}
      {isAdmin && (
        <section className="admin-panel">
          <h2>Admin Panel 🔐</h2>
          <p>Welcome Admin: {user.email}</p>
          <p>Total Cart Items: {cart.length}</p>
          <p>Total Amount: ₹{total}</p>
        </section>
      )}

      {/* LOGIN */}
      <section className="login-section">
        <div className="login-box">
          <h2>{user ? `Welcome ${user.email}` : "Login / Signup 🔐"}</h2>
          {!user && (
            <>
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
              />
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
              />
              <button className="login-main-btn" onClick={handleAuth}>
                {isSignup ? "Signup" : "Login"}
              </button>
              <p className="switch-text" onClick={() => setIsSignup(!isSignup)}>
                {isSignup ? "Already have account? Login" : "Don't have account? Signup"}
              </p>
            </>
          )}
          {user && <button className="login-main-btn" onClick={handleLogout}>Logout</button>}
        </div>
      </section>

      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h2>Luxury Hampers Crafted With Love ✨</h2>
          <p>Premium gift hampers for birthdays, weddings, anniversaries and every special moment.</p>
          <a href="#shop">
            <button className="hero-btn">Explore Collection</button>
          </a>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="products" id="shop">
        <h2 className="section-title">Featured Hampers</h2>
        <input
          type="text"
          placeholder="Search hampers..."
          className="search-bar"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="container">
          {hampers
            .filter((h) => h.name.toLowerCase().includes(search.toLowerCase()))
            .map((h, i) => (
              <div className="card" key={i}>
                <img src={h.image} alt={h.name} />
                <div className="card-content">
                  <h3>{h.name}</h3>
                  <p className="price">₹{h.price}</p>
                  <button onClick={() => addToCart(h)}>Add to Cart</button>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* CART */}
      <section className="cart-section">
        <h2 className="section-title">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="empty">No items added yet.</p>
        ) : (
          <>
            {cart.map((item, i) => (
              <div className="cart-item" key={i}>
                <span>{item.name} - ₹{item.price}</span>
                <button className="remove-btn" onClick={() => removeFromCart(i)}>Remove</button>
              </div>
            ))}
            <h3 className="total">Total: ₹{total}</h3>
            <button className="checkout-btn" onClick={saveOrder}>Save Order / WhatsApp</button>
          </>
        )}
      </section>

      {/* WHY SECTION */}
      <section className="why-section" id="about">
        <h2 className="section-title">Why Choose NN Creation?</h2>
        <div className="why-container">
          <div className="why-card">🎁 Premium Packaging</div>
          <div className="why-card">💖 Customized Hampers</div>
          <div className="why-card">🚚 Fast Delivery</div>
          <div className="why-card">✨ Luxury Experience</div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonial-section">
        <h2 className="section-title">What Our Customers Say 💕</h2>
        <div className="testimonial-container">
          <div className="testimonial-card">
            <p>"Absolutely loved the packaging and customization."</p>
            <h4>- Riya</h4>
          </div>
          <div className="testimonial-card">
            <p>"The birthday hamper was beautiful."</p>
            <h4>- Ananya</h4>
          </div>
          <div className="testimonial-card">
            <p>"Amazing quality and fast delivery!"</p>
            <h4>- Sneha</h4>
          </div>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="instagram-section">
        <h2 className="section-title">Follow Us On Instagram 📸</h2>
        <p>See our latest hamper creations</p>
        <a href="https://instagram.com/itsnncreations" target="_blank" rel="noreferrer">
          <button className="insta-btn">@itsnncreations</button>
        </a>
      </section>

      {/* FEEDBACK */}
      <section className="feedback-section" id="feedback">
        <h2 className="section-title">Customer Feedback 💖</h2>
        <textarea
          placeholder="Write your feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="feedback-input"
        />
        <button className="feedback-btn" onClick={submitFeedback}>Submit Feedback</button>
      </section>

      {/* CONTACT */}
      <section className="contact-section" id="contact">
        <h2 className="section-title">Contact Us</h2>
        <p>📞 +91 9820466623</p>
        <p>✉️ Niti.goyal3553@gmail.com</p>
      </section>

      <footer className="footer">© 2026 NN Creation. Crafted with ❤️</footer>
    </div>
  );
}

export default App;