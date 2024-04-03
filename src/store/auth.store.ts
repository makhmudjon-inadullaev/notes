import { createAuth0 } from '@auth0/auth0-vue';
import { defineStore } from 'pinia';

const authService = createAuth0({
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENTID,
    authorizationParams: {
        redirect_uri: window.location.origin + '/callback'
    }
})

export const useAuthStore = defineStore('AuthStore', {
    state: (): app.AuthStoreType => ({
        authService,
        get isLoading() {
            return this.authService.isLoading;
        },
        get roles(): ('user' | 'admin')[] {
            return this.authService.idTokenClaims?.[`${import.meta.env.VITE_AUTH0_DOMAIN}/roles`] || []
        },
        get isAdmin() {
            return this.roles.includes('admin')
        },
        get user() {
            return this.authService.user
        },
        
    }),
    actions: {
        isLogged() {
            try {
                return this.authService.isAuthenticated
            }catch(error) {
                return false
            }
        },
        async login(): Promise<boolean> {
            try {
                await authService.loginWithRedirect();
                return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        },
        async logout(): Promise<boolean> {
            try {
                await authService.logout();
                return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        },
    }
})