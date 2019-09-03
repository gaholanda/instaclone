import React, { Component } from 'react'
import io from 'socket.io-client'

import api from '../services/api'

import './Feed.css'

import more from '../assets/more.svg'
import like from '../assets/like.svg'
import comment from '../assets/comment.svg'
import send from '../assets/send.svg'

export default class Feed extends Component {

  state = {
    feed: [],
    page: 1,
    totalPages: 1,
    loading: false
  }

  async componentDidMount() {
    this.registerToSocket()
    this.loadMorePosts()
    window.addEventListener('scroll', this.handleScroll);
  }

  loadMorePosts = async (pageNumber = this.state.page) => {

    console.log('pageNumber', pageNumber)

    if (pageNumber <= this.state.totalPages) {

      this.setState({ loading: true })
      const response = await api.get(`posts?page=${pageNumber}`)
      this.setState({
        feed: [
          ...this.state.feed,
          ...response.data.docs
        ],
        page: this.state.page + 1,
        totalPages: response.data.totalPages,
        loading: false
      })

    }
  }

  registerToSocket = () => {
    const socket = io('http://localhost:3333')

    socket.on('post', newPost => {
      this.setState({
        feed: [newPost, ...this.state.feed]
      })
    })

    socket.on('like', likedPost => {
      this.setState({
        feed: this.state.feed.map(post =>
          post._id === likedPost._id ? likedPost : post
        )
      })
    })
  }

  handleLike = id => {
    api.post(`/posts/${id}/like`)
  }

  handleScroll = () => {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight
    const body = document.body
    const html = document.documentElement
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)
    const windowBottom = windowHeight + window.pageYOffset

    if(docHeight - windowBottom < 50){
      this.loadMorePosts()
    }
  }

  render() {
    const { feed } = this.state

    return (
      <section id="post-list">
        {
          feed.length > 0 &&
          feed.map(post => (
            <article key={post._id}>
              <header>
                <div className="user-info">
                  <span>{post.author}</span>
                  <span className="place">{post.place}</span>
                </div>
                <img src={more} alt="Mais" />
              </header>

              <img src={`http://localhost:3333/files/${post.image}`} alt="" />
              <footer>
                <div className="actions">
                  <button type="button" onClick={() => this.handleLike(post._id)}>
                    <img src={like} alt="" />
                  </button>
                  <img src={comment} alt="" />
                  <img src={send} alt="" />
                </div>

                <strong>{post.likes} {post.likes === 1 ? 'curtida' : 'curtidas'}</strong>

                <p>
                  {post.description}
                  <span>{post.hashtags}</span>
                </p>
              </footer>
            </article>
          ))
        }
      </section>
    )
  }
}
