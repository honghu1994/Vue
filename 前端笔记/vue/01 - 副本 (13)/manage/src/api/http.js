// 导入axios
import axios from 'axios'
// 设置基地址
const http = axios.create({
    baseURL: 'http://localhost:8888/api/private/v1/',
})

// 设置请求头中的默认值，给请求默认加一个Authorization的键，它的值为token
// http.defaults.headers.common['Authorization'] = window.localStorage.getItem('token');
export default http;

//请求拦截
http.interceptors.request.use(function (config) {

    // 发送请求前调用（发送请求做一些事）
    // 把你所有的请求拦下来
    // 拦下来给你加一个请求头，请求头的内容是token
    config.headers.Authorization = window.localStorage.getItem('token')
    // window.console.log('我调用了', config)
    return config;

}, function (error) {

    //发生错误的回调函数
    return Promise.reject(error);
});


// 专门封装一个用来登录的方法
// 这个代表调用此方法必须传入一个对象，并且对象必须要有username和password两个属性
// 封装的好处：以后万一十个地方要发这个请求，那么十个地方只要调用这个方法就行了
// 万一以后地址变了，只要改这里，其他十个地方都变了
export const login = ({ username, password }) => {

    return http.post('login', {

        username,
        password,
    })

}

// 获取左侧菜单的方法
export const menus = () => {

    return http.get('menus')
}

// 获取用户列表
export const users = ({ query, pagenum, pagesize }) => {

    return http.get('users', {

        // get请求如果提交的参数不是让你写在网址上
        // 那么，你就要在第二个参数的对象里，写一个params，params也是一个对象
        // 对象里写你的参数名和参数值
        params: {
            query,
            pagenum,
            pagesize,
        }
    })
}


// 新增用户的方法
export const addUsers = ({ username, password, email, mobile }) => {

    return http.post('users', {
        username,
        password,
        email,
        mobile
    });
}


// 修改用户状态的方法
export const changeUserState = (uid, type) => {

    return http.put(`users/${uid}/state/${type}`)
}

// 修改用户的方法
export const editUser = ({ id, email, mobile }) => {

    return http.put(`users/${id}`, {

        email,
        mobile
    })
}


// 删除用户的方法
export const deleteUser = (id) => {

    return http.delete('users/' + id)
}

// 获取所有的角色列表
export const getRoles = () => {

    return http.get('roles');
}

// 分配用户角色
export const changeUserRole = ( { id, rid } ) => {

    return http.put(`users/${id}/role`,{

        rid
    })
}


// 获取所有权限列表
export const rights = ( type ) => {

    return http.get(`rights/${type}`)
}