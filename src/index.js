import _ from 'lodash';
import React, {Component} from 'react'; //go find library 'react' and assign it to React class
import ReactDOM from 'react-dom'; //react library is used to nest jsx but react-dom is to render to dom
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

// Create a new component
// It will producr HTML
const API_KEY = 'AIzaSyAmVNgC_N3L4KKbZeHc2saD8xXYlSRuCFI';

class App extends Component {
	constructor(props) {
		super(props);
		console.log("helloooo");
		this.state = {
			videos: [],
			selectedVideo: null,
		};

		this.videoSearch('surfboards');
	}

	videoSearch(term) {
		YTSearch({key: API_KEY, term: term}, (videos) => {
			this.setState({
							videos : videos,
							selectedVideo : videos[0]
			}); //condensed form using ES6 because key and value are the same
		});
	}

	render(){

		const videoSearch = _.debounce((term) => { this.videoSearch(term)}, 300);

		return (
				<div>
					<SearchBar onSearchTermChange={videoSearch}/>
					<VideoDetail video={this.state.selectedVideo}/>
					<VideoList
						onVideoSelect={selectedVideo => this.setState({selectedVideo})} 
						videos={this.state.videos} />
				</div>
			   ); //this is jsx
	}
}


// Take this component's generated html and put it on the page (in the DOM)
// we need to instantiate components befroe we can render them
// App on its own is a component class, JSX calls createElement() and returns instance.
ReactDOM.render(<App />, document.querySelector('.container'));