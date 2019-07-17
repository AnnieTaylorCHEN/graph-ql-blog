const Query = {
    users(parent, args, {db}, info) {
        if(!args.query){
            return db.users
        } else {
            return db.users.filter((user)=> user.name.toLowerCase().includes(args.query.toLowerCase())) 
        }
    },
    posts(parent, args, {db}, info) {
        if(!args.query){
            return db.posts
        } else {
            return db.posts.filter((post)=> {
                const isTitleMatched = post.title.toLowerCase().includes(args.query.toLowerCase())
                const isBodyMatched = post.body.toLowerCase().includes(args.query.toLowerCase())
                return isTitleMatched || isBodyMatched
            })
        }
    },
    comments(parent, args, {db}, info) {
        return db.comments
    },
    me() {
        return {
            id: '1244676',
            name: 'Ann',
            email: 'ann@taylor.com'
        }
    },
    post() {
        return {
            title: 'single post',
            body: 'I have nothing to say.',
            published: true
        }
    }
}

export { Query as default }