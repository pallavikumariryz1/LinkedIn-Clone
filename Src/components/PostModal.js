import styled from "styled-components";
import {useState} from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
//import firebase from "../firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
//import 'firebase/compat/firestore';
import {storage} from "../firebase"
//import {Timestamp} from './firestore-types';
import {Timestamp} from 'firebase/compat/app';

import { postArticleAPI } from "../actions";

const PostModal = (props) => {
    const [editorText, setEditorText] = useState('');
    const [shareImage, setShareImage] = useState("");
    const [videoLink, setVideoLink] = useState("");
    const [assetArea, setAssetArea] = useState("");
    

    const handleChange = (e) => {
        const image = e.target.files[0];
        if(image === "" || image === undefined){
            alert("not an image , the file is ${typeof(image)}");
            return;
        }
        setShareImage(image);
    };

    const switchAssetArea = (area) => {
        setShareImage("");
        setVideoLink("");
        setAssetArea(area);
    }
    const postArticle = (e) => {
        e.preventDefault();
        if( e.target !== e.currentTarget) {
            console.log("hello");
            return ;
        }

        const payload = {
            image: shareImage,
            video: videoLink,
            description: editorText,
            timestamp: firebase.firestore.Timestamp.now(),
        };
        props.postArticle(payload);
        console.log(payload);
        reset(e);

        
    
  
    }

    const reset = (e) =>{
        setEditorText("");
        setShareImage("");
        setVideoLink("");
        setAssetArea("");
        props.handleClick(e);
    }
    return (
        <>
        { props.showModal === "open" && (
        <Container>
            <Content>
                <Header>
                    <h2>Create a post</h2>
                    <button onClick={(event) => reset(event)}>
                        <img src="/images/close_icon.png" alt="close.svg"/>
                    </button>
                </Header>
                <SharedContent>
                    <UserInfo>
                        { props.user.photoURL ? 
                        (<img src={props.user.photoURL} /> ):
                        (<img src="/images/user.svg" alt=""/>)
                        }
                        <span>{props.user.displayName}</span>
                    </UserInfo>
                    <Editor>
                     <textarea value={editorText} onChange= {(e) => setEditorText(e.target.value)}
                     placeholder="what do you want to talk about?"
                     autoFocus = {true}
                     ></textarea>
                     { assetArea === "image" ?
                      (<UploadImage>
                      <input type="file" accept="image/gif, image/jpeg, image/png, image/PNG, image/svg "
                      name="image"
                      id="file"
                      style={{display: "none"}}
                      onChange={handleChange}
                      />
                      <p>
                        <label htmlFor="file">
                            Select an image to share
                        </label>
                      </p>
                      {shareImage && <img src={URL.createObjectURL(shareImage)} />}
                      </UploadImage>
                      )
                      : (assetArea === "media" && (
                      <>
                      <input src="text" placeholder="Please input a video link"
                       value={videoLink}
                       onChange={(e) => setVideoLink(e.target.value)}
                      />
                      { videoLink && (<ReactPlayer width={'100%'} url = {videoLink} /> )}
                      </>
                      )
                      )}
                     
                     </Editor>
                </SharedContent>
                <SharedCreation>
                  <AttachAssets>
                     <AssetButton onClick={() => switchAssetArea("image")}>
                        <img src="/images/share1.PNG" alt="share"/>
                     </AssetButton>
                     <AssetButton onClick= {() => switchAssetArea("media")}>
                        <img src="/images/share-video.PNG" alt="share-video" />
                     </AssetButton>
                  </AttachAssets>
                  <ShareComment>
                  <AssetButton>
                    <img src="/images/share-comment.PNG" alt="share-comment"/>
                    Anyone
                  </AssetButton>
                  </ShareComment>
                  <PostButton disabled={!editorText ? true: false} onClick={(event) => postArticle(event)}>
                    Post
                  </PostButton>
                </SharedCreation>
            </Content>
        </Container>
        )}
        </>
    );
};

const Container = styled.div`
 position: fixed;
 top: 0;
 left: 0;
 right: 0;
 bottom: 0;
 z-index: 9999;
 color: black;
 background: rgba(0, 0, 0, 0.8);
 animation: fadeIn 0.3s;
`;


const Content = styled.div`
 width: 100%;
 max-width: 552px;
 background-color: white;
 max-height: 90%;
 overflow:initial;
 border-radius: 5px;
 position: relative;
 display: flex;
 flex-direction: column;
 top: 32px;
 margin: 0 auto;
`;

const Header = styled.div`
 display: block;
 padding: 16px 20px;
 border-bottom: 1px solid rgba(0, 0, 0, 0.15);
 font-size: 14px;
 margin-bottom: -13px;
 line-height: 1.5;
 color: rgba(0, 0, 0, 0.6);
 font-weight: 400;
 display: flex;
 justify-content: space-between;
 align-items: center;
 button {
    height: 30px;
    width: 30px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.15);
    img{
        width: 10px;
        height: 10px;
        pointer-events: none;
    }
 }
`;

const SharedContent = styled.div`
 display: flex;
 flex-direction: column;
 flex-grow: 1;
 overflow-y: auto;
 vertical-align: baseline;
 background: transparent;
 padding: 14px 12px;
`;

const UserInfo = styled.div`
 display: flex;
 padding: 12px 24px;
 align-items: center;
 img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
 }
 span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
 }
`;

const SharedCreation = styled.div`
 display: flex;
 justify-content: space-between;
 padding: 12px 24px 12px 16px;
`;

const AssetButton = styled.button`
 display: flex;
 align-items: center;
 height: 40px;
 min-width: auto;
 color: rgba(0, 0, 0, 0.5);
 cursor: pointer;
 img {
    width: 25px;
    height: 25px;
 }
`;
const AttachAssets = styled.div`
 display: flex;
 align-items: center;
 padding-right: 8px;
 ${AssetButton} {
    width: 40px;
 }
`;

const ShareComment = styled.div`
 padding-left: 8px;
 margin-right: auto;
 border-left: 1px solid rgba(0, 0, 0, 0.15);
 ${AssetButton}{
    img {
        margin-right: 5px;
    }
 }
`;

const PostButton = styled.button`
 min-width: 60px;
 border-radius: 20px;
 padding-left: 16px;
 padding-right: 16px;
 background: ${ (props) => (props.disabled ? 'rgba(0, 0, 0, 0.8)': "#0a66c2")};
 color: ${(props) => (props.disabled ? "rgba(1,1,1,0.15)": "white")};
 &:hover {
    background: ${(props) => (props.disabled ? "rgba(0, 0, 0, 0.08)": " #004182")};
 }
`;

const Editor = styled.div`
 padding: 12px 24px;
 textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
 }
 input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;

 }
`;

const UploadImage = styled.div`
 text-align: center;
 img {
    width: 100%;
 }
`;

const mapStateToProps = (state) => {
    return {
      user: state.userState.user,
    };
}

const mapDispatchToProps = (dispatch) => ({
    postArticle : (payload) => dispatch(postArticleAPI(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PostModal);