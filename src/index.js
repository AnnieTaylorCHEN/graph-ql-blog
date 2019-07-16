import { GraphQLServer } from 'graphql-yoga'

//demo data
const users= [
    {
        id: '1',
        name: 'Anna',
        email: 'anna@anna.com',
        age: 15
    },
    {
        id: '2',
        name: 'Jared',
        email: 'jared@jared.com',
        age: 15
    },
    {
        id: '3',
        name: 'Billy',
        email: 'billy@billy.com',
        age: 15
    }
]

const posts = [
    {
        id: '11',
        title: 'GraphQL 101',
        body: 'GraphQL is getting popular these days.',
        published: true, 
        author: '1',
        comments: ['22']
    },
    {
        id: '12',
        title: 'React 101',
        body: 'React is required for entry level front-end dev job.',
        published: true,
        author: '1',
        comments: ['21','23']

    },
    {
        id: '13',
        title: 'Apollo 101',
        body: 'Apollo is on my to learn list.',
        published: false,
        author: '2',
        comments: ['24']
    }
]

const comments = [
    {
        id: '21',
        text: 'I definitely want to learn more about React.',
        author: '1',
        post: '12'
    },
    {
        id: '22',
        text: 'Will GraphQL replace the REST?',
        author: '2',
        post: '11'
    },
    {
        id: '23',
        text: 'What is the difference between React and Angular?',
        author: '3',
        post: '12'
        
    },
    {
        id: '24',
        text: 'Do I still need Redux if I use GraphQL and Apollo?',
        author: '1',
        post: '13'
    }
]

//type schema 
const typeDefs = `
    type Query {
        users(query: String):[User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int,
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }
`

//resolvers (functions)
const resolvers = {
    Query : {
        users(parent, args, ctx, info) {
            if(!args.query){
                return users
            } else {
                return users.filter((user)=> user.name.toLowerCase().includes(args.query.toLowerCase()))
                
            }
        },
        posts(parent, args, ctx, info) {
            if(!args.query){
                return posts
            } else {
                return posts.filter((post)=> {
                    const isTitleMatched = post.title.toLowerCase().includes(args.query.toLowerCase())
                    const isBodyMatched = post.body.toLowerCase().includes(args.query.toLowerCase())
                    return isTitleMatched || isBodyMatched
                })
            }
        },
        comments() {
            return comments
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
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user)=> user.id === parent.author)
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => comment.post === parent.id)
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => post.author === parent.id)
        }, 
        comments(parent, args, ctx, info){
            return comments.filter((comment) => comment.author === parent.id )
        }
    },
    Comment: {
        author(parent, args, ctx, info){
            return users.find((user)=> user.id === parent.author)
        },
        post(parent, args, ctx, info){
            return posts.find((post) => post.id === parent.post)
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(()=> {
    console.log('the server is up!')
})