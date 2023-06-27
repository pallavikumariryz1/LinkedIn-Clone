import {useState} from "react";
import styled from 'styled-components';
import PostModal from "./PostModal";

function Main(props) {
   const [showModal, setShowModal] = useState('close');
   const handleClick = (e) => {
      e.preventDefault();
      if(e.target !== e.currentTarget) {
          return;
      };
      switch(showModal) {
         case "open": 
                      setShowModal("close");
                      break;
         case "close":setShowModal("open");
                      break;
         default: 
                      setShowModal("close");
                      break;
      }
   };
   return (
      <Container>
         <ShareBox>Share
            <div>
               <img src="/images/user.svg" alt="" />
               <button onClick={handleClick}>Start a post</button>
            </div>
            <div>
               <button>
                  <img src="/images/photo.svg" alt="" />
                  <span>Photo</span>
               </button>
               <button>
                  <img src="/images/video.png" alt="" />
                  <span>Video</span>
               </button>
               <button>
                  <img src="/images/event-icon.png" alt="" />
                  <span>Event</span>
               </button>
               <button>
                  <img src="/images/article-icon.png" alt="" />
                  <span>Write article</span>
               </button>

            </div>
         </ShareBox>
         <div>
            <Article>
               <ShareBoxActor>
                  <a>
                     <img src="/images/user.svg" alt="" />
                     <div>
                        <span>Title</span>
                        <span>Info</span>
                        <span>Date</span>
                     </div>
                  </a>
                  <button>
                     <img src="/images/ellipsis-icon.png" alt="" />
                  </button>
               </ShareBoxActor>
               <Description>Description</Description>
               <SharedImg>
                  <a>
                     <img src="/images/Bitcoin-image.jpg" alt=""/>
                  </a>
                  
               </SharedImg>
               <SocialCounts>
                  <li>
                     <button>
                        <img src="/images/likes-icon.png" alt=""/>
                        <img src="/images/celebrate.png" alt=""/>
                        <span>45</span>
                     </button>
                  </li>
                  <li>
                     <a>8 Comments</a>
                  </li>
               </SocialCounts>
               <SocialAction>
               <LikeButton>
               <img src="/images/like.PNG" alt=""/>
               <span>Like</span>
               </LikeButton>
               <CommentButton>
                  <img src="/images/comment1.PNG" alt=""/>
                  <span>Comments</span>
               </CommentButton>
               <ShareIcon>
               <img src="/images/share-icon.PNG" alt=""/>
                  <span>Share</span>
               </ShareIcon>
               <SendIcon>
               <img src="/images/send-icon.PNG" alt=""/>
                  <span>Send</span>
               </SendIcon>
               </SocialAction>
              
            </Article>
         </div>
         <PostModal showModal={showModal} handleClick={handleClick}/>
      </Container>
   );
}

export default Main;
const Container = styled.div`
 grid-area: main;
`;

const CommonCard = styled.div`
 text-align: center;
 overflow: hidden;
 background-color:#fff;
 border-radius: 5px;
 position: relative;
 border: none;
 box-shadow: 0 0 0 1px rgb(0 0 0 /15%), 0 0 0 rgb(0 0 0 /20%);
`;

const ShareBox = styled(CommonCard)`
 display: flex;
 flex-direction: column;
 color: #958b7b;
 margin: 0 0 8px;
 background: white;
 div {
   button {
      outline: none;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.6);
      line-height: 1.5;
      
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    img {
      width: 35px;
      height: 16px;
    }
   }
   &:first-child{
      display: flex;
      align-items: center;
      padding: 8px 16px 8px 16px;
      img {
         width: 48px;
         border-radius: 50%;
         margin-right: 8px;
      }
      button {
          margin: 4px 0;
          flex-grow: 1;
          border-radius: 35px;
          padding-left: 16px;
          border: 1px solid rgba(0, 0, 0, 0.15);
          background-color: white;
          text-align: left;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;
      button {
         img {
            margin: 0 4px 0 -2px;
         }
         span {
            color: #78b5f9;
         }
      }
    }
 }
`;

const Article = styled(CommonCard)`
 padding: 0;
 margin: 0 8px;
 overflow: visible;
`;

const ShareBoxActor = styled.div`
 padding-right: 40px;
 flex-wrap: nowrap;
 padding: 12px 16px 0;
 margin-bottom: 8px;
 align-items: center;
 display: flex;
 a {
   margin-right: 12px;
   flex-grow: 1;
   overflow: hidden;
   display: flex;
   text-decoration: none;
   img {
   width: 48px;
   height: 48px;
 }
 & > div{
   display: flex;
   flex-direction: column;
   flex-grow: 1;
   flex-basis: 0;
   margin-left: 8px;
   overflow: hidden;
   span {
      text-align: left;
      &:first-child{
         font-size: 14px;
         font-weight: 700;
         color: rgba(0,0,0,1);
      }
      &:nth-child(n+1){
         font-size: 12px;
         color: rgba(0, 0, 0, 0.6);
      }
   }
 }
 }

 button {
   position: absolute;
   right: 12px;
   top: 0;
   background: transparent;
   border: none;
   outline: none;
   img {
   width: 30px;
   height: 30px;
   }
 }
`;

const Description = styled.div`
 padding: 0 16px;
 overflow: hidden;
 color: rgba(0, 0, 0, 0.9);
 font-size: 14px;
 text-align: left;
`;

const SharedImg = styled.div`
 margin-top: 8px;
 width: 100%;
 display: block;
 position: relative;
 background: #f9fafb;
 img {
   object-fit: contain;
   width: 100%;
   height: 100%;
 }
`;

const SocialCounts = styled.ul`
 line-height: 1.3;
 display: flex;
 align-items: flex-start;
 overflow: auto;
 margin: 0 16px;
 padding: 8px 0;
 border: 1px solid #e5e9fd;
 list-style: none;
 li{
   margin-right: 5px;
   font-size: 12px;
   button{
      display: flex;
       img{
         width: 25px;
         height: 25px;
       }
   }
 }
`;

const SocialAction = styled.div`
 display: flex;
 align-items: center;
 justify-content: flex-start;
 margin: 0;
 min-height: 40px;
 padding: 4px 8px;
`;
const LikeButton = styled.button`
 text-decoration: none;
 border: none; 
 display: inline-flex;
 align-items: center;
 padding: 8px;
 color: #0a66c2;
 font-weight: 700;
 font-size: 12px;
 @media (min-width: 768px){
   span{
      margin-left: 8px;
   }
 }
 img {
     width: 30px;
     height: 30px;
 }
`;

const CommentButton = styled(LikeButton)`
 
`;
const ShareIcon = styled(LikeButton)``;
const SendIcon = styled(LikeButton)``;
