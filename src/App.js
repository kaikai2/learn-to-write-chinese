import React from 'react'
import { Nav } from 'react-bootstrap'
import './App.css'
import { MainPage, RecognisePage, HistoryPage } from './view/page'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 0,
      width: 0,
      height: 0,
      optimalCharSize: 100,
    }
  }
  componentDidMount() {
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions.bind(this));
  }
  
  componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
  }
  updateWindowDimensions() {
      //console.log("window.innerWidth=", window.innerWidth, "window.innerHeight=", window.innerHeight)
      let res = Math.max(100, Math.min(window.innerWidth, window.innerHeight) * 0.8)
      //console.log("optimalCharSize=", res)
      this.setState({ optimalCharSize: res });
  }
  renderPage() {
    switch(this.state.activeTab) {
      default:
      case 0:
        return (
          <MainPage optimalCharSize={this.state.optimalCharSize}/>
        ) 
      case 1: 
        return (
          <RecognisePage optimalCharSize={this.state.optimalCharSize}/>
        )
      case 2:
        return (
          <HistoryPage optimalCharSize={this.state.optimalCharSize}/>
        )
    }
  }
  render() {
    return (
      <>
      <Nav variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link href="#" active={this.state.activeTab === 0} onClick={e => this.setState({activeTab: 0})}>学写汉字</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" active={this.state.activeTab === 1} onClick={e => this.setState({activeTab: 1})}>测试</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" active={this.state.activeTab === 2} onClick={e => this.setState({activeTab: 2})}>历史</Nav.Link>
        </Nav.Item>
      </Nav>
      {this.renderPage()}
      </>
    );
  }
}

export default App;
