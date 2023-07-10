const apiConfig = {
    baseURLs: {
        DEV: {
            url: 'https://myptm-third-party-customer-api.vsan-apps.playcourt.id',
            apiKey: 'ODU0YTVjYzYtNDNhYS00NjllLThmNGUtNmFjZWM2MGI1YjJm'
        },
        STAGING: {
            url: 'https://api.theultimatebox.id/api/v1',
            apiKey: 'NWJmMGZkNmMtOWI0MC00YTU2LWJkMmEtZjNjZTliODYzNWFk'
        },
        PROD: {
            url: 'https://api.my-pertamina.id',
            apiKey: 'YOUR_API_KEY'
        }
    },
    endpoints: {
        customer: '/third-party-customer/v1/customers',
        pointDeduction: '/third-party-management-command/v1/point-deduction',
        pointAddition: '/third-party-management-command/v1/point-addition'
    },
    // endpoints: {
    //     customer: '/balance/?customerId=',
    //     pointDeduction: '/deduction',
    //     pointAddition: '/addition'
    // },
    customerID: {
        custDev: 'bf35ab62-b56d-4106-bd3c-2cb0ce1717fd',
        custStaging: '411de2dc-3af5-4d2f-a570-c9064ef66712'
    }
};

export default apiConfig;
