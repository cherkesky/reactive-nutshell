import React, { Component } from 'react';
import FriendsCard from './FriendsCard';
import ApiFriends from './ApiFriends';

const { followNewFriend, getAllFriendsWithNames, searchUsersByKeyWord } = ApiFriends;
// TODO: change to localStorage when implemented
function loggedInUserId() {return parseInt(localStorage.getItem("userId"))}
export class FriendsNewForm extends Component {
	state = {
		// friends: [],
		friendIds: [],
		nonFriends: [],
		searchTerm: ''
	};

	componentDidMount() {
		getAllFriendsWithNames().then((friends) => {
			// setState should only be run once, so this is setting up a temporary obj to store the data from the forEach
			const newState = {
				// friends: [],
				friendIds: []
			};
			friends.forEach((friend) => {
				// newState.friends = [ ...newState.friends, { ...friend.user } ];
				newState.friendIds = [ ...newState.friendIds, friend.userId ];
			});
			this.setState(newState);
		});
	}

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	searchUserNames = (e) => {
		// only search using input value after user hits 'Enter' key
		if (e.key === 'Enter') {
			const { searchTerm, friendIds } = this.state;
			searchUsersByKeyWord(searchTerm).then((results) => {
				// only return non-friend userIds that also aren't current user
				const nonFriends = results.filter((result) => {
					return result.id !== loggedInUserId() && !friendIds.includes(result.id);
				});
				this.setState({
					nonFriends: nonFriends
				});
			});
		}
	};

	addFriend = (id) => {
		const connection = {
			loggedInUser: loggedInUserId(),
			userId: id
		};
		followNewFriend(connection).then(() => this.props.history.push('/friends'));
	};

	render() {
		const { nonFriends } = this.state;

		return (
			<div className="card-body">
				<h1>Add New Friend</h1>
				<input
					id="searchTerm"
					placeholder="Search Users"
					className="form-control"
					onChange={this.handleChange}
					onKeyPress={this.searchUserNames}
				/><br />
				<h3>Search Results</h3>
				{nonFriends.map((user) => {
					return <FriendsCard key={user.id} user={user} isFriend={false} addFriend={this.addFriend} />;
				})}<br />
				<button className="btn btn-primary" onClick={() => this.props.history.push('/friends')}>
					Go To Friends
				</button>
			</div>
		);
	}
}

export default FriendsNewForm;
