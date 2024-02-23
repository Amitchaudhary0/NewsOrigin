import React from 'react'

// export default class NewsComponent extends Component {
//     render() {
// the above commented part is the class based component to use this component we have to import the "import React {component} from 'react'"insted of "import React from 'react'"
const NewsComponent = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
        <div>
            <div className="card my-3">
                <span className="position-absolute top-0 translate-middle badge bg-success" style={{ left: "50%" }}>
                    {source}
                </span>
                <img src={!imageUrl ? "https://cdn1.vectorstock.com/i/1000x1000/72/95/imege-isolated-icon-symbol-gallery-picture-vector-31047295.jpg" : imageUrl} className="card-img-top" alt="Not Found" />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-body-secondary text-muted">By Author: {author ? author : "Unknown"} <br />On Date: {new Date(date).toDateString()} </small></p>
                    <a href={newsUrl} rel="noreferrer" className="btn btn-dark" target='_blank'>Read More</a>

                </div>
            </div>
        </div>
    )
}
// }
export default NewsComponent