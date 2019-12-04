//Author: Trey Suiter

import React, { Component } from 'react'
import ArticlesCard from './ArticlesCard'
import ApiManager from '../../modules/ApiManager'
// import { sortElementsByDate } from "../../modules/DateTime"
import ArticlesApiManager from "../Articles/ArticlesApiManager"
import "./Articles.css"

const loggedInUser = 1

class ArticlesList extends Component {

    state = {
        articles: [],
    }

    createStringOfFriends(friendsArray) {
        let friendsParam = ""

        for (const friend of friendsArray) {
            friendsParam += `&userId=${friend.userId}`
        }
        return friendsParam
    }

    componentDidMount() {

        ArticlesApiManager.getAllFriends(loggedInUser)
            .then(friendsList => {
                return this.createStringOfFriends(friendsList)
            })
            .then(friendString => {
                ArticlesApiManager.getUserAndFriendsArticlesSorted(loggedInUser, friendString)
                    .then(articlesList => {
                        this.setState({
                            articles: articlesList
                        })
                    })
            })
    }

    deleteArticle = id => {
        ApiManager.delete("articles", id)
            .then(ArticlesApiManager.getAllFriends(loggedInUser)
                .then(friendsList => {
                    return this.createStringOfFriends(friendsList)
                })
                .then(friendString => {
                    ArticlesApiManager.getUserAndFriendsArticlesSorted(loggedInUser, friendString)
                        .then(articlesList => {
                            this.setState({
                                articles: articlesList
                            })
                        })
                })
            )
    }

    render() {

        return (
            <>
                <section className="section-content">
                    <button type="button"
                        className="btn btn-primary"
                        onClick={() => { this.props.history.push("/articles/new") }}>
                        New Article
                    </button>
                </section>
                <div className="container-cards">
                    {this.state.articles.map(article =>
                        <ArticlesCard
                            key={article.id}
                            loggedInUser={loggedInUser}
                            article={article}
                            deleteArticle={this.deleteArticle}
                            {...this.props}
                        />
                    )}
                </div>
            </>
        )
    }
}

export default ArticlesList