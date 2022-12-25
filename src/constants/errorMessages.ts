String.prototype.toParamString = function (...params: any) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let parameterizedString = this;

    params.forEach((param: any) => {
        parameterizedString = parameterizedString.replace(/{.*?}/, param);
    });

    return String(parameterizedString);
};

export default {
    // MESSAGES
    RESOURCE_NAME: 'Une erreur est survenue lors du téléchargement de la ressource.',

    // TECHNICAL
    UNKNOWN: {
        TITLE: 'Erreur inconnue',
        MESSAGE: 'Une erreur inconnue est survenue.',
    },
    NETWORK: {
        TITLE: 'Problème réseau',
        MESSAGE: 'Vérifiez que vous êtes bien connecté.',
    },
    HTTP: {
        _401: {
            TITLE: 'Utilisateur non reconnu',
            MESSAGE: 'Veuillez réessayer ou vérifiez vos droits d’accès.',
        },
        _403: 'Accès non autorisé',
        _404: 'Ressource introuvable',
        _409: 'Conflit',
        _500: 'Problème serveur',
    },
};
