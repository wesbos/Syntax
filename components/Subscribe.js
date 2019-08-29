import React from 'react';
import Clipboard from 'react-clipboard.js';

class Subscribe extends React.Component {
	constructor(props) {
		super();
		this.state = {
			toasty: 'toast'
		};
		this.handleToast = this.handleToast.bind(this);
	}
	handleToast() {
		this.setState({ toasty: 'show' });
		setTimeout(
			function() {
				this.setState({ toasty: 'toast' });
			}.bind(this),
			5000
		);
	}

	render() {
		return (
			<div className="subscribe">
				<ul className="subscribe__links">
					<li className="subscribe__link subscribe__link--itunes">
						<a
							target="_blank"
							href="https://itunes.apple.com/ca/podcast/syntax-tasty-web-development-treats/id1253186678?mt=2"
							rel="noopener noreferrer"
						>
							iTunes
						</a>
					</li>
					<li className="subscribe__link subscribe__link--overcast">
						<a
							target="_blank"
							href="https://overcast.fm/itunes1253186678/syntax-tasty-web-development-treats"
							rel="noopener noreferrer"
						>
							Overcast
						</a>
					</li>
					<li className="subscribe__link subscribe__link--google">
						<a
							target="_blank"
							href="https://www.google.com/podcasts?feed=aHR0cHM6Ly9mZWVkLnN5bnRheC5mbS9yc3M%3D"
							rel="noopener noreferrer"
						>
							Google Podcast
						</a>
					</li>
					<li className="subscribe__link subscribe__link--stitcher">
						<a
							target="_blank"
							href="http://www.stitcher.com/s?fid=142440&refid=stpr"
							rel="noopener noreferrer"
						>
							Stitcher
						</a>
					</li>
					<li className="subscribe__link subscribe__link--pocketcasts">
						<a
							target="_blank"
							href="http://pca.st/fmx9"
							rel="noopener noreferrer"
						>
							PocketCasts
						</a>
					</li>
					<li className="subscribe__link subscribe__link--googleplay">
						<a
							target="_blank"
							href="https://playmusic.app.goo.gl/?ibi=com.google.PlayMusic&isi=691797987&ius=googleplaymusic&link=https://play.google.com/music/m/Ityd325x5s5ivr3fc74hvvgeztu?t%3DSyntax_-_Tasty_Web_Development_Treats%26pcampaignid%3DMKT-na-all-co-pr-mu-pod-16"
							rel="noopener noreferrer"
						>
							Google Play
						</a>
					</li>
					<li className="subscribe__link subscribe__link--spotify">
						<a
							target="_blank"
							href="https://open.spotify.com/show/4kYCRYJ3yK5DQbP5tbfZby?si=bOe7-kl6RnOHapMsVnFWgw"
							rel="noopener noreferrer"
						>
							Spotify
						</a>
					</li>
					<li className="subscribe__link subscribe__link--rss">
						<Clipboard
							data-clipboard-text="http://feed.syntax.fm/rss"
							component="a"
							button-href="#"
							onClick={this.handleToast}
						>
							RSS
						</Clipboard>
					</li>
				</ul>
				<div id={this.state.toasty}>
					<div id="desc">You copied: http://feed.syntax.fm/rss 👍</div>
				</div>
			</div>
		);
	}
}

export default Subscribe;
