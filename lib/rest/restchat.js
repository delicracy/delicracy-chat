// API - 채팅방 개설 요청
Router.route('/chatting/makereq', function(){
	this.response.statusCode = 200;
	this.response.setHeader("Content-Type", "application/json");
	if (this.request.method == 'POST'){
		var requsetBody = this.request.body;

		var timestamp = new Date().getTime();
		var ChatRoomID = requsetBody.race_id;
		var data = GChatRoomInfo.find({"ChatRoomID" : ChatRoomID}).fetch();
		if(data.length > 0) {
			console.log("yes data");
        }
		else {
			var insertdata = {"ChatRoomID" : ChatRoomID ,
				              "ChatroomInfo"    : {
            	                    "ChatOpenReqID"     : requsetBody.ChatOpenReqID
					              , "ChatOpenReqName"   : requsetBody.ChatOpenReqName
					              , "ChatOpenDate"      : requsetBody.ChatOpenDate
					              , "ChatTitle"         : requsetBody.ChatTitle
					              , "ChatRoomID"        : requsetBody.race_id
					              , "RoomState"         : "Use"
					              , "maxPeople"         : requsetBody.maxPeople
            }};
			GChatRoomInfo.insert(insertdata);
		}
		response = {
            "result"        : vResponseOK,
			"race_id"       : ChatRoomID,
            "JoinPeople"    : 0,
            "ChatRoomStat" : "Ready"
		}
		this.response.end(JSON.stringify(response));
		//this.response.end(timestamp);
	}
}, {where: 'server'});

//test request 
Router.route('/reqUserInfo', function(){
	this.response.statusCode = 200;
	this.response.setHeader("Content-Type", "application/json");
	if (this.request.method == 'POST'){
		var requsetBody = this.request.body;
		response = {
			result          : vResponseOK,
			joinId          : requsetBody.joinId ,
            "ChatRoomID" : requsetBody.ChatRoomID ,
            "joinName"      : requsetBody.joinName,
			"joinThumb"     : requsetBody.joinThumb
		}
		this.response.end(JSON.stringify(response));
		//this.response.end(timestamp);
	}
}, {where: 'server'});

// API - 채팅방 정보
Router.route('/chatting/chatinfo', function(){
	this.response.statusCode = 200;
	this.response.setHeader("Content-Type", "application/json");
	if (this.request.method == 'POST'){
		var requsetBody = this.request.body;
		if (requsetBody.method == 'chatinfo'){
			joinUserInfoList = GChatJoinUserInfo.find(
				{ "ChatRoomID" : requsetBody.race_id }
				, {
					"_id"       : 0,
					"joinId"    : 1,
					"joinName"  : 1,
					"joinThumb" : 0
				});
			response = {
				kResponseResult : vResponseOK
				//, "joinId"      : requsetBody.joinId
				, "race_id"     : requsetBody.ChatRoomID
				, "joinList" :  joinUserInfoList
				, "joinCnt" : joinUserInfoList.length
			}
		}
		else if (requsetBody.method == 'mainInfo'){
			var roomListArr = new Array();
			roomInfoList = GChatRoomInfo.find();
			_.forEach(roomInfoList,function(item){
				roomJoinList = GChatJoinUserInfo.find({ChatRoomID:item.ChatRoomID},{"_id":0,"joinId":1,"joinName":1,"joinThumb":0});
				roomListArr.push({race_id:item.ChatRoomID,RoomState:item.ChatroomInfo.RoomState,joinCnt:roomJoinList.length});				
			});
		}
        else {
			response = {
				"result":"no method"}
		}
		
		this.response.end(JSON.stringify(response));
	}
}, {where: 'server'});

// API - 관리자 공지
Router.route('/chatting/adminNoti', function(){
	this.response.statusCode = 200;
	this.response.setHeader("Content-Type", "application/json");
	if (this.request.method == 'POST'){
		var requsetBody = this.request.body;
		var joinIdInfo = GChatUserInfo.find({joinId : requsetBody.race_id}).fetch();
		if (joinIdInfo.length == 0){
			joinIdInfo = {joinId : requsetBody.joinId , joinName : requsetBody.joinId , joinThumb : ""} ;
		}
		if (requsetBody.race_id == "ALL"){//전체공지
			var roomInfo = GChatRoomInfo.find({"ChatroomInfo.RoomState":"Use"}).fetch();
			var joinListArr = new Array();
			_.forEach(roomInfo,function(item){
					GChatChatMessage.insert({
						ChatRoomID      : item.ChatRoomID
						, joinId        : joinIdInfo.joinId
						, joinName      : joinIdInfo.joinName
						, joinThumb     : joinIdInfo.joinThumb
						, message       : requsetBody.message
						, chattime      : new Date()
					});		
			});

		} else {
			chatRoomInfo = GChatRoomInfo.find({"ChatRoomID":requsetBody.race_id}).fetch();
			if (chatRoomInfo.length > 0) {
				GChatChatMessage.insert({
					ChatRoomID      : requsetBody.race_id
					, joinId        : joinIdInfo.joinId
					, joinName      : joinIdInfo.joinName
					, joinThumb     : joinIdInfo.joinThumb
					, message       : requsetBody.message
					, chattime      : new Date()
				});
			}
		}

		response = {
			kResponseResult : vResponseOK
		}
		this.response.end(JSON.stringify(response));
	}
}, {where: 'server'});
