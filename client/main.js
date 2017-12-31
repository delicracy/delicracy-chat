
import { Meteor     } from 'meteor/meteor';
import { Session    } from 'meteor/session';
import { Template   } from "meteor/templating";

// TODO: 사용자 아이피 가져오기
// TODO: 사용자 강퇴 기능
// TODO: 전체 관리자 공지

Meteor.subscribe("GChatChatMessage", {
	onReady: function () {
		console.log("onReady And the Items actually Arrive", arguments);
	},
	onError: function () {
		console.log("onError", arguments);
	}
});

GChatChatMessage
	.find({
		// ChatRoomID: Session.get("ChatRoomID")
	})
	.observe({
	added: function(document) {
		console.log(document);
		setTimeout(() => scrollBottomChatList(), 500);
	},
	});

/* 채팅 SEND Event */
Template.chatInput.events({
	'click #chat_submit': function (e) {
		sendMessage();
	},
	'keyup #chat_text': function(e) {
		if (e.type == "keyup" && e.which == 13) {
			if (e.shiftKey) {
				
			}
			else {
			sendMessage();
		}
	}
	}
});

/* 채팅 보내기 */
sendMessage = function() {
	/// TextArea
	var message = document.getElementById("chat_text");
	/// 개행 제거
	var trimMessage = removeNewLine(message);
	// console.log(trimMessage);
	// console.log(trimMessage.length);
	/// length가 0인 메시지는 전송하지 않는다.
	if (trimMessage.length == 0) {
		return;
	}
	// console.log(message.value);
	GChatChatMessage.insert({
		ChatRoomID      : Session.get("ChatRoomID")
		, joinId        : Session.get("userID")
		, joinName      : Session.get("userName")
		, joinThumb     : Session.get("thumb")
		, message       : message.value
		, chattime      : new Date()
	});
	message.value = "";
	message.focus();
	scrollBottomChatList();
};

function removeNewLine(msg) {
	return msg.value.replace(/^\s+|\s+$/g, "");
}

scrollBottomChatList = function() {
	var chatList = document.getElementById("chat_list");
	if (chatList != null) {
		chatList.scrollTop = chatList.scrollHeight;
	}
}

Template.chattingbody.helpers({
	messages: function() {
		return GChatChatMessage.find(
			{
				ChatRoomID: Session.get("ChatRoomID")
			},
			{
				sort: {
					chattime: 1
				}
			});
	},
	isMemeber: function () {
		return Session.get("userID") != "undefined"
	}
});

Template.chattingMessageBox.helpers({
	isCurrentUser: function(userName) {
		// return Session.get("userName");
		return Session.get("userName") == userName;
	},
	timestamp: function() {
		var date = this.chattime;
		return ("0" + date.getHours()).slice(-2)    + ":" +
			("0" + date.getMinutes()).slice(-2)     + ":" +
			("0" + date.getSeconds()).slice(-2)
	},
	profile: function() {
		return this.joinThumb != "" && this.joinThumb != "thumbnail"
	}
});

Template.chattingbody.helpers({
	release: function() {
		return Meteor.release;
	}
});

Template.chattingMessageBox.helpers({
	chatDateTime:function(chattime){
		date = new Date(chattime);
		return (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
	}
}); 