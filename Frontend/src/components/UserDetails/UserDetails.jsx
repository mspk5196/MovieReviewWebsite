import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export default create(persist((set) => ({
    email: null,
    name: null,
    role: null,
    isAuth:false,
    userID:null,
    login: (userData) => set({
        email: userData.email,
        name: userData.name,
        role: userData.role,
        isAuth:userData.isAuth,
        userID:userData.userID
    }),
    
    logout: () => set({ email: null, name: null, role: null, isAuth:false, userID:null }),
}),
    {
        name: 'user-store',
    }
)
);