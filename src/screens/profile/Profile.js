import React, { Component } from 'react';
import Header from '../../common/header/Header';
import './Profile.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { FormControl, InputLabel, Input, Button, FormHelperText } from "@material-ui/core";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';




const styles = theme => ({
    gridListMain: {
        transform: 'translateZ(0)',
        cursor: 'pointer'
    },
    card: {
        height: 'inherit !important',
        margin: '1rem'
    },
    gridListImages: {
        marginTop: '0.5rem !important'
    },
    media: {
        display: 'flex',
        height: '100%',
        transform: 'translateZ(0)',
        width: '100%'
    },
    largeAvatar: {
        margin: 10,
        width: 60,
        height: 60,
    }
});


const customStylesEditFullName = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',

    }
};



const TabContainer = function (props) {
    return (
        <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
            {props.children}
        </Typography>
    )
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}


class Profile extends Component {

    constructor() {
        super();
        this.state = {
            favoriteIconId: 1,
            favoriteIconlikes: 1,
            mediaData: [],
            instaUsername: "",
            fullname: "Bala Siva",
            viewPostmodalIsOpen: false,
            editPostmodalIsOpen: false,
            viewPostModalData: [],
            imagecomment: "",
            addedComment: "",
            username: "",
            likeFlag: false,
            likes: 5
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

    addCommentOnClickHandler = (e) => {
        this.setState({ addedComment: this.state.imagecomment });
        this.setState({ username: "keileouch7: " });

    }


    async UNSAFE_componentWillMount() {
        const token = sessionStorage.getItem("access-token");

        if (token === null) {
            this.props.history.push({
                pathname: `/`,
            });
            return;
        }

        const { commonClient } = this.props;

        const mediaData = await commonClient.getMdeia();
        console.log(" Media list ", mediaData);
        this.setState({
            mediaData: mediaData.data
        });
    }

    // Logic for opening the view post modal
    openViewPostModalHandler = (post) => {
        this.setState({
            viewPostmodalIsOpen: true,
            viewPostModalData: post

        });

    }

    // Logic for closing the view post modal
    closeModalHandler = () => {
        this.setState({ viewPostmodalIsOpen: false });
        this.setState({ editPostmodalIsOpen: false });
    }

    // Logic for opening Edit Modal
    openEditModalHandler = () => {
        this.setState({
            modalIsOpen: true,
            fullnameRequired: "dispNone",
            fullname: "",
            updateFullname: "dispNone",
            instaFullName: "dispBlock"

        });
    }

    // Logic for closing Edit Modal
    closeEditModalHandler = () => {
        this.setState({ modalIsOpen: false });
    }

    //Logic for capturin the changed full name 
    inputFullnameChangeHandler = (e) => {
        this.setState({ fullname: e.target.value });

    }


    //Logic for updating the full name 
    updateClickHandler = (e) => {

        this.state.fullname === "" ? this.setState({ fullnameRequired: "dispBlock" }) : this.setState({ fullnameRequired: "dispNone" });

        if (this.state.fullname !== "") {
            this.setState({
                fullname: this.state.fullname,
                updateFullname: "dispBlock",
                instaFullName: "dispNone",
                modalIsOpen: false
            });
        }
    }


    render(props) {

        const styles =
        {

            media: {
                height: 0,
                paddingTop: '56.25%', // 16:9,
                marginTop: '30'
            }
        };

        const { classes } = this.props;

        return (
            <div >
                <Header showProfileIcon="true" showMyAccount="false" />



                <div className="infoSection">
                    <div className="row">
                        <div className="column-left">
                        </div>


                        <div className="column-center">
                            <div className="row1">
                                <div className="col-left">
                                    <Avatar className="largeAvatar">
                                        <img src={require('../../assets/profile_pic.jpg')}  alt="ProfilePicture" style={{ display: 'flex' }} />
                                    </Avatar>
                                </div>

                                <div className="col-center">
                                    <span><div className="row-one">{this.state.mediaData.username}</div></span>
                                    <span><div className="row-two">
                                        {/* Display no. of posts dynamically */}
                                        <div className="col-l">Posts : {this.state.mediaData.length}</div>
                                        {/* Display values for followers and following  */}
                                        <div className="col-c">Follows : 150</div>
                                        <div className="col-r">Followed By : 281</div>
                                    </div></span>
                                    <div className="row-three">
                                        <span><div >{this.state.mediaData.username}</div>
                                            <div className={this.state.updateFullname}>{this.state.fullname}</div>
                                        </span>
                                        {/* <Button variant="fab" color="secondary" onClick={this.openEditModalHandler} startIcon={<EditIcon />} >
                                         </Button> */}
                                        <Fab color="secondary" aria-label="edit" onClick={this.openEditModalHandler}>
                                            <EditIcon /></Fab>

                                    </div>
                                </div>

                                <div>
                                    <Modal
                                        ariaHideApp={false}
                                        isOpen={this.state.modalIsOpen}
                                        onRequestClose={this.closeEditModalHandler}
                                        style={customStylesEditFullName}
                                    >
                                        <Tabs className="tabs" value={this.state.value} >
                                            <Tab label="Edit" />

                                        </Tabs>
                                        <TabContainer>
                                            <FormControl required>
                                                <InputLabel htmlFor="fullname">Full Name</InputLabel>
                                                <Input id="fullname" type="text" fullname={this.state.fullname} onChange={this.inputFullnameChangeHandler} />
                                                <FormHelperText className={this.state.fullnameRequired}>
                                                    <span className="red">required</span>
                                                </FormHelperText>
                                            </FormControl>
                                            <br /><br />

                                            <Button variant="contained" color="primary" onClick={this.updateClickHandler}>UPDATE</Button>
                                        </TabContainer>
                                    </Modal>
                                </div>

                                <div className="col-right">
                                </div>
                            </div>
                        </div>
                        <div className="column-right">
                        </div>

                    </div>

                </div>


                <div className="flex-container">
                    <div className="left">
                        <GridList cellHeight={350} cols={3} className={classes.gridListMain}>
                            {this.state.mediaData.length > 0 && this.state.mediaData.map(post => (
                                <GridListTile onClick={() => this.openViewPostModalHandler(post)}
                                    className="post-grid-item" key={"grid" + post.id}>
                                    <img src={post.media_url} alt={post.title} />

                                </GridListTile>
                            ))}
                        </GridList>
                    </div>

                </div>


                <Modal isOpen={this.state.viewPostmodalIsOpen}
                    ariaHideApp={false}
                    contentLabel="Post"
                    onRequestClose={this.closeModalHandler}
                >



                    <div className="row-card">

                        <div className="column-card-left" >
                            <img src={this.state.viewPostModalData.media_url} alt="profilepic"/>

                        </div>

                        <div className="column-card-right" >





                            <Card className="cardStyle">
                                <CardHeader
                                    avatar={
                                        <Avatar src={require('../../assets/profile_pic.jpg')} />
                                    }

                                    title={this.state.viewPostModalData.username}

                                //  subheader ={new Intl.DateTimeFormat('default', options).format(mediadata.timestamp)}


                                />

                                <hr></hr>
                                <CardContent>
                                    <Typography paragraph>
                                        {this.state.viewPostModalData.caption}

                                    </Typography>
                                    {/* <Typography paragraph className="hashtag">
                                        {'#'+this.state.viewPostModalData.caption.split("#")[1]} {'#'+this.state.viewPostModalData.caption.split("#")[2]} {'#'+this.state.viewPostModalData.caption.split("#")[3]}
                                    </Typography> */}
                                    <FormControl >
                                        <FormHelperText className={this.state.addedComment}><Typography >{this.state.username}{this.state.addedComment}</Typography></FormHelperText>
                                    </FormControl>



                                    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

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


                                    </span></div>


                                    <FormControl >
                                        <InputLabel htmlFor="imagecomment">Add a Comment</InputLabel>
                                        <Input id="imagecomment" type="text" className="commentField" onChange={this.imageCommentOnChangeChangeHandler} />
                                    </FormControl>
                                    <Button variant="contained" color="primary" onClick={this.addCommentOnClickHandler}>ADD</Button>

                                </CardContent>
                            </Card>

                        </div>
                    </div>




                </Modal>



            </div>
        )
    }
}
export default withStyles(styles)(Profile);


