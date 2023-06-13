import { HttpResponse, SupervisorAxios } from '../common/api'
import { UserDto } from '../dto/UserDto'
import { UserSignUpDto } from '../dto/UserSignUpDto'
import { UserSignInDto } from '../dto/UserSignInDto'
import { UserTokenDto } from '../dto/UserTokenDto'

/**
 * User signs up.
 */
export const userSignUp = async function(userSignUpDto: UserSignUpDto): Promise<UserTokenDto> {
    return (await SupervisorAxios.post('/users/', userSignUpDto)).data
}

/**
 * User signs in.
 */
export const userSignIn = async function(userSignInDto: UserSignInDto): Promise<HttpResponse<UserTokenDto>> {
    return (await SupervisorAxios.post('/users/auth/', userSignInDto)).data
}

export const userSignInAxios = async function(userSignInDto: UserSignInDto) {
    return SupervisorAxios.post('/users/auth/', userSignInDto)
}

/**
 * Gets user's information.
 * @param userId
 */
export const getUserInfo = async function(userId: number): Promise<UserDto> {
    return (await SupervisorAxios.get(`/users/${userId}/`)).data
}

/**
 * Gets current user's information.
 */
export const getCurrentUserInfo = async function(): Promise<UserDto> {
    return (await SupervisorAxios.get(`/users/`, {})).data
}