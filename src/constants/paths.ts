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
    auth: {
        route: 'auth',
        login: {
            index: '/auth/login',
            route: 'login',
        },
        register: {
            index: '/auth/register',
            route: 'register',
        },
    },
} as const;

export default Paths;
