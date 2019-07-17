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
        author: '2',
        comments: ['21','23']

    },
    {
        id: '13',
        title: 'Apollo 101',
        body: 'Apollo is on my to learn list.',
        published: false,
        author: '3',
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

const db = {
    users, 
    posts,
    comments
}

export { db as default}