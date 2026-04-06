html_content = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Maa's Magic is a premium homemade achar brand from Vadakara, Kerala." />
  <title>Maa's Magic | Premium Pickles</title>
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet">

  <style>
    :root {
      --bg: #FBFaf7;        /* Very warm, airy off-white */
      --text: #1a1a1a;      /* Soft black */
      --text-muted: #66635e;
      --accent: #b08d43;    /* Muted editorial gold */
      --border: #e6e4dc;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    html { scroll-behavior: smooth; }
    
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: 'Inter', -apple-system, blinkmacsystemfont, sans-serif;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    h1, h2, h3, h4, .serif {
      font-family: 'Playfair Display', Georgia, serif;
      font-weight: 400;
      line-height: 1.2;
    }

    em { font-style: italic; color: var(--accent); }
    a { color: inherit; text-decoration: none; }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 5%;
    }

    /* Buttons */
    .btn {
      display: inline-block;
      padding: 1.2rem 2.5rem;
      background-color: var(--text);
      color: var(--bg);
      font-size: 0.85rem;
      font-weight: 500;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      border: 1px solid var(--text);
      transition: all 0.3s ease;
      cursor: pointer;
    }
    
    .btn:hover {
      background-color: transparent;
      color: var(--text);
    }
    
    .btn-outline {
      background-color: transparent;
      color: var(--text);
    }
    
    .btn-outline:hover {
      background-color: var(--text);
      color: var(--bg);
    }

    /* Header */
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2.5rem 5%;
    }
    
    .logo {
      font-family: 'Playfair Display', serif;
      font-size: 1.5rem;
      font-weight: 500;
      letter-spacing: 0.02em;
    }
    
    .nav-links {
      display: flex;
      gap: 2.5rem;
      align-items: center;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    
    .nav-links a:hover {
      color: var(--accent);
    }

    /* Hero */
    .hero {
      text-align: center;
      padding: 8rem 0 10rem;
    }
    
    .kicker {
      display: block;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: var(--text-muted);
      margin-bottom: 2rem;
    }
    
    .hero h1 {
      font-size: clamp(3rem, 8vw, 6.5rem);
      margin: 0 auto 2.5rem;
      max-width: 14ch;
      color: var(--text);
    }
    
    .hero-desc {
      font-size: 1.15rem;
      color: var(--text-muted);
      max-width: 50ch;
      margin: 0 auto 3.5rem;
      font-weight: 300;
    }
    
    .hero-actions {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
    }

    /* Values Section */
    .values-section {
      padding: 6rem 0;
      border-top: 1px solid var(--border);
      border-bottom: 1px solid var(--border);
    }
    
    .values-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 4rem;
    }
    
    .value-block h3 {
      font-size: 1.25rem;
      margin-bottom: 1rem;
    }
    
    .value-number {
      font-family: 'Playfair Display', serif;
      font-size: 2rem;
      color: var(--accent);
      margin-bottom: 1rem;
      display: block;
    }
    
    .value-block p {
      font-size: 0.95rem;
      color: var(--text-muted);
      font-weight: 300;
    }

    /* Menu / Products */
    .menu-section {
      padding: 10rem 0;
    }
    
    .section-head {
      text-align: center;
      margin-bottom: 6rem;
    }
    
    .section-head h2 {
      font-size: clamp(2.5rem, 5vw, 4rem);
      margin-bottom: 1.5rem;
    }
    
    .section-head p {
      font-size: 1.1rem;
      color: var(--text-muted);
      font-weight: 300;
    }

    .category-title {
      font-size: 2.5rem;
      margin-bottom: 4rem;
      color: var(--text);
      border-bottom: 1px solid var(--border);
      padding-bottom: 1rem;
    }

    .menu-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
      gap: 5rem 4rem;
      margin-bottom: 8rem;
    }

    .menu-item {
      display: flex;
      flex-direction: column;
    }

    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 1rem;
    }

    .item-header h4 {
      font-size: 1.4rem;
    }

    .item-header h4 span.lang {
      font-family: 'Inter', sans-serif;
      font-size: 0.9rem;
      color: var(--text-muted);
      margin-left: 0.5rem;
      font-weight: 300;
    }

    .item-price {
      font-family: 'Inter', sans-serif;
      font-size: 0.85rem;
      letter-spacing: 0.05em;
      color: var(--text-muted);
    }

    .item-desc {
      font-size: 0.95rem;
      color: var(--text-muted);
      font-weight: 300;
      margin-bottom: 1.5rem;
      flex-grow: 1;
    }

    .item-tags {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .tag {
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--accent);
    }

    /* Story */
    .story-section {
      padding: 10rem 0;
      background-color: #f5f4ef;
      text-align: center;
    }

    .story-content {
      max-width: 800px;
      margin: 0 auto;
    }

    .story-content h2 {
      font-size: clamp(2rem, 4vw, 3.5rem);
      margin-bottom: 3rem;
    }

    .story-content p {
      font-size: 1.2rem;
      color: var(--text-muted);
      line-height: 2;
      font-weight: 300;
    }

    /* Steps */
    .steps-section {
      padding: 10rem 0;
    }

    .steps-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 4rem;
      margin-top: 5rem;
    }

    .step-item {
      position: relative;
    }

    .step-num {
      font-family: 'Playfair Display', serif;
      font-size: 4rem;
      color: var(--border);
      position: absolute;
      top: -2.5rem;
      left: 0;
      z-index: -1;
      line-height: 1;
    }

    .step-item h3 {
      font-size: 1.4rem;
      margin-bottom: 1rem;
      padding-top: 1rem;
    }

    .step-item p {
      color: var(--text-muted);
      font-size: 0.95rem;
      font-weight: 300;
    }

    /* Footer */
    footer {
      padding: 6rem 0;
      border-top: 1px solid var(--border);
      text-align: center;
    }

    .footer-cta {
      margin-bottom: 8rem;
    }
    
    .footer-cta h2 {
      font-size: clamp(2.5rem, 5vw, 4rem);
      max-width: 20ch;
      margin: 0 auto 3rem;
    }

    .footer-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.85rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      flex-wrap: wrap;
      gap: 2rem;
    }

    .footer-links {
      display: flex;
      gap: 2rem;
    }

    @media(max-width: 768px) {
      .nav-links { display: none; }
      .hero { padding: 6rem 0; }
      .hero h1 { font-size: 3.5rem; }
      .hero-actions { flex-direction: column; }
      .footer-bottom { flex-direction: column; justify-content: center; }
      .menu-grid { grid-template-columns: 1fr; gap: 3rem; }
    }
  </style>
