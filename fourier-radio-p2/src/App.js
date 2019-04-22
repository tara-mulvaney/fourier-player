import React, { Component } from 'react';
import './App.css';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/SearchBar';
import VideoDetail from './components/VideoDetail';
import {Icon} from 'antd';

const key = process.env.REACT_APP_YOUTUBE_API_KEY
console.log('test', key)

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        videos: [],
        search: true
      }
  }

// componentDidMount() {
//   this.videoSearch("unknown mortal orchestra")
// }


videoSearch(term) {
    if( this.state.search ) {
         YTSearch({ key: key, term }, (data) => {
             try {
                 this.setState({ videos: data[0] });
                 console.log(data)
                 console.log( this.state.videos );
             } catch( err ){
                 alert('error')({
                     message: "Daily Limit Exceeded",
                     description: "Youtube data API daily limit have exceeded. Quota will be recharged at 1:30pm IST. Wait till then.",
                 })
             }
         });
     }
}

handleChange = (value) => {
  setTimeout( () => {
    if( value === ''){
      this.setState({ videos: [], selectedVideo: null });
      return;
    }
    if( this.state.search ) {
      this.videoSearch( value );
    }
    setTimeout( () => {
      this.setState({ search: true });
    }, 5000);
  }, 2000);
};

render() {
  return (
      <div>
        <div>
          <h2>Fourier Radio <Icon type={"youtube"}/></h2>
            <SearchBar
                 videos={ this.state.videos }
                 video={ this.state.selectedVideo }
                 onChange={ this.handleChange }
                 handleSearch={ (video) => { this.setState({
                   selectedVideo: this.state.videos[video], search: false
                   })}
                 }
            />
        </div>
        <div className="VideoDetail">
          <VideoDetail video={ this.state.selectedVideo }/>
        </div>
      </div>
    )
  }
  }

export default App;