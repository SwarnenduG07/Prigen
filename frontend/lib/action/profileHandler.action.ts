import axios from "axios"

export const getMe = async () => {
    try {      
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/me`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        console.log('Response Data',  res.data);
        return res.data;
    } catch (e) {
        console.error('Error featching usr data:', );
        throw e;
    }
}
getMe().then((data) => {
    console.log(data);
    
})