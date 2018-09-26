export interface User {
    email: string
    password: string
}

export interface StackPost {
    author: string,
    theme: string,
    tags: string[],
    answers: number
}