import Subscribe from './Subscribe';
import Logo from './Logo';

const Header = () => (
  <header className="header">
    <div className="header__left">
      <Logo 
        shouldRedirect 
        redirectOn={{
          click: 'right',
          url: 'https://ssl-static.libsyn.com/p/assets/7/9/0/7/790703531a3c8eca/iTunes_Artwork.png'
        }} 
      />
    </div>
    <div className="header__right">
      <div className="title">
        <h2 className="tagline">A Tasty Treats Podcast for Web Developers.</h2>
        <a
          target="_blank"
          href="https://docs.google.com/forms/d/e/1FAIpQLSfQlAo1wXHiJMySdU-h8QMtfoz92aMS9eycEHXB6eRCLh8KHA/viewform"
          className="title__potluck-btn"
          rel="noopener noreferrer"
        >
          Ask a Potluck Question →
        </a>
      </div>
      <div className="people">
        <div className="person">
          <img src="/static/wes400x400.jpg" alt="Wes Bos" className="avatar" />
          <h3>Wes Bos</h3>
          <a
            target="_blank"
            href="https://twitter.com/wesbos"
            className="person__social person__social--twitter"
            rel="noopener noreferrer"
          >
            @wesbos
          </a>
          <p>
            Full Stack JavaScript Developer. Creator of really good{' '}
            <a
              target="_blank"
              href="https://wesbos.com/courses"
              rel="noopener noreferrer"
            >
              web development courses
            </a>
            . BBQ enthusiast.
          </p>
        </div>

        <div className="person">
          <img
            src="https://avatars2.githubusercontent.com/u/669383?s=460&v=4"
            alt="Scott Tolinski"
            className="avatar"
            rel="noopener noreferrer"
          />
          <h3>Scott Tolinski</h3>
          <a
            target="_blank"
            href="https://twitter.com/stolinski"
            className="person__social person__social--twitter"
            rel="noopener noreferrer"
          >
            @stolinski
          </a>
          <p>
            Web Developer, Creator of{' '}
            <a href="https://leveluptutorials.com/">Level Up Tuts</a>, Bboy,
            Robotops Crew and{' '}
            <a
              target="_blank"
              href="https://www.youtube.com/c/leveluptuts"
              rel="noopener noreferrer"
            >
              Youtuber
            </a>
          </p>
        </div>
      </div>
    </div>
    <Subscribe />
  </header>
);

export default Header;
