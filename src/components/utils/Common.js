
export const getUsername = () => {
    return sessionStorage.getItem('username') || null;
}


export const getId = () => {
    return sessionStorage.getItem('id') || null;
}

export const getRoles = () => {
    return sessionStorage.getItem('roles') || null;
}


// return the token from the session storage
export const getToken = () => {
    return sessionStorage.getItem('token') || null;
}

// return the token from the session storage
export const getUser = () => {
    return sessionStorage.getItem('user') || null;
}

export const getFullname = () => {
    return sessionStorage.getItem('fullName') || null;
}

export const getPosition = () => {
    return sessionStorage.getItem('position') || null;
}

export const getDepartmnet = () => {
    return sessionStorage.getItem('department') || null;
}

export const getSenirity = () => {
    return sessionStorage.getItem('seniority') || null;
}

// remove the token and user from the session storage
export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('roles');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('position');
    sessionStorage.removeItem('department');
    sessionStorage.removeItem('seniority');
}

// set the token and user from the session storage
export const setUserSession = (token, username, id, nic, email, mobileno, district, fullName, roles, position, department, seniority) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('id', id);
    sessionStorage.setItem('nic', nic);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('mobileno', mobileno);
    sessionStorage.setItem('district', district);
    sessionStorage.setItem('fullName', fullName);
    sessionStorage.setItem('roles', roles);
    sessionStorage.setItem('position', position);
    sessionStorage.setItem('department', department);
    sessionStorage.setItem('seniority', seniority);
}

export const setUsers = (users)=>{
    sessionStorage.setItem('users', users);
}

export const getUsers=()=>{
    return sessionStorage.getItem('users') || null;
}

export const setAccounts = (accounts) =>{
    sessionStorage.setItem('accounts',accounts);
}

export const getAccounts=()=>{
    return sessionStorage.getItem('accounts') || null;
}

export const setLoans = (loans) =>{
    sessionStorage.setItem('loans',loans);
}

export const getLoans=()=>{
    return sessionStorage.getItem('loans') || null;
}