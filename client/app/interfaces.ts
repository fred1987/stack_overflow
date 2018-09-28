export interface User {
    email: string
    password: string
}

export interface StackOverflowQuestion {
    id: number,
    title: string,
    owner: {
        id: number,
        name: string
    },
    tags: string[],
    answer_count: number
}

export interface StackOverflowAnswers {
    creation_date: Date,
    owner_name: string,
    link: string

}
