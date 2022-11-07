import 'dotenv/config';

const URI_QNS_SVC = process.env.URI_QNS_SVC || 'http://question-service:8080';

const PREFIX_QNS_SVC = '/api/question';

export const URL_QNS_SVC = URI_QNS_SVC + PREFIX_QNS_SVC;
