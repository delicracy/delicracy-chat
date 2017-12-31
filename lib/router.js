/* TEST */
/*Router.route('/Home', function () {
    this.render('chattingHome');
}); */

// 기본 세팅
Router.configure({
	// layoutTemplate: 'layout',
	// loadingTemplate: 'loading',
	notFoundTemplate: '404'
});

// gchat/joinroom/1_leejihun?join=rjy
//userinfoReqUrl = "http://api.delicracy.com/users/user_id.json";
//dev.delicracy.com/chat_rooms/5a2d8170264b022dd666a143/user_info/5a2d8170264b022dd666a13d
userinfoReqUrl = "http://dev.delicracy.com/chat_rooms/";
Router.route('/chatting/:chatRoomID', function () {

    console.log(this.params.chatRoomID);
	var chatRoomID = this.params.chatRoomID;
	var data = GChatRoomInfo.find({"ChatRoomID" : this.params.chatRoomID}).fetch();
	Session.set("ChatRoomID", chatRoomID);
	if(data.length > 0) {
		 console.log("yes room");
		 var req = this.params.query;
		//console.log(req.join);
		var meminfo = GChatJoinUserInfo.find({"ChatRoomID" : chatRoomID , joinId:req.join}).fetch();
		// console.log(meminfo.length + "  <--  meminfo.length");

		/// 회원 정보가 없으면.
		if (meminfo.length == 0 ){
			//console.log(userinfoReqUrl + this.params.chatRoomID + "/user_info/" + req.join);
			//
			url = userinfoReqUrl + this.params.chatRoomID + "/user_info/" + req.join;
			HTTP.call("GET", url, {} , (error, result) => {
						    //console.log(result);
							//console.log("ajax call data " + result.data.joinId);
							if (result.data.result == "ok"){
								var insertJoinUserInfo = {
								 "ChatRoomID" : chatRoomID
								  , "joinId"        : result.data.joinid
								  , "joinName"      : result.data.joinName
								  , "joinThumb"     : result.data.joinThumb};

								this.render('chattingHome');
								Session.set("ChatRoomID", chatRoomID);

								//insert
								GChatJoinUserInfo.insert(insertJoinUserInfo);
								var userInfo = GChatUserInfo.find({"joinId":result.data.joinId});
								if (userInfo.length == 0) {
									var userinfodata = {
										"joinId"        : result.data.joinId
										, "joinName"    : result.data.joinName
										, "joinThumb"   : result.data.joinThumb
									}
									GChatUserInfo.insert(userinfodata);
								}
								Session.set("userID", result.data.joinId);
								Session.set("userName",result.data.joinName);
								Session.set("thumb", result.data.joinThumb);
							}
							else{
								//console.log("ajax call error ");
								this.render('chattingHome');
								/*var insertJoinUserInfo = {
								 "ChatRoomID" : chatRoomID
								  , "joinId"        : result.data.joinId
								  , "joinName"      : result.data.joinName
								  , "joinThumb"     : result.data.joinThumb
										};

								this.render('chattingHome');
								Session.set("ChatRoomID", chatRoomID); */
							}
			}); 
		} else{
			/// 회원 정보가 있으면 세션에 세팅 후 채팅 화면 보여줌
			console.log('---------------------------------');
			console.log(meminfo);
			console.log('---------------------------------');
			Session.set("userID", meminfo.joinID);
			Session.set("userName",  meminfo.joinName);
			Session.set("thumb",  meminfo.joinThumb);

			// console.log("1111111111111");
			this.render('chattingHome');
		}
    }
	else {
		console.log("no room");
		// this.render('chattingNoRoom');
	}
});



// 채팅 기본 테스트  >> host:3000/?userName=사용자이름
// Router.route('/', function () {
//     this.render('chattingHome');
//     var query = this.params.query;
//     Session.set("userName", query.userName);
//     console.log(Session.get("userName"));
// });


