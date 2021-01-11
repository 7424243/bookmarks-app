import React, {Component} from 'react'
import BookmarksContext from '../BookmarksContext'
import config from '../config'

const Required = () => (
    <span className='EditBookmark__required'>*</span>
  )

class EditBookmark extends Component {


    static contextType = BookmarksContext

    state = {
        error: null,
        id: '',
        title: '',
        url: '',
        description: '',
        rating: '',
    }

    componentDidMount() {
        const bookmarkId = this.props.match.params.id
        fetch (`http://localhost:8000/api/bookmarks/${bookmarkId}`, {
            method: 'GET',
            headers: {
                'content-type': 'applciation/json',
                'Authorization': `Bearer ${config.API_KEY}`
            }
        })
            .then(res => {
                if(!res.ok) {
                    return res.json().then(error => Promise.reject(error))
                }
                return res.json()
            })
            .then(responseData => {
                this.setState({
                    title: responseData.title,
                    url: responseData.url,
                    description: responseData.description,
                    rating: responseData.rating,
                    id: responseData.id
                })
            })
            .catch(error => {
                console.error(error)
                this.setState({error})
            })
    }

    handleChangeTitle = e => {
        this.setState({title: e.target.value})
    }

    handleChangeUrl = e => {
        this.setState({url: e.target.value})
    }

    handleChangeDescription = e => {
        this.setState({description: e.target.value})
    }

    handleChangeRating = e => {
        this.setState({rating: e.target.value})
    }

    handleSubmit = e => {
        e.preventDefault()
        const { id } = this.props.match.params
        const { title, url, description, rating } = this.state
        const newBookmark = { id, title, url, description, rating }
        fetch(config.API_ENDPOINT + `/${id}`, {
          method: 'PATCH',
          body: JSON.stringify(newBookmark),
          headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${config.API_KEY}`
          },
        })
          .then(res => {
            if (!res.ok)
              return res.json().then(error => Promise.reject(error))
          })
          .then(() => {
            this.resetFields(newBookmark)
            this.context.updateBookmark(newBookmark)
            this.props.history.push('/')
          })
          .catch(error => {
            console.error(error)
            this.setState({ error })
          })
      }

    resetFields = (newFields) => {
        this.setState({
          id: newFields.id || '',
          title: newFields.title || '',
          url: newFields.url || '',
          description: newFields.description || '',
          rating: newFields.rating || '',
        })
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
                        <div className='EditBookmark__error' role='alert'>
                            {this.state.error && <p>{this.state.error.message}</p>}
                        </div>
                        <input
                            type='hidden'
                            name='id'
                        />
                        <div>
                        <label htmlFor='title'>
                            Title: {' '} <Required />
                        </label>
                        <input
                            type='text'
                            name='title'
                            id='title'
                            placeholder='Great website!'
                            required
                            value={this.state.title}
                            onChange={this.handleChangeTitle}
                        />
                    </div>
                    <div>
                        <label htmlFor='url'>URL: {' '} <Required /></label>
                        <input 
                            type='url'
                            name='url'
                            id='url'
                            placeholder='https://www.great-website.com/'
                            required  
                            value={this.state.url}
                            onChange={this.handleChangeUrl}
                        />
                    </div>
                    <div>
                        <label htmlFor='description'>Description: {' '}</label>
                        <textarea
                            name='description'
                            id='description'
                            value={this.state.description}
                            onChange={this.handleChangeDescription}
                        />
                    </div>
                    <div>
                    <label htmlFor='rating'>
                        Rating
                        {' '}
                        <Required />
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
                        onChange={this.handleChangeRating}
                        />                        
                    </div>
                    <button type='submit'>
                        Save
                    </button>
                    {'  '}
                    <button type='button' onClick={this.handleClickCancel}>
                        Cancel
                    </button>
                </form>
                
            </section>
        )
    }
}

export default EditBookmark