</head>
<body>

  <nav>
    <div class="logo">Maa's Magic.</div>
    <div class="nav-links">
      <a href="#menu">Menu</a>
      <a href="#story">Our Story</a>
    </div>
  </nav>

  <main>
    <section class="container hero">
      <span class="kicker">Premium Pickles from Vadakara</span>
      <h1>The magic of home<br><em>in every jar.</em></h1>
      <p class="hero-desc">Authentic, handcrafted Kerala achar made with love. Experience the true taste of tradition, delivered straight to your table, batch by batch.</p>
      
      <div class="hero-actions">
        <a href="https://wa.me/910000000000" class="btn">Order on WhatsApp</a>
        <a href="#menu" class="btn btn-outline">Explore Our Flavors</a>
      </div>
    </section>

    <section class="values-section">
      <div class="container values-grid">
        <div class="value-block">
          <span class="value-number">01</span>
          <h3>Authentic Recipes</h3>
          <p>Using time-tested family recipes that bring out the true, robust flavors of Kerala.</p>
        </div>
        <div class="value-block">
          <span class="value-number">02</span>
          <h3>Made in Vadakara</h3>
          <p>Crafted locally, keeping the rich culinary heritage of Malabar alive without any compromises.</p>
        </div>
        <div class="value-block">
          <span class="value-number">03</span>
          <h3>Pure Ingredients</h3>
          <p>We use only the finest locally sourced spices, unadulterated oils, and fresh produce.</p>
        </div>
        <div class="value-block">
          <span class="value-number">04</span>
          <h3>Easy Ordering</h3>
          <p>From our kitchen to your dining table with just a simple WhatsApp message.</p>
        </div>
      </div>
    </section>

    <section id="menu" class="container menu-section">
      <div class="section-head">
        <h2>Our Signature Creations</h2>
        <p>Discover our range of vegetarian and non-vegetarian delicacies,<br>crafted using time-honored family recipes.</p>
      </div>
      
      <h3 class="category-title">Vegetarian Delights</h3>
      <div class="menu-grid">
        <article class="menu-item">
          <div class="item-header">
            <h4>Classic Mango <span class="lang">മാങ്ങാ</span></h4>
            <span class="item-price">₹100 / 100g</span>
          </div>
          <p class="item-desc">The undisputed king of pickles. Tangy, fiery, and perfectly seasoned raw mango cuts that instantly elevate any meal. A staple for every Kerala home.</p>
          <div class="item-tags">
            <span class="tag">Traditional</span>
            <span class="tag">Bestseller</span>
          </div>
        </article>

        <article class="menu-item">
          <div class="item-header">
            <h4>Spicy Garlic <span class="lang">വെളുത്തുള്ളി</span></h4>
            <span class="item-price">₹100 / 100g</span>
          </div>
          <p class="item-desc">Hand-peeled garlic cloves slow-cooked in our signature roasted spice blend. It delivers a sharp, deeply savory punch that leaves you wanting more.</p>
          <div class="item-tags">
            <span class="tag">Bold</span>
            <span class="tag">Zesty</span>
          </div>
        </article>

        <article class="menu-item">
          <div class="item-header">
            <h4>Elephant Foot Yam <span class="lang">ചേന</span></h4>
            <span class="item-price">₹100 / 100g</span>
          </div>
          <p class="item-desc">A deeply nostalgic, rustic delicacy. Earthy pieces of Chena marinated and preserved in traditional spices, reminiscent of grand festive feasts.</p>
          <div class="item-tags">
            <span class="tag">Rustic</span>
            <span class="tag">Authentic</span>
          </div>
        </article>

        <article class="menu-item">
          <div class="item-header">
            <h4>Vibrant Beetroot <span class="lang">ബീറ്റ്റൂട്ട്</span></h4>
            <span class="item-price">₹100 / 100g</span>
          </div>
          <p class="item-desc">A beautiful harmony of subtle root sweetness and fiery Kerala spices. This vibrant, ruby-red achar adds a completely unique twist to your plate.</p>
          <div class="item-tags">
            <span class="tag">Unique</span>
            <span class="tag">Sweet & Spicy</span>
          </div>
        </article>

        <article class="menu-item">
          <div class="item-header">
            <h4>Royal Date Mix <span class="lang">ഇന്തപ്പഴം മിക്സ്‌</span></h4>
            <span class="item-price">₹100 / 100g</span>
          </div>
          <p class="item-desc">A luxurious blend of premium sweet dates and warming aromatic spices. The absolute perfect sweet-and-tart companion for biryani, ghee rice, or even flatbreads.</p>
          <div class="item-tags">
            <span class="tag">Premium</span>
            <span class="tag">Sweet & Tangy</span>
          </div>
        </article>

        <article class="menu-item">
          <div class="item-header">
            <h4>Tender Jackfruit <span class="lang">ചക്ക</span></h4>
            <span class="item-price">₹100 / 100g</span>
          </div>
          <p class="item-desc">A celebrated seasonal favorite. Firm bites of raw jackfruit enriched with sharp spices, offering a wonderfully meaty texture and an unforgettable rustic flavor.</p>
          <div class="item-tags">
            <span class="tag">Seasonal</span>
            <span class="tag">Distinctive</span>
          </div>
        </article>
      </div>

      <h3 class="category-title">Non-Vegetarian Specialties</h3>
      <div class="menu-grid">
        <article class="menu-item">
          <div class="item-header">
            <h4>Malabar Beef <span class="lang">ബീഫ്</span></h4>
            <span class="item-price">₹100 / 100g</span>
          </div>
          <p class="item-desc">Slow-roasted to absolute perfection. Tender, bite-sized cuts of premium beef simmered in a robust, dark blend of traditional Malabar spices.</p>
          <div class="item-tags">
            <span class="tag">Hearty</span>
            <span class="tag">Signature</span>
          </div>
        </article>

        <article class="menu-item">
          <div class="item-header">
            <h4>Homestyle Chicken <span class="lang">ചിക്കെൻ</span></h4>
            <span class="item-price">₹100 / 100g</span>
          </div>
          <p class="item-desc">Savory, deeply spiced, and packed with flavor. Our Chicken Achar is an instant crowd-pleaser, serving as the ultimate side for rice, appam, or porotta.</p>
          <div class="item-tags">
            <span class="tag">Family Favorite</span>
            <span class="tag">Rich</span>
          </div>
        </article>

        <article class="menu-item">
          <div class="item-header">
            <h4>Roasted Prawns <span class="lang">ചെമ്മീൻ</span></h4>
            <span class="item-price">₹100 / 100g</span>
          </div>
          <p class="item-desc">Fresh, premium prawns carefully cleaned and marinated in a rich, roasted spice masala. A decadent, flavor-packed dream for every seafood lover.</p>
          <div class="item-tags">
            <span class="tag">Seafood</span>
            <span class="tag">Premium</span>
          </div>
        </article>

        <article class="menu-item">
          <div class="item-header">
            <h4>Netholi <span class="lang">നെത്തോലി</span></h4>
            <span class="item-price">₹100 / 100g</span>
          </div>
          <p class="item-desc">Premium anchovies marinated and crisped to perfection in our fiery red masala. An intensely flavorful seafood delicacy that steals the show.</p>
          <div class="item-tags">
            <span class="tag">Seafood</span>
            <span class="tag">Intense</span>
          </div>
        </article>

        <article class="menu-item">
          <div class="item-header">
            <h4>Kondattam <span class="lang">കൊണ്ടാട്ടം</span></h4>
            <span class="item-price">₹100 / 100g</span>
          </div>
          <p class="item-desc">A true Kerala classic. Traditional sun-dried delicacies (kondattam) steeped in a rich, tangy spice blend for that perfect crunchy, savory bite.</p>
          <div class="item-tags">
            <span class="tag">Traditional</span>
            <span class="tag">Crunchy</span>
          </div>
        </article>
      </div>
    </section>

    <section id="story" class="story-section">
      <div class="container story-content">
        <h2>The secret is in the sourcing.</h2>
        <p>At Maa's Magic, we don't believe in taking shortcuts. The magic isn't just in the recipe—it's in the careful selection of sun-dried spices, the purity of the oil, and the patience of slow-cooking. Born in the heart of Vadakara, our mission is simple: to give you a jar of achar that tastes exactly like a mother's love. No commercial bulk processing, no synthetic preservatives—just real, honest food crafted by hands that care.</p>
      </div>
    </section>

    <section class="container steps-section">
      <div class="section-head" style="margin-bottom: 2rem;">
        <h2>Ready to taste the magic?</h2>
        <p>We keep things simple and personal.</p>
      </div>
      
      <div class="steps-grid">
        <div class="step-item">
          <span class="step-num">01</span>
          <h3>Choose Your Cravings</h3>
          <p>Browse our menu and pick your favorite vegetarian or non-vegetarian varieties.</p>
        </div>
        <div class="step-item">
          <span class="step-num">02</span>
          <h3>Say Hello on WhatsApp</h3>
          <p>Tap the order button and let us know what you'd like, along with your quantity preferences.</p>
        </div>
        <div class="step-item">
          <span class="step-num">03</span>
          <h3>Fresh Delivery</h3>
          <p>We securely pack your order from our latest fresh batch and arrange delivery right to your door.</p>
        </div>
      </div>
    </section>
  </main>

  <footer>
    <div class="container footer-cta">
      <h2>Bring the authentic taste of Vadakara home today.</h2>
      <a href="https://wa.me/910000000000" class="btn">Chat on WhatsApp</a>
    </div>
    
    <div class="container footer-bottom">
      <p>&copy; 2026 Maa's Magic. Made with love in Kerala.</p>
      <div class="footer-links">
        <a href="https://wa.me/910000000000">WhatsApp</a>
        <a href="#">Email</a>
        <a href="#">Instagram</a>
      </div>
    </div>
  </footer>

</body>
</html>
"""
with open("/home/amarjithtk/acoder/masmagic/index.html", "w") as f:
    f.write(html_content)
