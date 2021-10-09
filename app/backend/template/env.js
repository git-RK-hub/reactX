export const mongoEnv = (uri) => `NODE_ENV=development
PORT=3033
M_DB=${uri}
`;

export const sqlEnv = ({ host, name, user, password }) => `NODE_ENV=development
PORT=3033
SQL_DB_DIALECT=mysql
SQL_DB_HOST=${host}
SQL_DB_PORT=3306
SQL_DB_NAME=${name}
SQL_DB_USER=${user}
SQL_DB_PASSWORD=${password}
`;

export const env = () => `NODE_ENV=development
PORT = 3033
`;
