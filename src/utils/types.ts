// Types mostly are model types that are closely related to the database models.
export type CreateUserParams = {
    username: string;
    password: string;
}

export type UpdateUserDto = {
    username: string;
    password: string;
}