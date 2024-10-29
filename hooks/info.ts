export default function info(...args: unknown[]) {
    if (args.includes('ignore')) return null;
    if (args.includes('ignored')) return console.log('console log ignored');

    if (process.env.NODE_ENV === 'development') {
        if (args[0] === 1 || args[0] === true) {
            args.splice(0, 1);
            return console.log(...args);
        }
        if (args.includes('chain')) {
            args.splice(args.indexOf('chain'), 1);
            return args.map((arg) => console.log(arg));
        }

        if (args.length <= 1) {
            console.log(args[0]);
        } else console.log(args);
    }

    return null;
}

export function asset(endpoint = '', prefix = '/') {
    const url: string = process.env.NEXT_PUBLIC_ASSET_URL || '/';
    return url + prefix + endpoint;
}
