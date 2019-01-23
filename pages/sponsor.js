import React from 'react';
import PropTypes from 'prop-types';
import Page from '../components/Page';
import Meta from '../components/meta';
import getBaseURL from '../lib/getBaseURL';
import styled from 'styled-components';
import { theme, StyledWrapper } from '../styles';
const { colors } = theme;

const SponsorContainer = styled(StyledWrapper)`
  background: ${colors.white};
  padding: 2rem;
  font-size: 1.7rem;

  figure,
  figcaption {
    font-size: 10px;
    text-align: right;
  }
  ul, ol {
    list-style: square;
  }
  strong {
    font-weight: 900;
  }
  h1 {
    font-size: 50px;
    margin-top: 0;
    margin-bottom: 0;
  }
  h2 {
    font-size: 40px;
  }
  h1, h2 {
    padding-bottom: 10px;
    border-bottom: 2px solid ${colors.yellow};
  }
  a {
    color: black;
    border-bottom: 1px solid ${colors.yellow};
  }
`;

class SponsorPage extends React.Component {
  static propTypes = {
    baseURL: PropTypes.string.isRequired,
  };

  static async getInitialProps({ req }) {
    const baseURL = getBaseURL(req);
    return { baseURL };
  }

  render() {
    const { baseURL } = this.props;

    return (
      <Page>
        <Meta baseURL={baseURL} staticPage={{ title: 'Sponsors' }} />
        <SponsorContainer>
          <h1>Syntax Sponsorship</h1>
          <p>
            Interested in getting your message to thousands of developers? We're
            interested in helping! If you think our audience may be a good fit,
            let's chat about how we can make this sponsorship worth it for you.
          </p>
          <figure style={{ float: 'left', marginRight: 35 }}>
            <img
              src="/static/sponsor/27576683_675183752871920_1707794213682282496_n.jpg"
              alt="Syntax"
              width="400"
            />
            <figcaption>
              Photo by{' '}
              <a href="https://www.instagram.com/dhanishgajjar/">
                Dhanish Gajjar
              </a>
            </figcaption>
          </figure>
          <p>
            Syntax is a fun — and sometimes funny — podcast for web developers
            hosted by <a href="https://wesbos.com">Wes Bos</a> and{' '}
            <a href="http://scotttolinski.com/">Scott Tolinkski</a>, two
            independent full stack developers who create online training
            courses. In each episode, Scott and Wes break down topics to provide{' '}
            <em>"Tasty Treats"</em> to the audience — applicable tips and
            nuggets of information to help web developers in their careers.
          </p>
          <p>
            Sponsoring the Syntax podcast is ideal for anyone who is looking to
            reach an engaged, technical, high-income audience. This may include:
          </p>
          <ul>
            <li>Developer tooling, software, and services</li>
            <li>Developer teams looking to hire</li>
            <li>Technical training material</li>
            <li>Technical hardware products</li>
            <li>
              Premium lifestyle products targeted towards high-income
              individuals, such as t-shirts, underwear, or backpacks
            </li>
          </ul>
          <h2>Audience Size && Breakdown</h2>
          <figure style={{ float: 'right', marginLeft: 20 }}>
            <img
              src="/static/sponsor/39099033_270538757113294_5127531635289358336_n.jpg"
              width="400"
              alt="iPhone showing a Syntax Episode"
            />
            <figcaption>
              Photo by{' '}
              <a href="https://www.instagram.com/dhanishgajjar/">
                Dhanish Gajjar
              </a>
            </figcaption>
          </figure>
          <p>
            Each sponsorship spot will receive an average of 30,000 downloads.
            Each spot will receive at least 23,000 downloads, and some of the
            shows reach 40-50,000 downloads just months after being launched.
          </p>

          <blockquote className="twitter-tweet">
            <p lang="en" dir="ltr">
              To be honest{' '}
              <a href="https://twitter.com/syntaxfm?ref_src=twsrc%5Etfw">
                @syntaxfm
              </a>{' '}
              is the only podcast where I listen to the sponsor adds, they don’t
              event feel like adds
            </p>
            &mdash; Omar Aguinaga (@Soyoag){' '}
            <a href="https://twitter.com/Soyoag/status/988205788794572800?ref_src=twsrc%5Etfw">
              April 22, 2018
            </a>
          </blockquote>
          <script
            async
            src="https://platform.twitter.com/widgets.js"
            charSet="utf-8"
          />

          <p>
            While exact numbers are hard to get, here are a few nuggets of
            information about our audience that should give you an idea of who
            is listening:
          </p>
          <ul>
            <li>
              Syntax has been in the Overcast <strong>top 20</strong> Technology
              podcasts since launch
            </li>
            <li>
              The geographic makeup of the audience consists of 44% USA, 8%
              Canada, 8% United Kingdom, 4% Germany, 4% Australia, 2% Sweden, 2%
              Netherlands.
            </li>
            <li>
              The rest of the audience is fairly well distributed between the
              rest of Europe, Brazil, and India.
            </li>
            <li>
              Of those who listen in the browser, 80% use Chrome, 13% Safari,
              and 7% Firefox.
            </li>
            <li>
              Of those who listen on phones, it's roughly 80% iPhone users and
              20% Android users.
            </li>
            <li>
              According to Twitter's analytic tools, 48% of Wes's U.S. audience
              has an income of $75,000 or greater.
            </li>
            <li>51% of Wes's followers are aged 18 to 24 and 22% 25 to 34.</li>
            <li>The top computed "lifestyle type" is Online Buyers.</li>
          </ul>

          <h2>Audience Interests</h2>
          <p>
            The Syntax audience is primarily web developers. About half of the
            shows focus on hard technical skills, while the other half focus on
            soft skills or topics tangentially related to web development.
          </p>

          <p>
            The audience's technical interests include, but are not limited to:
          </p>

          <ul>
            <li>CSS libraries, frameworks</li>
            <li>JavaScript frameworks such as React, Angular, and Vue</li>
            <li>JavaScript utility libraries</li>
            <li>Server-side JavaScript</li>
            <li>WordPress and Laravel</li>
            <li>Software design patterns and methodologies</li>
          </ul>

          <p>
            On the soft skills side, the audience has an appetite for the
            following topics:
          </p>
          <ul>
            <li>Self-improvement & productivity</li>
            <li>Freelancing and running small businesses</li>
            <li>Marketing & passive income</li>
            <li>Work/life balance</li>
            <li>Fitness and nutrition</li>
            <li>
              Premium products — Scott and Wes have a weekly "Sick Pick", which
              is a product or service that they have been enjoying lately
            </li>
          </ul>

          <h2>What You'll Get && Pricing</h2>
          <p>
            We have found that we get the best results for our advertisers when
            they sponsor at least three shows.
          </p>
          <p>
            Currently each sponsor spot is $1,000 USD per episode with a minimum
            of three episodes, though this price will increase as our audience
            does. Single show sponsorships are $1,200.
          </p>

          <p>As part of the sponsorship package, you'll get:</p>

          <ol>
            <li>
              A sponsorship section at the top of the episode show notes. These
              notes will be listed on both the Syntax.fm website as well as on
              each user's mobile device as they listen to the podcast. This is a
              great opportunity to list any coupon codes or unique links you'd
              like listeners to click on.
            </li>
            <li>
              A mention and single line at the top of the show. For example, Wes
              might say{' '}
              <em>
                This episode is sponsored by FreshBooks. They are my favourite
                cloud accounting software, and we will talk about why partway
                through the show.
              </em>
            </li>
            <li>
              A 1-2 min sponsor spot midway during the episode. While we can do
              a regular ad read, we have found that having Scott or Wes talk
              about the product or service and their experience with it gives it
              an added personal touch.
            </li>
            <li>
              A thank-you tweet from{' '}
              <a href="https://twitter.com/syntaxfm">@SyntaxFM</a> with a link
              to your product or service from the show's Twitter account.
            </li>
          </ol>

          <h2>Case Study: DevLifts</h2>
          <p>
            <a href="https://devlifts.io/">DevLifts</a> is a fitness company
            that creates personal training and nutrition plans for their
            customers.{' '}
          </p>

          <p>
            As part of their company launch, DevLifts sponsored Syntax for a
            single episode, offering a $50 off coupon to Syntax listeners.
          </p>

          <p>
            Within 10 days of sponsoring the episode, DevLifts had generated
            over $9,500 USD in revenue which was directly tied to Syntax
            listeners, resulting in a more than 10× return on their sponsorship
            investment.
          </p>

          <p>
            DevLifts is now sponsoring multiple episodes and will be using
            Syntax as an ongoing revenue and leads source.
          </p>

          <h2>Contact Us</h2>
          <p>
            Please{' '}
            <a href="mailto:wes@wesbos.com,scotttolinski@gmail.com">
              send us an email
            </a>{' '}
            if you are interested in working together and sponsoring the
            podcast.
          </p>
        </SponsorContainer>
      </Page>
    );
  }
}

export default SponsorPage;
