export const common = {
    notification: {
        title: 'নোটিফিকেশন',
        link: 'notifications',
        icon: 'el-icon-bell',
        badge: 0
    },

    profile: {
        title: 'প্রোফাইল',
        link: 'profile',
        icon: 'el-icon-lock'
    }
};

export const employee = [
    {
        title: 'জীবন বৃত্তান্ত (CV)',
        link: 'resume',
        icon: 'el-icon-s-custom',
    },
    {
        title: 'ফেভারিট',
        link: 'saved-jobs/favorites',
        icon: 'fas fa-heart',
    },
    {
        title: 'আবেদনকৃত চাকুরী সমূহ',
        link: 'saved-jobs/applications',
        icon: 'fas fa-paper-plane'
    }
];

export const institution = [
    {
        title: 'চাকুরীর বিজ্ঞাপন দিন',
        link: 'post-job',
        icon: 'el-icon-s-marketing',
    },
    {
        title: 'বিজ্ঞাপন সমূহ',
        link: 'jobs',
        icon: 'el-icon-s-order',
    },
];

export const moderator = [
    {
        title: 'Profile',
        link: 'moderator-profile',
        icon: 'el-icon-lock',
    },
    {
        ...common.notification,
        title: 'Notifications'
    },
    {
        permission: 'moderators',
        title: 'Moderators',
        link: 'moderators',
        icon: 'fa fa-user'
    },
    {
        permission: 'job-requests',
        title: 'Job Requests',
        link: 'job-requests',
        icon: 'el-icon-s-order',
    }
];
