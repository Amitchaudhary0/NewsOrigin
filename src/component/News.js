import React, { Component } from 'react'
import NewsComponent from './NewsComponent'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {


    

    static defaultProps = {
        country: "in",
        category: "general",
    }

    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string,
    }


    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            page: 1,
            totalResults: 0,            
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - News Origin`;
    }

    async update() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=12&page=${this.state.page}`;
        let data = await fetch(url);
        this.props.setProgress(40);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState(
            {
                articles: parsedData.articles,
                totalResults: parsedData.totalResults,
            }
        )
        this.props.setProgress(100);
    }

    async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=df35bfa2e5da4bfd92558f22f002fdd8&pageSize=12`;
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // this.setState(
        //     {
        //         articles: parsedData.articles,
        //         totalResults: parsedData.totalResults,
        //         loading: false
        //     }
        // )
        this.update();
    }

    // handelPrevious = async () => {

    //     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=df35bfa2e5da4bfd92558f22f002fdd8&pageSize=12&page=${this.state.page - 1}`;
    //     // this.setState({ loading: true });
    //     // let data = await fetch(url);
    //     // let parsedData = await data.json();
    //     // this.setState(
    //     //     {
    //     //         articles: parsedData.articles,
    //     //         page: this.state.page - 1,
    //     //         loading: false
    //     //     }
    //     // )
    //     this.setState({ page: this.state.page - 1 });
    //     this.update();
    // }

    // handelNext = async () => {
    //     // if ((this.state.totalResults / 12) > this.state.page) {
    //     //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=df35bfa2e5da4bfd92558f22f002fdd8&pageSize=12&page=${this.state.page + 1}`;
    //     //     this.setState({ loading: true });
    //     //     let data = await fetch(url);
    //     //     let parsedData = await data.json();
    //     //     this.setState(
    //     //         {
    //     //             articles: parsedData.articles,
    //     //             page: this.state.page + 1,
    //     //             loading: false
    //     //         }
    //     //     )
    //     // }
    //     this.setState({ page: this.state.page + 1 });
    //     this.update();
    // }


    fetchMoreData = async() => {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=12&page=${this.state.page +1}`;
        this.setState({page: this.state.page + 1})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState(
            {  
                articles: this.state.articles.concat(parsedData.articles),
                totalResults: parsedData.totalResults,
                // page: this.state.page + 1,
            }
        )
      };

    render() {
        return (
            <>

                <h1 className='text-center' style={{ marginTop: '90px', marginBottom: '20px' }}>News Origin - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                        <InfiniteScroll
                            dataLength={this.state.articles.length}
                            next={this.fetchMoreData}
                            hasMore={this.state.articles.length !== this.state.totalResults}
                            loader={<Spinner/>}
                        >
                <div className="container">
                         

                    <div className="row">
                            {this.state.articles.map((element) => {
                                return (
                                    <div className="col-md-3" key={element.url} >
                                        <NewsComponent title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                    </div>
                                )
                            })}
                    </div>

                        </div>
                        </InfiniteScroll>

                    {/* <div className='d-flex justify-content-between my-3'>
                        <button disabled={this.state.page <= 1} onClick={this.handelPrevious} type="button" className="btn btn-dark"> &larr; previous</button>
                        <button disabled={(this.state.totalResults / 12) < this.state.page} onClick={this.handelNext} type="button" className="btn btn-dark">next &rarr;</button>
                    </div> */}

            </>
        )
    }
}
