import {useState} from "react";
import {useLazyFetchUserQuery} from "../../features/api/accountApi.ts";
import {createToken} from "../../utils/constants.ts";
import {setToken} from "../../features/slices/tokenSlice.ts";
import {useAppDispatch} from "../../app/hooks.ts";

const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const [fetchUser] = useLazyFetchUserQuery();

    const handleClickLogin = async () => {
        const token = createToken(login, password);
        const result = await fetchUser(token);
        if(result.isSuccess){
            dispatch(setToken(token));
        }
    }

    const handlClickClear = () => {
        setLogin('');
        setPassword('');
    }

    return (
        <>
            <label>Login:
                <input
                    type="text"
                    onChange={(e) => setLogin(e.target.value)}
                    value={login}
                />
            </label>
            <label>Password:
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            <button onClick={handleClickLogin}>Sign in</button>
            <button onClick={handlClickClear}>Clear</button>
        </>
    );
};

export default Login;