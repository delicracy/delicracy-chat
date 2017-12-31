import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    /// 시작할때마다 삭제
});

// Collection 쿼리 권한 정보
GChatRoomInfo.allow({
    insert: function (userId, doc) {
        return true;
    },
    update: function (userId, doc, fieldNames, modifier) {
        return true;
    },
    remove: function (userId, doc) {
        return true;
    }
});

GChatChatMessage.allow({
    insert: function (userId, doc) {
        return true;//(userId === null);
    },
    update: function (userId, doc, fieldNames, modifier) {
        return true;
    },
    remove: function (userId, doc) {
        return true;
    }
});

GChatChatMessage.allow({
    insert: function (userId, doc) {
        return (userId !== null);
    }
});

Meteor.publish("GChatRoomInfo", function () {
    return GChatRoomInfo.find({}, {sort: {ChatOpenDate: 1}});
});

Meteor.publish("GChatChatMessage", function () {
    return GChatChatMessage.find({}, {sort: {chattime: 1}});
});
