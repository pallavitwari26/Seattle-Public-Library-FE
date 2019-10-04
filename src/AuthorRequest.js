import React from 'react';

class AuthorRequest extends React.Component{
    constructor(props){
        super(props)
        this.state={
            input: undefined,
            displayResponse: false,
            requestedBook: undefined
        }
    }
    changeInput = event => {
        this.setState({ input: event.target.value})
    }
    handleClick = (event) => {
        let input = this.state.input.trim()
        fetch('http://127.0.0.1:5000/lms/api/compareCheckoutsByPublishedType?authorname='+input)
            .then(res => res.json())
            .then((res) => {
                console.log(res)
                this.setState({
                  displayResponse: true,
                  requestedBook: res.response
                });
            }
        )
    }
    renderBook(){
        if(this.state.displayResponse){
            return(
                <ul className="feed-container">
                    <li className="feed-mail-item feed-mail-header">
                        <div className="feed-book-attr">Author</div>
                        <div className="feed-book-attr">Bibnum</div>
                        <div className="feed-book-attr">ItemCount</div>
                        <div className="feed-book-attr">Item Type</div>
                    </li>
                    {
                        this.state.requestedBook.map((item) => {
                            return(
                                <li className="feed-mail-item">
                                    <div className="feed-book-attr">{item.AuthorName}</div>
                                    <div className="feed-book-attr">{item.bibnum}</div>
                                    <div className="feed-book-attr">{item.count}</div>
                                    <div className="feed-book-attr">{item.itemtype}</div>
                                </li>
                            )
                        })
                    }
                </ul>
            )
        }else{
            return null
        }
    }
    render(){
        return(
            <div>
                <h1>For a given author, the most popular format for their publications will be displayed which could contribute as a suggestion for their future publications</h1>
                <div className="form-container">
                    <input placeholder="Search for a book by Author" className="userinput" onChange={(e) => this.changeInput(e)} />
                    <button className="search-btn" onClick={(e) => this.handleClick(e)}>Search</button>
                </div>
                {
                    this.renderBook()   
                }      
            </div>
        )
    }
}

export default AuthorRequest;