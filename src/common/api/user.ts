import { HttpResponse, SupervisorAxios } from '../api'
import { UserTokenDto } from '../../dto/UserTokenDto'
import { UserSignInDto } from '../../dto/UserSignInDto'

export async function userSignIn(userSignInDto: UserSignInDto): Promise<HttpResponse<UserTokenDto>> {
    return (await SupervisorAxios.post('/users/auth/', userSignInDto)).data
}