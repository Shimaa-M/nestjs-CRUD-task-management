/* eslint-disable prettier/prettier */
//feature
class FriendsList {
    friends = [];

    addFriend(name) {
        this.friends.push(name);
        this.announceFriendship(name);
    }

    announceFriendship(name) {
        global.console.log(`${name} is now a friend`);
    }

    removeFriend(name) {
        const idx = this.friends.indexOf(name);

        if(idx===-1) {
            throw new Error ('Friend not found');
        }
        this.friends.splice(idx,1); 
    }
}

//tests
describe('FriendList', () => {
    let friendList;
    beforeEach(() => {
        friendList = new FriendsList();
    });
    it('initilaize friends list', () => {
        expect(friendList.friends.length).toEqual(0);
    });

    it('adds a friend to the list', () => {
        friendList.addFriend('Saeed');
        expect(friendList.friends.length).toEqual(1);
    });

    it('announce a friendship', () => {
        friendList.announceFriendship = jest.fn();
        expect(friendList.announceFriendship).not.toHaveBeenCalled();
        friendList.addFriend('Saeed');
        expect(friendList.announceFriendship).toHaveBeenCalledWith('Saeed');
    });

    describe('removeFriend', () => {
        it('removes friend', () => {
            friendList.addFriend('Saeed');
            expect(friendList.friends[0]).toEqual('Saeed');
            friendList.removeFriend('Saeed');
            expect(friendList.friends[0]).toBeUndefined();
        });
        it('throw new error', () => {
            expect(() => friendList.removeFriend('Saeed')).toThrow(new Error('Friend not found'));
        });
    });
});