import { Link } from 'react-router';

export default function AboutUs() {
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="about-us-container">
        <div className="about-photo" role="img" aria-label="Sunlit plants gathered in a bright home" />
        <div className="about-copy">
          <p className="eyebrow">A LITTLE ABOUT US</p>
          <h2 id="about-title">Good things grow<br />at their own pace.</h2>
          <p className="about-us-description">Welcome to Paradise Nursery, where green meets serenity!</p>
          <p className="about-us-content">At Paradise Nursery, we are passionate about bringing nature closer to you. Our mission is to offer thoughtfully chosen, healthy houseplants that make homes feel calmer, brighter, and more connected to nature.</p>
          <p className="about-us-content">Our small team cares for every plant before it travels to you. Whether you are a seasoned gardener or choosing your first plant, we share simple guidance to help it settle in and thrive.</p>
          <Link className="text-link" to="/plants">Find your plant <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="about-stat"><span>GROWN WITH CARE</span><strong>One plant<br />at a time.</strong></div>
      </div>
    </section>
  );
}
