GChatRoomInfo = new Mongo.Collection("GChatRoomInfo");
/* {"ChatRoomID" : "ChatRoomID" ,
    "ChatroomInfo" : { "ChatOpenReqID":"leejihun"
                       ,"ChatOpenReqName" : "이지헌"
                       ,"ChatOpenDate":"201712011600"
                       ,"ChatTitle":"테스트입니다."
 ,  “race_id”:”test1011111111” ,
 ,  “RoomState”:”Use” , // RoomState is "Use" , "Expire"
  “maxPeople” : 1000 }

*/

GChatChatMessage = new Mongo.Collection("GChatChatMessage");
/* {  "ChatRoomID" : "ChatRoomID"
  , "joinId": "참여자ID"
  , "joinName": "참여자이름"
  , "joinThumb": "참여자썸네일"},{"joinId": "참여자ID"
  , "joinName": "참여자이름"
  , "joinThumb": "참여자썸네일"
  , "message" : "채팅메세지"
  , "chattime" :"채팅시간(yyyyMMddhhmmsss: 서버 타임으로)"
} */

GChatUserInfo = new Mongo.Collection("GChatUserInfo");
/*
{  "joinId": "참여자ID"
  , "joinName": "참여자이름"
  , "joinThumb": "참여자썸네일" }
*/

GChatJoinUserInfo = new Mongo.Collection("GChatJoinUserInfo");
/*
{  "ChatRoomID" : "ChatRoomID"
  , "joinId": "참여자ID"
  , "joinName": "참여자이름"
  , "joinThumb": "참여자썸네일"
}
*/