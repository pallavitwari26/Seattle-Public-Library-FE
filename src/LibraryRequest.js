import React from 'react';

class LibraryRequest extends React.Component{
    constructor(props){
        super(props)
        this.state={
            retireList: []
        }
    }
    changeInput = event => {
        console.log(event.target.value)
        this.setState({ input: event.target.value})
    }
    componentDidMount(){
        fetch('http://127.0.0.1:5000/lms/api/retireBooks')
            .then(res => res.json())
            .then((res) => {
                console.log(res)
                this.setState({
                  isLoaded: true,
                  retireList: res.response
                })
            }
        )
    }
    render(){
        return(
            <div className="">
                <h1>List of books that need to be purchased and retired will be displayed to the library management based on the checkout activity of the books
</h1>
                <h1>Books to Retire</h1>
                <div className="form-container">
                    <ul className="feed-container">
                        <li className="feed-mail-item feed-mail-header">
                            <div className="feed-book-attr">Bibnum</div>
                            <div className="feed-book-attr">Count</div>
                        </li>
                        {
                            this.state.retireList.map((item) => {
                                return(
                                    <li className="feed-mail-item">
                                        <div className="feed-book-attr">{item.bibnum}</div>
                                        <div className="feed-book-attr">{item.itemcount}</div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>

                <h1>Books to be Purchased</h1>
                <div className="form-container">
                    
                </div>
            </div>
        )
    }
}

export default LibraryRequest;