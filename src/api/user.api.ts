import { AxiosRequest } from '../common/api.interface'
import { UserDto } from '../dto/UserDto'
import axios from 'axios'
import { UserSignUpDto } from '../dto/UserSignUpDto'
import { UserSignInDto } from '../dto/UserSignInDto'
import { LocalUser } from '../util/LocalUser'

/**
 * User signs up.
 */
export const userSignUp: AxiosRequest<UserDto> = async function(userSignUpDto: UserSignUpDto): Promise<UserDto> {
    return (await axios.post('/users/', userSignUpDto)).data
}

/**
 * User signs in.
 */
export const userSignIn: AxiosRequest<UserDto> = async function(userSignInDto: UserSignInDto): Promise<UserDto> {
    return (await axios.post('/users/auth/', userSignInDto)).data
}

/**
 * Gets user's information.
 * @param userId
 */
export const getUserInfo: AxiosRequest<UserDto> = async function(userId: number): Promise<UserDto> {
    return (await axios.get(`/users/${userId}/`)).data
}

/**
 * Gets current user's information.
 */
export const getCurrentUserInfo: AxiosRequest<UserDto> = async function(): Promise<UserDto> {
    return (await axios.get(`/users/`, {
        headers: { token: LocalUser.INSTANCE().token },
    })).data
}