import { Link } from 'react-router-dom';

export default function AboutUs() {
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="about-photo" role="img" aria-label="Sunlit plants gathered in a bright home" />
      <div className="about-copy">
        <p className="eyebrow">A LITTLE ABOUT US</p>
        <h2 id="about-title">Good things grow<br />at their own pace.</h2>
        <p>Paradise Nursery began with a simple belief: a home feels a little more like home with something growing in it. We bring together healthy, thoughtfully chosen plants and make it easier to find the right one for your space.</p>
        <p>Every plant is cared for by our small team before it travels to you, with simple guidance to help it settle in and thrive.</p>
        <Link className="text-link" to="/plants">Find your plant <span aria-hidden="true">↗</span></Link>
      </div>
      <div className="about-stat"><span>GROWN WITH CARE</span><strong>One plant<br />at a time.</strong></div>
    </section>
  );
}
