import { log } from 'winston';

export function error(res, status, message) {
  log('debug', `${status} = ${message}`);
  res.status(status)
    .format({html: () => res.send('<p>' + message + '</p>'),
             text: () => res.send(message),
             json: () => res.json({message: message}),
             default: () => res.json({message: message})});
}
