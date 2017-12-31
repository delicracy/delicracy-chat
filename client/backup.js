//
// import { Meteor     } from 'meteor/meteor';
// import { Session    } from 'meteor/session';
// import { Template   } from "meteor/templating";
//
// Meteor.subscribe("GChatChatMessage", {
//     onReady: function () {
//         console.log("onReady And the Items actually Arrive", arguments);
//     },
//     onError: function () {
//         console.log("onError", arguments);
//     }
// });
//
// Session.setDefault("ChatRoomID", "TEST");
//
// GChatChatMessage.find().observe({
//     added: function(document) {
//         setTimeout(() => scrollBottomChatList(), 0);
//     },
// });
//
// /* 채팅 SEND Event */
// Template.chatInput.events({
//     'click #chat_submit': function (e) {
//         sendMessage();
//     }
// });
//
// /* 채팅 보내기 */
// sendMessage = function() {
//     var message = document.getElementById("chat_text");
//     if (message.value == "") {
//         return;
//     }
//     console.log(message.value);
//     GChatChatMessage.insert({
//         ChatRoomID      : "TEST"
//         , joinId        : Session.get("userName")
//         , joinName      : Session.get("userName")
//         , joinThumb     : "thumbnail"
//         , message       : message.value
//         , chattime      : new Date()
//     });
//     message.value = "";
//     message.focus();
//     scrollBottomChatList();
// };
//
// scrollBottomChatList = function() {
//     var chatList = document.getElementById("chat_list");
//     if (chatList != null) {
//         chatList.scrollTop = chatList.scrollHeight;
//     }
// }
//
// Template.chattingbody.helpers({
//     messages: function() {
//         return GChatChatMessage.find(
//             {
//                 ChatRoomID: "TEST"
//             },
//             {
//                 sort: {
//                     chattime: 1
//                 }
//             });
//     }
// });
//
// Template.chattingMessageBox.helpers({
//     isCurrentUser: function(userName) {
//         // return Session.get("userName");
//         return Session.get("userName") == userName;
//     },
//     timestamp: function() {
//         var date = this.chattime;
//         return ("0" + date.getHours()).slice(-2)    + ":" +
//             ("0" + date.getMinutes()).slice(-2)     + ":" +
//             ("0" + date.getSeconds()).slice(-2)
//     },
//     msg: function() {
//         var message = this.message;
//         return message.replace("\\n", "<br/>");
//     }
// });
//
// Template.chattingbody.helpers({
//     release: function() {
//         return Meteor.release;
//     }
// });