import router from '@/router';

export default async function safeRedirect(path) {
    if (router.currentRoute.path !== path) {

        await router.push(path);
    }
}
