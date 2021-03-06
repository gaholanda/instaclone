import React, { Component } from 'react'

import api from '../services/api'

import './New.css'

export default class New extends Component {

    state = {
        image: null,
        author: '',
        place: '',
        description: '',
        hashtags: ''
    }

    handleSubmit = async e => {
        e.preventDefault()

        const data = new FormData() 
        const { image, author, place, description, hashtags } = this.state
        
        data.append('image', image)
        data.append('author', author)
        data.append('place', place)
        data.append('description', description)
        data.append('hashtags', hashtags)

        await api.post('posts', data)
        
        this.props.history.push('/')
    }

    handleImageChange = e => {
        this.setState({ image: e.target.files[0] })
    }

    handleChange = e => {
        this.setState({[e.target.name] : e.target.value})
    }

    render() {
        return (
            <form id="new-post">
                <input type="file" onChange={this.handleImageChange} />

                <input 
                    type="text"
                    name="author"
                    placeholder="Autor do post"
                    onChange={this.handleChange}
                    value={this.state.author}
                />

                <input 
                    type="text"
                    name="place"
                    placeholder="Local do post"
                    onChange={this.handleChange}
                    value={this.state.place}
                />

                <input 
                    type="text"
                    name="description"
                    placeholder="Descrição do post"
                    onChange={this.handleChange}
                    value={this.state.description}
                />

                <input 
                    type="text"
                    name="hashtags"
                    placeholder="#s do post"
                    onChange={this.handleChange}
                    value={this.state.hashtags}
                />

                <button type="submit" onClick={this.handleSubmit}>Enviar</button>
            </form>
        )
    }
}
