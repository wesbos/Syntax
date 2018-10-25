import { withRouter } from "next/router";
import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import ShowList from "../components/ShowList";
import ShowNotes from "../components/ShowNotes";
import Player from "../components/Player";
import Meta from "../components/meta";
import Page from "../components/Page";
import SearchBox from "../components/SearchBox";

export default withRouter(
  class IndexPage extends React.Component {
    static propTypes = {
      router: PropTypes.object.isRequired,
      shows: PropTypes.array.isRequired,
      baseURL: PropTypes.string.isRequired
    };

    constructor(props) {
      super();
      const currentShow =
        props.router.query.number || props.shows[0].displayNumber;

      this.state = {
        currentShow,
        currentPlaying: currentShow,
        filteredShows: props.shows,
        highlighted: false,
        query: ""
      };
    }

    static async getInitialProps({ req }) {
      /*eslint-disable */
      const protocol =
        req && req.headers.host.indexOf("syntax.fm") > -1
          ? "https"
          : req
            ? req.protocol
            : "";
      /* eslint-enable */
      const baseURL = req
        ? `${protocol}://${req.headers.host}`
        : window.location.origin;
      const { data: shows } = await axios.get(`${baseURL}/api/shows`);
      return { shows, baseURL };
    }

    componentWillReceiveProps(nextProps) {
      const { query } = nextProps.router;
      if (query.number) {
        this.setState({ currentShow: query.number });
      }
    }

    setCurrentPlaying = currentPlaying => {
      console.log("Setting current playing");
      this.setState({ currentPlaying });
    };

    // function highlights query in current show notes when search box updates, or an episode is clicked
    highlightSearch = (show, query) => {
      if (!query.length) return;
      const re = new RegExp(query, "gi");
      show.html = show.html
        .replace(/<mark>/gi, "")
        .replace(/<\/mark>/gi, "")
        .replace(re, "<mark>$&</mark>");
      this.setState({ highlighted: true });
    };

    // prevent search query from matching html tags
    stripHtml = html => {
      var tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;
      return tempDiv.textContent || tempDiv.innerText || "";
    };

    filterShows = (query, shows, currentShow, highlighted) => {
      this.setState({ query: query });

      // return currentShow to original when search box is less than three characters and exit function
      if (query.length < 3) {
        if (highlighted) {
          shows.forEach(show => {
            show.html = show.html
              .replace(/<mark>/gi, "")
              .replace(/<\/mark>/gi, "");
          });
        }
        this.setState({
          highlighted: false,
          currentShow:
            this.props.url.query.number || this.props.shows[0].displayNumber,
          filteredShows: shows
        });
        return;
      }

      const filteredShows = shows.reduce((filtered, show) => {
        query = query.toLowerCase();
        // text to be searched (title and show notes)
        const searchable = this.stripHtml(
          (show.title + show.html).toLowerCase()
        );
        if (searchable.includes(query)) filtered.push(show);
        return filtered;
      }, []);

      // if search results exist, current show should be previously selected or first item in array
      if (
        filteredShows.length &&
        !filteredShows.some(show => show.displayNumber === currentShow)
      ) {
        currentShow = filteredShows[0].displayNumber;
        this.setState({ currentShow: currentShow });
      }

      // highlight currentShow
      if (filteredShows.length) {
        const currentShowObj = filteredShows.find(
          show => show.displayNumber === currentShow
        );
        this.highlightSearch(currentShowObj, query);
      }

      this.setState({ filteredShows: filteredShows });
    };

    render() {
      const { shows = [], baseURL } = this.props;
      const {
        currentShow,
        currentPlaying,
        filteredShows,
        highlighted,
        query
      } = this.state;
      // Currently Shown shownotes
      const show =
        filteredShows.find(
          showItem => showItem.displayNumber === currentShow
        ) || shows.find(showItem => showItem.displayNumber === currentShow);
      // Currently Playing
      const current = shows.find(
        showItem => showItem.displayNumber === currentPlaying
      );
      return (
        <Page>
          <Meta show={show} baseURL={baseURL} />
          <div className="wrapper">
            <main className="show-wrap" id="main" tabIndex="-1">
              <Player show={current} />
              <div className="column-wrap">
                <SearchBox
                  className={query.length ? "sticky" : ""}
                  currentShow={currentShow}
                  shows={shows}
                  filterShows={this.filterShows}
                  highlighted={highlighted}
                />
                <ShowList
                  shows={filteredShows}
                  currentShow={currentShow}
                  currentPlaying={currentPlaying}
                  setCurrentPlaying={this.setCurrentPlaying}
                  highlightSearch={this.highlightSearch}
                  query={query}
                />
              </div>
              <ShowNotes
                show={query && !filteredShows.length ? "" : show}
                setCurrentPlaying={this.setCurrentPlaying}
              />
            </main>
          </div>
        </Page>
      );
    }
  }
);
