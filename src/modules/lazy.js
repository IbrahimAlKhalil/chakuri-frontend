import store from '@/store';

export default function (component) {
    store.commit('changeLoadingState', true);

    component.then(() => {
        store.commit('changeLoadingState', false);
    });

    return {
        component
    };
}
