const Paths = {
    index: '/overview',
    todo: {
        index: '/todo',
        route: 'todo',
    },
    account: {
        index: '/account',
        route: 'account',
    },
    overview: {
        index: '/overview',
        route: 'overview',
    },
    date: {
        index: '/date',
        route: 'date',
    },
    auth: {
        route: 'auth',
        login: {
            index: '/auth/login',
            route: '/auth/login',
        },
        register: {
            index: '/auth/register',
            route: 'auth/register',
        },
    },
} as const;

export default Paths;
