import React, {Component} from 'react'
import BookmarksContext from '../BookmarksContext'

class EditBookmark extends Component {
    static contextType = BookmarksContext

    state = {}

    componentDidMount() {

    }

    handleSubmit = e => {
        e.preventDefault()
    }

    handleClickCancel = () => {
        this.props.history.push('/')
    }

    render() {
        return (
            <section className='EditBookmark'>
                <h2>Edit Bookmark</h2>
                <form
                    className='EditBookmark_form'
                    onSubmit={this.handleSubmit}
                >
                    <div>
                        <label htmlFor='title'>
                            Title: {' '}
                        </label>
                        <input
                            type='text'
                            name='title'
                            id='title'
                            placeholder='Great website!'
                            required
                            value={this.state.title}
                        />
                    </div>
                    <div>
                        <label htmlFor='url'>URL: {' '}</label>
                        <input 
                            type='url'
                            name='url'
                            id='url'
                            placeholder='https://www.great-website.com/'
                            required  
                            value={this.state.url}
                        />
                    </div>
                    <div>
                        <label htmlFor='description'>Description: {' '}</label>
                        <textarea
                            name='description'
                            id='description'
                            value={this.state.description}
                        />
                    </div>
                    <div>
                    <label htmlFor='rating'>
                        Rating
                        {' '}
                        </label>
                        <input
                        type='number'
                        name='rating'
                        id='rating'
                        defaultValue='1'
                        min='1'
                        max='5'
                        required
                        value={this.state.rating}
                        />                        
                    </div>
                    <button type='submit'>
                        Save
                    </button>
                    <button type='button' onClick={this.handleClickCancel}>
                        Cancel
                    </button>
                </form>
                
            </section>
        )
    }
}

export default EditBookmark