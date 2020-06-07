import React from 'react'
import { Nav } from 'react-bootstrap'
import './App.css'
import { MainPage, RecognisePage, HistoryPage, PlayGroundPage, SettingsPage } from './view/page'
import { debounce } from 'lodash'
import { NavList } from './view'

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
  navListEntries = [{
      name: '生字学习',
    }, {
      name: '认字测试',
    }, {
      name: '学习历史',
    //}, {
    //  name: '游乐场',
    }, {
      name: '设置',
    }]
  componentDidMount() {
    this.deboucedUpdateWindowDimensions = debounce(this.updateWindowDimensions.bind(this), 200)
    this.updateWindowDimensions()
    window.addEventListener('resize', this.deboucedUpdateWindowDimensions)
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.deboucedUpdateWindowDimensions)
  }
  updateWindowDimensions() {
    //console.log("window.innerWidth=", window.innerWidth, "window.innerHeight=", window.innerHeight)
    let res = Math.max(100, Math.min(window.innerWidth, window.innerHeight) * 0.8)
    //console.log("optimalCharSize=", res)
    this.setState({ optimalCharSize: res });
  }
  onTabChange(activeTab) {
    this.setState({activeTab})
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
        /*
      case 3:
        return (
          <PlayGroundPage optimalCharSize={this.state.optimalCharSize}/>
        )*/
      case 3:
        return (
          <SettingsPage optimalCharSize={this.state.optimalCharSize}/>
        )
    }
  }
  render() {
    return (
      <>
        <NavList entries={this.navListEntries} 
          activeTab={this.state.activeTab}
          onChange={this.onTabChange.bind(this)} 
          variant="tabs" 
          defaultActiveKey="/home"/>
        {this.renderPage()}
      </>
    );
  }
}

export default App;
