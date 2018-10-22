export default class highContrast extends React.Component{
  constructor(props) {
    super(props);
    this.state = { isActive: false};
    this.highContrastMode = this.highContrastMode.bind(this);
  }

  highContrastMode(e) {
    e.preventDefault();
    this.setState(state => ({
      isActive: !state.isActive
    }));
    let html = document.querySelector('html');
    html.classList.toggle('highcontrast');
  }

  render() {
    return (
      <a href="#" id="highcontrast" onClick={this.highContrastMode}>
        {this.state.isActive ? 'High Contrast Mode Off': 'High Contrast Mode'}
      </a>
    );
  }
}