import { sendPasswordResetEmail, getAuth, confirmPasswordReset } from 'firebase/auth'

const auth = getAuth()

export const passwordReset = async (email: string) => {
    return await sendPasswordResetEmail(auth, email)
}


export const confirmThePasswordReset = async (
    oobCode: string, newPassword: string
) => {
    if (!oobCode && !newPassword) return;

    return await confirmPasswordReset(auth, oobCode, newPassword)
}

