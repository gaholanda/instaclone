import React, { Component } from 'react'
import { View, Image, TouchableOpacity, FlatList } from 'react-native'
import io from 'socket.io-client'

import api from '../../services/api'
import LazyImage from '../../components/LazyImage'

import camera from '../../assets/camera.png'
import like from '../../assets/like.png'
import comment from '../../assets/comment.png'
import send from '../../assets/send.png'
import imgHolder from '../../assets/placeholder.jpg'

import { Post, Header, UserInfo, Name, PostImage, Footer, Actions, Action, Likes, Description, Hashtags, Loading } from './styles';

export default class Feed extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerRight: (
            <TouchableOpacity onPress={() => navigation.navigate('New')} style={{ marginRight: 20 }}>  
                <Image source={camera} />
            </TouchableOpacity>
        )
    })

    state = {
        feed: [],
        page: 1,
        totalPages: 1,
        loading: false,
        refreshing: false,
        itemsChanged: []
    }

    componentDidMount(){
        this.registerToSocket()
        this.loadMorePosts()
    }

    loadMorePosts = async (pageNumber = this.state.page, shouldRefresh = false) => {
        if(pageNumber <= this.state.totalPages){
            this.setState({ loading: true })
            const response = await api.get(`posts?page=${pageNumber}`)
            this.setState({ 
                feed: shouldRefresh ? response.data.docs : [...this.state.feed, ...response.data.docs], 
                page: this.state.page + 1,
                totalPages: response.data.totalPages,
                loading: false
            })

        }
    }

    registerToSocket = () => {
        const socket = io('http://10.0.2.2:3333')

        socket.on('post', newPost => {
            this.setState({
                feed: [newPost, ...this.state.feed]
            })
        })

        socket.on('like', likedPost => {
            this.setState({
                feed: this.state.feed.map( post =>
                    post._id === likedPost._id ? likedPost : post
                )
            })
        })
    }

    handleLike = id => {
        api.post(`/posts/${id}/like`)
    }

    refreshList = async () => {
        this.setState({ refreshing: true, page: 1 })
        await this.loadMorePosts(1, true)
        this.setState({ refreshing: false })
    }

    handleItemsChange = ({ changed }) => {
        changed.map( data => { 
            this.setState({ itemsChanged: [ ...this.state.itemsChanged, data.item._id] })
        })
    }

    render() {
        const { feed, loading, refreshing, itemsChanged } = this.state

        return (
            <View style={{ flex: 1 }}>
                <FlatList 
                    data={feed}
                    keyExtractor={ post => post._id }
                    onViewableItemsChanged={ this.handleItemsChange }
                    viewabilityConfig={{ viewAreaCoveragePercentThreshold: 10 }}
                    onEndReached={ () => this.loadMorePosts() }
                    onEndReachedThreshold={0.1}
                    onRefresh={ this.refreshList }
                    refreshing={ refreshing }
                    ListFooterComponent={ loading && <Loading />}
                    renderItem={({ item }) => (
                        <Post>
                            <Header>
                                <UserInfo>
                                    <Name>{item.author}</Name>
                                </UserInfo>
                            </Header>

                            <LazyImage 
                                shouldLoad={ itemsChanged.includes(item._id) }
                                source={{ uri: `http://10.0.2.2:3333/files/${item.image}` }} 
                                smallSource={imgHolder} 
                            />

                            <Footer>
                                <Actions>
                                    <Action onPress={() => {this.handleLike(item._id)}}>
                                        <Image source={like} />
                                    </Action>
                                    <Action onPress={() => {}}>
                                        <Image source={comment} />
                                    </Action>
                                    <Action onPress={() => {}}>
                                        <Image source={send} />
                                    </Action>
                                </Actions>

                                <Likes>{item.likes} { item.likes === 1 ? 'curtida' : 'curtidas'}</Likes>
                                <Description>{item.description}</Description>
                                <Hashtags>{item.hashtags}</Hashtags>
                            </Footer>
                        </Post>
                    )}
                />
            </View>
        )
    }
}