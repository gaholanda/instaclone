import styled from 'styled-components/native'

export const Post = styled.View`
    margin-top: 20px;
`

export const Header = styled.View`
    padding: 15px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const UserInfo = styled.View``

export const Name = styled.Text`
    font-size: 12px;
    color: #333;
    font-weight: bold;
`

export const PostImage = styled.Image`
    width: 100%;
    aspect-ratio: ${ props => props.ratio };
`

export const Footer = styled.View`
    padding: 15px;
`

export const Actions = styled.View`
    flex-direction: row;
`

export const Action = styled.TouchableOpacity`
    margin-right: 8px;
`

export const Likes = styled.Text`
    margin-top: 15px;
    font-weight: bold;
    color: #000;
`

export const Description = styled.Text`
    line-height: 18px;
    color: #000;
`

export const Hashtags = styled.Text`
    color: #000;
`

export const Loading = styled.ActivityIndicator.attrs({
    size: 'small',
    color: '#999'
})`
 margin: 30px 0;
`