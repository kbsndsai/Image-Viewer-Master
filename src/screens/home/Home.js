import React, { Component } from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

class Home extends Component {

    constructor() {
        super();
        this.state = {
            postData: [],
            likes: 3,
            likeIcon: [{
                likes: 3,
                color: "black"
            }],
            imagecomment: "",
            addedComment: "",
            username: "",
            likeFlag: false

        }
    }


    likeClickHanlder() {

        this.setState({ likes: this.state.likes + 1 });
        this.setState({ likeFlag: true });

    }

    unlikeClickHanlder() {
        this.setState({
            likes: this.state.likes - 1
        });
        this.setState({ likeFlag: false });

    }

    imageCommentOnChangeChangeHandler = (e) => {
        this.setState({ imagecomment: e.target.value });
    }

    addCommentOnClickHandler = (post) => {
        this.setState({ addedComment: this.state.imagecomment });
        this.setState({ username: "keilelouch7: " });

    }

    async UNSAFE_componentWillMount() {
        const token = sessionStorage.getItem("access-token");

        // If Logged out load login page
        if (token === null) {
            this.props.history.push({
                pathname: `/`,
            });
            return;
        }

        const { commonClient } = this.props;

        const postData = await commonClient.getMdeia();
        console.log(" Media Data ", postData);
        this.setState({
            postData: postData.data
        });
    }


    render() {



        const styles =
        {

            media: {
                height: 0,
                paddingTop: '56.25%', // 16:9,
                marginTop: '30'
            }
        };



        return (
            <div>
                <Header showSearchBar="true" showProfileIcon="true" showMyAccount="true" />


                <GridList cellHeight={600} cols={2} spacing={2}>

                    {this.state.postData.length > 0 && this.state.postData.map(mediadata => (

                        <GridListTile key={mediadata.id}>
                            <Card className="cardStyle">
                                <CardHeader
                                    avatar={
                                        <Avatar src={require('../../assets/profile_pic.jpg')} />
                                    }

                                    title={mediadata.username}
                                    subheader={mediadata.timestamp}
                                //  subheader ={new Intl.DateTimeFormat('default', options).format(mediadata.timestamp)}


                                />



                                <CardMedia

                                    image={mediadata.media_url}
                                    style={styles.media}


                                />
                                <hr></hr>
                                <CardContent>
                                    <Typography paragraph>
                                        {mediadata.caption.split("#")[0]}

                                    </Typography>
                                    <Typography paragraph className="hashtag">
                                        {'#' + mediadata.caption.split("#")[1]} {' #' + mediadata.caption.split("#")[2]} {' #' + mediadata.caption.split("#")[3]}
                                    </Typography>

                                    {/* Logic to display like button */}
                                    <div><span className="inlineObjects">

                                        {this.state.likeFlag === false ?
                                            <FavoriteBorder id="likeButton"
                                                onClick={this.likeClickHanlder.bind(this)}>
                                            </FavoriteBorder> :
                                            <FavoriteIcon className="favIcon" id="unlikeButton"
                                                onClick={this.unlikeClickHanlder.bind(this)}>
                                            </FavoriteIcon>
                                        }
                                        <Typography variant="caption" className={"classes.textForLike"}>
                                            <span>{this.state.likes} likes</span>
                                        </Typography>
                                        <br /> <br />
                                        <FormControl >

                                            <Typography>{this.state.username}{this.state.addedComment}</Typography>
                                        </FormControl>

                                    </span></div>

                                    {/* Logic for comment section */}
                                    <FormControl >
                                        <InputLabel htmlFor="imagecomment">Add a Comment</InputLabel>
                                        <Input id="imagecomment" type="text" className="commentField" onChange={this.imageCommentOnChangeChangeHandler} />
                                    </FormControl>
                                    <Button variant="contained" color="primary" onClick={this.addCommentOnClickHandler}>ADD</Button>

                                </CardContent>
                            </Card>

                        </GridListTile>
                    ))}



                </GridList>



            </div>
        )




    }
}

export default Home;